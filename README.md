# كتاب الطبيعيات التفاعلي — Interactive Physics Book

This repository contains the platform foundation, a complete **content
engine**, and the **Golden Lesson**: Chapter One's first lesson, "الحركة
الدائرية والقوة المركزية" (Circular Motion and Centripetal Force),
transcribed verbatim from the source textbook (`books/كتاب الطبيعيات.pdf`)
and built as the permanent reference implementation every future lesson
must match in structure, interactivity, and visual quality.

Only this one lesson is imported so far, by design — the rest of Chapter
One (satellite orbits, Kepler's laws, rotational motion, angular momentum)
is intentionally not yet written.

## Stack

- **Vite + React + TypeScript**
- CSS Modules for component-scoped styles, plain CSS custom properties for
  the design token layer
- **KaTeX** for math rendering
- RTL-first (`<html lang="ar" dir="rtl">`), **Cairo** webfont
- PWA-ready (`manifest.webmanifest`, installable, themed icons)

## Content engine

Content is fully separated from presentation. A chapter is data; nothing
in `src/pages` or `src/components` ever hard-codes lesson content.

```
src/content/
  types.ts             // the data model: Chapter, Lesson, and the
                        // ContentBlock union — one interface per block type
  registry.ts           // the ONLY thing pages talk to: getAllChapters,
                        // getChapterById, getLessonById, getSidebarNavSections
  chapters/
    c1.ts                // REAL content — Chapter One, Lesson One (the
                         // Golden Lesson), transcribed verbatim from the
                         // source PDF

src/components/content/
  BlockRenderer.tsx      // ContentBlockList / ContentBlockRenderer — the
                         // dispatcher. Switches on block.type; the switch
                         // is exhaustive (a `never` check), so adding a
                         // block type to the union without adding a case
                         // here fails the TypeScript build, not silently
                         // renders nothing.
  DiagramShapes.tsx      // declarative circle/polygon/line primitives so
                         // a diagram can be pure data too
  <Type>Block.tsx(+css)  // one presentational component per block type
                         // that doesn't already have a card (Definition,
                         // Concept, StepSolution, TrueFalse, FillBlank,
                         // Animation, Simulation, Hint, TeacherTip,
                         // Summary, Glossary, References, Section)

src/components/diagrams/
  Figure1_1.tsx, Figure1_2.tsx,
  Figure1_3.tsx           // bespoke labeled-vector SVG diagrams — the
                          // escape hatch for physics illustrations too
                          // specific for the declarative DiagramShape
                          // primitives. Looked up by diagramId through
                          // registry.tsx from a `customDiagram` block —
                          // content still stays pure data.
```

### Supported content block types

Chapter and Lesson are structural; a Lesson is an ordered list of blocks.
`Section` is itself a block type that nests further blocks, so a lesson
can be flat or organized into titled sections, to any depth.

Definition · Concept · Formula · Example · Step-by-step Solution ·
Exercise · Multiple-choice Question · True/False Question · Fill in the
Blank · Interactive Diagram · Custom (bespoke) Diagram · Image · Video ·
Animation · Simulation · Hint · Note · Warning · Teacher Tip · AI Tutor ·
Summary · Glossary · References · Section

Exercises and questions (exercise/mcq/trueFalse/fillBlank) get an
automatic running number scoped to the list they appear in — a flat
lesson counts straight through; a block inside a `Section` restarts at 1
for that section.

### Adding a real chapter later requires **zero** UI changes

1. Write a file exporting a `Chapter` (matching `src/content/types.ts`) —
   arrays of `Lesson`s, each an ordered array of `ContentBlock`s.
2. Add it to the `chapters` array in `src/content/registry.ts`.

Every page — the home grid, chapter overview, lesson reader, sidebar
navigation, and prev/next links — picks it up automatically because they
all render through the registry and `ContentBlockList`, never through
per-chapter code.

## Structure

```
src/
  styles/
    tokens.css       // color system, type scale, spacing, radii, shadows, z-index
    global.css       // reset, RTL base, glass-surface utilities, a11y helpers
    layout.css       // container, bento grid, auto-grid, flex/stack utilities
    animations.css   // shared fade/slide keyframe utilities (motion-safe)
  theme/
    ThemeContext.tsx // light/dark theme engine (data-theme + localStorage)
  content/           // the content engine — see above
  components/
    content/         // block renderer + one component per block type — see above
    layout/          // Header, Sidebar, Footer, Hero, Container, AppShell, Breadcrumb
    cards/           // Chapter/Lesson/Example/Exercise/Question/Solution/
                      // Formula/Note/Warning/Video/Image/Quiz/AIAssistant
    ui/               // Button, Input, Textarea, Modal, Tabs, Accordion, Timeline,
                      // ProgressBar, ThemeToggle, Skeleton, Spinner, EmptyState,
                      // ErrorState
    math/             // MathFormula (KaTeX), InteractiveDiagramContainer
  pages/
    HomePage.tsx      // landing page — reads from the content registry
    ChapterPage.tsx   // chapter overview + lesson list — reads from the registry
    LessonPage.tsx    // lesson reader — renders lesson.blocks via ContentBlockList
    ShowcasePage.tsx  // component gallery — placeholder content only
```

## Design language

Educational Glassmorphism: frosted glass surfaces with high text contrast,
soft elevation, an indigo/amber/teal/violet accent system, an 8pt spacing
scale, and a fluid Cairo type scale. Both light and dark themes are
implemented and WCAG AA contrast has been verified for text and badge
color pairs. Every card is built to grow with content — no fixed heights,
no truncated Arabic text — and has been stress-tested with long strings
to rule out overflow, clipping, or overlap at every breakpoint.

## Running locally

```bash
npm install
npm run dev
```

## The Golden Lesson

`c1-l1` — "الحركة الدائرية والقوة المركزية" — is the first real content
import and the permanent reference implementation for the rest of the
book. It covers sections ١-١ through ١-٣ of Chapter One (تمهيد, الحركة
الدائرية including التعجيل المركزي ومحصلة التعجيل, and القوة المركزية),
transcribed verbatim from `books/كتاب الطبيعيات.pdf`.

What it demonstrates end to end:

- Every definition, law/formula, worked example, and exercise from the
  source as its own card, in the source's own order.
- Multi-part "علّل" (explain-why) exercises as independent Exercise cards
  with the explanation hidden behind "إظهار الحل" until requested.
- Three bespoke, labeled, zoomable SVG physics diagrams (centripetal
  acceleration, resultant acceleration, centripetal force) built as a
  `customDiagram` block — see `src/components/diagrams/`.
- Real cropped textbook figures (`public/lesson-assets/`) for the solar
  system, a lab centrifuge, a car cornering, and a banked road.
- A Hint, a Warning, a Teacher Tip (flagging a genuine labeling
  inconsistency in the source's own worked example, verbatim), two "هل
  تعلم؟" Notes, an end-of-lesson quiz (4 MCQs, scoped numbering via a
  Section), a Summary, a Glossary, References, and an AI Tutor prompt.
- Every core physics fact traces back to the source PDF; nothing was
  invented. Supplementary text (the summary, glossary phrasing, quiz
  explanations, and the two derived "علّل" solutions not spelled out
  verbatim in the source) is built only from formulas and concepts the
  same pages already teach.

Every future lesson should match this one in structure, card usage,
diagram quality, and interactivity before being considered done.

## Status

Foundation, content engine, and the Golden Lesson are complete and
verified: tokens, theme engine, layout primitives, the full component
library, a data-driven rendering pipeline for every content block type,
and one fully real, richly interactive physics lesson — checked at
desktop/tablet/mobile widths, in light and dark mode, for RTL
correctness, overflow, and working interactivity (show-solution, quiz
answers, diagram zoom). Next step: Lesson Two, matching this lesson's
bar for quality.
