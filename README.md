# كتاب الطبيعيات التفاعلي — Interactive Physics Book (Platform Foundation)

This repository currently contains the platform foundation and a complete
**content engine** — the design system, component library, and data-driven
rendering architecture for a premium, RTL-first Arabic physics learning
platform. No real chapter content or PDF has been imported yet; that is
intentional and awaiting approval before that work begins. Everything a
future chapter will need to render already exists and has been verified
against a full sample lesson exercising every content type.

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
  sample/
    sampleChapters.ts    // placeholder data — NOT Chapter One

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
```

### Supported content block types

Chapter and Lesson are structural; a Lesson is an ordered list of blocks.
`Section` is itself a block type that nests further blocks, so a lesson
can be flat or organized into titled sections, to any depth.

Definition · Concept · Formula · Example · Step-by-step Solution ·
Exercise · Multiple-choice Question · True/False Question · Fill in the
Blank · Interactive Diagram · Image · Video · Animation · Simulation ·
Hint · Note · Warning · Teacher Tip · AI Tutor · Summary · Glossary ·
References · Section

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

## Status

Foundation and content engine complete: tokens, theme engine, layout
primitives, the full component library, and a data-driven rendering
pipeline for every requested content block type are built and verified —
including a lesson that exercises all 22 block types together, an
unauthored lesson showing the empty state, dark mode, and RTL long-text
stress testing. Next step (pending approval): importing real physics
chapter content (Chapter One).
