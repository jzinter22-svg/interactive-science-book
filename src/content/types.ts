// ============================================================
// CONTENT ENGINE — DATA MODEL
//
// Pure data types. Nothing in this file renders anything or knows
// about CSS/React — that separation is the whole point: content
// authors (or a future PDF importer) only ever need to produce
// values that satisfy these shapes, and the rendering layer in
// src/components/content/ takes it from there. Adding a new chapter
// never requires touching a component.
// ============================================================

export type LessonKind = "reading" | "video" | "interactive" | "quiz";
export type Difficulty = "سهل" | "متوسط" | "صعب";

export interface Chapter {
  id: string;
  index: number;
  title: string;
  description: string;
  /** 0-100. Static placeholder until real progress-tracking exists. */
  progress: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  kind: LessonKind;
  completed?: boolean;
  /** The lesson body, top to bottom, as an ordered list of content blocks. */
  blocks: ContentBlock[];
}

// ------------------------------------------------------------
// Shared shapes reused by more than one block
// ------------------------------------------------------------

/** Either a single paragraph or several — renders as one <p> per entry. */
export type RichText = string | string[];

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface ReferenceItem {
  label: string;
  url?: string;
}

export type DiagramShape =
  | { kind: "circle"; cx: number; cy: number; r: number }
  | { kind: "polygon"; points: string }
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number; dashed?: boolean };

export interface StepSolutionData {
  steps: string[];
  finalAnswer?: string;
}

// ------------------------------------------------------------
// Content blocks — one interface per reusable content type.
// Every block carries `id` (stable React key + future deep-linking)
// and a `type` discriminant used by BlockRenderer's switch.
// ------------------------------------------------------------

interface BaseBlock {
  id: string;
}

export interface SectionBlockData extends BaseBlock {
  type: "section";
  title: string;
  blocks: ContentBlock[];
}

export interface DefinitionBlockData extends BaseBlock {
  type: "definition";
  term: string;
  definition: string;
}

export interface ConceptBlockData extends BaseBlock {
  type: "concept";
  title: string;
  body: RichText;
}

export interface FormulaBlockData extends BaseBlock {
  type: "formula";
  label?: string;
  latex: string;
  caption?: string;
}

export interface ExampleBlockData extends BaseBlock {
  type: "example";
  title: string;
  body: RichText;
}

export interface StepSolutionBlockData extends BaseBlock, StepSolutionData {
  type: "stepSolution";
}

export interface ExerciseBlockData extends BaseBlock {
  type: "exercise";
  title: string;
  difficulty?: Difficulty;
  body: RichText;
  solution?: StepSolutionData | { text: string };
}

export interface MCQBlockData extends BaseBlock {
  type: "mcq";
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface TrueFalseBlockData extends BaseBlock {
  type: "trueFalse";
  statement: string;
  correctAnswer: boolean;
  explanation?: string;
}

export interface FillBlankBlockData extends BaseBlock {
  type: "fillBlank";
  /** Use ___ (three underscores) to mark each blank. */
  template: string;
  /** One answer per blank, in the order the blanks appear. */
  answers: string[];
  caseSensitive?: boolean;
}

export interface DiagramBlockData extends BaseBlock {
  type: "diagram";
  title: string;
  shapes: DiagramShape[];
  viewBox?: string;
}

/**
 * A hand-built physics diagram that outdoes what the declarative
 * DiagramShape primitives can express (labeled vectors, arrowheads,
 * multi-panel layouts). `diagramId` is looked up against a small
 * registry of one-off React components in
 * src/components/diagrams/registry.tsx — content stays pure data,
 * the bespoke rendering lives entirely in the presentation layer.
 */
export interface CustomDiagramBlockData extends BaseBlock {
  type: "customDiagram";
  title: string;
  diagramId: string;
  caption?: string;
}

export interface ImageBlockData extends BaseBlock {
  type: "image";
  src?: string;
  alt: string;
  caption?: string;
}

export interface VideoBlockData extends BaseBlock {
  type: "video";
  title: string;
  duration: string;
  thumbnailSrc?: string;
}

export interface AnimationBlockData extends BaseBlock {
  type: "animation";
  title: string;
  description?: string;
}

export interface SimulationBlockData extends BaseBlock {
  type: "simulation";
  title: string;
  description?: string;
}

export interface HintBlockData extends BaseBlock {
  type: "hint";
  body: RichText;
}

export interface NoteBlockData extends BaseBlock {
  type: "note";
  title?: string;
  body: RichText;
}

export interface WarningBlockData extends BaseBlock {
  type: "warning";
  title?: string;
  body: RichText;
}

export interface TeacherTipBlockData extends BaseBlock {
  type: "teacherTip";
  body: RichText;
}

export interface AITutorBlockData extends BaseBlock {
  type: "aiTutor";
  greeting?: string;
  suggestions?: string[];
}

export interface SummaryBlockData extends BaseBlock {
  type: "summary";
  title?: string;
  points: string[];
}

export interface GlossaryBlockData extends BaseBlock {
  type: "glossary";
  title?: string;
  terms: GlossaryTerm[];
}

export interface ReferencesBlockData extends BaseBlock {
  type: "references";
  title?: string;
  items: ReferenceItem[];
}

export type ContentBlock =
  | SectionBlockData
  | DefinitionBlockData
  | ConceptBlockData
  | FormulaBlockData
  | ExampleBlockData
  | StepSolutionBlockData
  | ExerciseBlockData
  | MCQBlockData
  | TrueFalseBlockData
  | FillBlankBlockData
  | DiagramBlockData
  | CustomDiagramBlockData
  | ImageBlockData
  | VideoBlockData
  | AnimationBlockData
  | SimulationBlockData
  | HintBlockData
  | NoteBlockData
  | WarningBlockData
  | TeacherTipBlockData
  | AITutorBlockData
  | SummaryBlockData
  | GlossaryBlockData
  | ReferencesBlockData;

export type ContentBlockType = ContentBlock["type"];
