import { useState } from "react";
import type { ContentBlock } from "../../content/types";
import { RichTextParagraphs } from "./richText";
import { DiagramShapes } from "./DiagramShapes";
import { SectionBlock } from "./SectionBlock";
import { DefinitionBlock } from "./DefinitionBlock";
import { ConceptBlock } from "./ConceptBlock";
import { StepSolutionBlock } from "./StepSolutionBlock";
import { GuidedSolutionBlock } from "./GuidedSolutionBlock";
import { TableBlock } from "./TableBlock";
import { TrueFalseBlock } from "./TrueFalseBlock";
import { FillBlankBlock } from "./FillBlankBlock";
import { AnimationBlock } from "./AnimationBlock";
import { SimulationBlock } from "./SimulationBlock";
import { HintBlock } from "./HintBlock";
import { TeacherTipBlock } from "./TeacherTipBlock";
import { SummaryBlock } from "./SummaryBlock";
import { GlossaryBlock } from "./GlossaryBlock";
import { ReferencesBlock } from "./ReferencesBlock";
import { ExampleCard } from "../cards/ExampleCard";
import { ExerciseCard } from "../cards/ExerciseCard";
import { SolutionCard } from "../cards/SolutionCard";
import { NoteCard } from "../cards/NoteCard";
import { WarningCard } from "../cards/WarningCard";
import { FormulaCard } from "../cards/FormulaCard";
import { ImageCard } from "../cards/ImageCard";
import { VideoCard } from "../cards/VideoCard";
import { QuestionCard } from "../cards/QuestionCard";
import { AIAssistantCard } from "../cards/AIAssistantCard";
import { InteractiveDiagramContainer } from "../math/InteractiveDiagramContainer";
import { customDiagramRegistry } from "../diagrams/registry";
import { simulationRegistry } from "../simulations/registry";

/** Block types that get a running "Exercise/Question N" number within their list. */
const ACTIVITY_TYPES = new Set(["exercise", "mcq", "trueFalse", "fillBlank"]);

interface ContentBlockListProps {
  blocks: ContentBlock[];
  className?: string;
}

/**
 * Renders an ordered list of content blocks. This is the one place a
 * lesson's `blocks` array turns into UI — pages never switch on block
 * type themselves, they just hand their blocks to this component.
 *
 * Activity numbering (exercises/questions) is scoped to this list: a
 * flat lesson counts 1..n straight through; a SectionBlock's nested
 * list restarts its own count, so "Exercise 1" inside a section reads
 * as "the first exercise in this section," not a global running total.
 */
export function ContentBlockList({ blocks, className }: ContentBlockListProps) {
  let activityCount = 0;

  return (
    <div className={`stack stack--lg ${className ?? ""}`.trim()}>
      {blocks.map((block) => {
        const isActivity = ACTIVITY_TYPES.has(block.type);
        if (isActivity) activityCount += 1;
        return (
          <ContentBlockRenderer key={block.id} block={block} activityNumber={isActivity ? activityCount : undefined} />
        );
      })}
    </div>
  );
}

interface ContentBlockRendererProps {
  block: ContentBlock;
  /** 1-based position among sibling exercise/question blocks; only set for activity types. */
  activityNumber?: number;
}

export function ContentBlockRenderer({ block, activityNumber }: ContentBlockRendererProps) {
  switch (block.type) {
    case "section":
      return <SectionBlock title={block.title} blocks={block.blocks} />;

    case "definition":
      return <DefinitionBlock term={block.term} definition={block.definition} />;

    case "concept":
      return <ConceptBlock title={block.title} body={block.body} />;

    case "formula":
      return <FormulaCard label={block.label} formula={block.latex} caption={block.caption} />;

    case "example":
      return (
        <ExampleCard title={block.title}>
          <RichTextParagraphs body={block.body} />
        </ExampleCard>
      );

    case "stepSolution":
      return <StepSolutionBlock steps={block.steps} finalAnswer={block.finalAnswer} />;

    case "guidedSolution":
      return (
        <GuidedSolutionBlock
          title={block.title}
          restatement={block.restatement}
          givens={block.givens}
          required={block.required}
          equation={block.equation}
          conversions={block.conversions}
          steps={block.steps}
          finalAnswer={block.finalAnswer}
          commonMistake={block.commonMistake}
        />
      );

    case "table":
      return <TableBlock title={block.title} columns={block.columns} rows={block.rows} caption={block.caption} />;

    case "exercise":
      return <ExerciseBlockRenderer block={block} number={activityNumber ?? 1} />;

    case "mcq":
      return (
        <QuestionCard
          index={activityNumber ?? 1}
          question={block.question}
          options={block.options}
          correctIndex={block.correctIndex}
          explanation={block.explanation}
        />
      );

    case "trueFalse":
      return (
        <TrueFalseBlock
          index={activityNumber ?? 1}
          statement={block.statement}
          correctAnswer={block.correctAnswer}
          explanation={block.explanation}
        />
      );

    case "fillBlank":
      return (
        <FillBlankBlock
          index={activityNumber ?? 1}
          template={block.template}
          answers={block.answers}
          caseSensitive={block.caseSensitive}
        />
      );

    case "diagram":
      return (
        <InteractiveDiagramContainer title={block.title}>
          <svg width="220" height="180" viewBox={block.viewBox ?? "0 0 220 180"} style={{ color: "var(--accent-primary)" }}>
            <DiagramShapes shapes={block.shapes} />
          </svg>
        </InteractiveDiagramContainer>
      );

    case "customDiagram": {
      const Diagram = customDiagramRegistry[block.diagramId];
      return (
        <div className="stack">
          <InteractiveDiagramContainer title={block.title}>
            {Diagram ? <Diagram /> : null}
          </InteractiveDiagramContainer>
          {block.caption && <p className="text-caption" style={{ textAlign: "center" }}>{block.caption}</p>}
        </div>
      );
    }

    case "interactiveSim": {
      const Sim = simulationRegistry[block.simId];
      return (
        <div className="stack">
          {Sim ? <Sim /> : null}
          {block.caption && <p className="text-caption" style={{ textAlign: "center" }}>{block.caption}</p>}
        </div>
      );
    }

    case "image":
      return <ImageCard src={block.src} alt={block.alt} caption={block.caption} />;

    case "video":
      return <VideoCard title={block.title} duration={block.duration} thumbnailSrc={block.thumbnailSrc} />;

    case "animation":
      return <AnimationBlock title={block.title} description={block.description} />;

    case "simulation":
      return <SimulationBlock title={block.title} description={block.description} />;

    case "hint":
      return <HintBlock body={block.body} />;

    case "note":
      return (
        <NoteCard title={block.title}>
          <RichTextParagraphs body={block.body} />
        </NoteCard>
      );

    case "warning":
      return (
        <WarningCard title={block.title}>
          <RichTextParagraphs body={block.body} />
        </WarningCard>
      );

    case "teacherTip":
      return <TeacherTipBlock body={block.body} />;

    case "aiTutor":
      return <AIAssistantCard greeting={block.greeting} suggestions={block.suggestions} />;

    case "summary":
      return <SummaryBlock title={block.title} points={block.points} />;

    case "glossary":
      return <GlossaryBlock title={block.title} terms={block.terms} />;

    case "references":
      return <ReferencesBlock title={block.title} items={block.items} />;

    default: {
      // Exhaustiveness check: if a new block type is added to the union
      // without a case here, this line fails to compile.
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

function ExerciseBlockRenderer({
  block,
  number,
}: {
  block: Extract<ContentBlock, { type: "exercise" }>;
  number: number;
}) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="stack">
      <ExerciseCard
        number={number}
        title={block.title}
        difficulty={block.difficulty}
        onShowSolution={block.solution ? () => setShowSolution(true) : undefined}
      >
        <RichTextParagraphs body={block.body} />
      </ExerciseCard>
      {showSolution && block.solution && (
        <SolutionCard defaultOpen>
          {"steps" in block.solution ? (
            <StepSolutionBlock steps={block.solution.steps} finalAnswer={block.solution.finalAnswer} />
          ) : (
            <p>{block.solution.text}</p>
          )}
        </SolutionCard>
      )}
    </div>
  );
}
