# كتاب الطبيعيات التفاعلي — Interactive Physics Book

This repository contains the platform foundation, a complete **content
engine**, and two real lessons of Chapter One, built to a "virtual
laboratory, not a scanned textbook" standard: every static photo of an
apparatus or process has been replaced with a live, draggable,
60fps SVG simulation, and every worked example is rebuilt for a student
with zero prior knowledge — never a jump straight to a calculation.

Only these two lessons are imported so far, by design — the rest of
Chapter One (rotational motion, angular momentum) is intentionally not
yet written.

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
  Figure1_1.tsx … Figure1_5.tsx // bespoke labeled-vector SVG diagrams —
                          // the escape hatch for physics illustrations
                          // too specific for the declarative DiagramShape
                          // primitives. Looked up by diagramId through
                          // registry.tsx from a `customDiagram` block —
                          // content still stays pure data. Static —
                          // for anything that moves, see simulations/ below.

src/components/simulations/
  hooks.ts               // useRafLoop (requestAnimationFrame loop with
                          // delta time) and useInViewport
                          // (IntersectionObserver) — every lab is built
                          // on these two primitives
  SimShell.tsx            // shared card: title, play/pause/reset toolbar,
                          // canvas, controls, live-value readouts strip.
                          // Auto-pauses its animation the moment it
                          // scrolls out of the viewport.
  SimSlider.tsx            // labeled range input with a live numeric readout
  <Name>Lab.tsx           // CircularMotionLab, SatelliteMotionLab,
                          // CentrifugeLab, BankedRoadLab — full physics
                          // simulations (drag, sliders, live vectors,
                          // 60fps), looked up by simId through
                          // registry.ts from an `interactiveSim` block
```

### Supported content block types

Chapter and Lesson are structural; a Lesson is an ordered list of blocks.
`Section` is itself a block type that nests further blocks, so a lesson
can be flat or organized into titled sections, to any depth.

Definition · Concept · Formula · Example · Step-by-step Solution ·
Guided Solution (weak-student-friendly worked example) · Exercise ·
Multiple-choice Question · True/False Question · Fill in the Blank ·
Interactive Diagram (declarative shapes) · Custom Diagram (bespoke,
static SVG) · Interactive Simulation (real physics lab: drag, sliders,
live vectors) · Image · Video · Animation · Simulation (generic
placeholder card) · Hint · Note · Warning · Teacher Tip · AI Tutor ·
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
- Three bespoke, labeled, zoomable **static** SVG physics diagrams
  (centripetal acceleration, resultant acceleration, centripetal force)
  built as a `customDiagram` block — see `src/components/diagrams/` —
  for illustrating a concept at a single instant.
- Three **interactive simulations** (see below) for the apparatus/process
  figures that used to be static photos: a circular-motion playground, a
  spinning centrifuge, and a banked road with live force decomposition.
- Two worked examples rebuilt as **Guided Solutions** (see below) for a
  student with no prior knowledge.
- A Hint, a Warning, a Teacher Tip, two "هل تعلم؟" Notes, an
  end-of-lesson quiz (4 MCQs, scoped numbering via a Section), a Summary,
  a Glossary, References, and an AI Tutor prompt.
- Every core physics fact traces back to the source PDF; nothing was
  invented. Supplementary text (the summary, glossary phrasing, quiz
  explanations, and the two derived "علّل" solutions not spelled out
  verbatim in the source) is built only from formulas and concepts the
  same pages already teach.

Every future lesson should match this one in structure, card usage,
diagram/simulation quality, and interactivity before being considered done.

## Lesson Two

`c1-l2` — "مدارات الأقمار الاصطناعية وقوانين كبلر" — covers section ١-٤
of Chapter One, transcribed verbatim from pages 9–10 of the same source
PDF: the three laws of Kepler (paths, areas, periods) and the Newton's
universal gravitation reminder box that follows them.

Two bespoke static diagrams illustrate the two geometric laws (an
elliptical orbit with two foci for the first law; a wide-near/thin-far
equal-areas wedge pair for the second), and its hero image is now the
Satellite Motion Lab simulation (see below) instead of a photo.

This lesson has **no quiz or exercise blocks**, by design: the source's
question bank (pages 19–20) has no MCQ, worked example, or exercise for
Kepler's laws anywhere in it. Rather than invent one to match Lesson
One's shape, this lesson simply omits it — the no-fabrication standard
takes priority over structural symmetry between lessons.

## Interactive simulations — "a virtual laboratory, not a scanned textbook"

Every static photo of an apparatus, vehicle, or orbit across both
lessons has been replaced with a fully interactive SVG simulation
(`interactiveSim` block type, `src/components/simulations/`):

- **Circular Motion Lab** — drag the orbiting body directly around its
  path, or adjust radius/angular velocity/mass with sliders; v, aᴄ, and
  Fᴄ recompute and redraw every frame. Replaces the car-cornering photo.
- **Satellite Motion Lab** — an orbiting satellite with a fading trail,
  velocity and centripetal-force vectors, adjustable orbit radius/speed/
  mass. Replaces the static satellite photo in Lesson Two.
- **Centrifuge Lab** — a six-tube rotor, start/stop, adjustable RPM and
  sample mass, live aᴄ and Fᴄ. Replaces the centrifuge photo.
- **Banked Road Lab** — adjustable bank angle, car speed, and friction
  coefficient; the full force diagram (N and its N sinθ/N cosθ
  components, mg, Fᴄ, and the friction actually required) redraws live,
  with a status readout reporting whether the car stays on its path or
  slides — using the standard banked-curve-with-friction formula, an
  honest extension of Example 2's flat-curve case and the source's own
  banked-road note, not an invented result.

All four share `SimShell` (play/pause/reset toolbar, canvas, controls,
live-value readouts) and two hooks: `useRafLoop` (a
`requestAnimationFrame` loop — the browser's native 60fps animation
timer — reporting delta-time between frames, capped at 50ms so a tab
returning from the background can't cause a huge simulation jump) and
`useInViewport` (`IntersectionObserver`-based), which **automatically
pauses every simulation's physics loop the instant it scrolls out of the
viewport** — confirmed by scrolling a running simulation away and back
and observing its state hadn't advanced while off-screen.

## Guided Solutions — worked examples for a student with zero prior knowledge

The `guidedSolution` block type (`GuidedSolutionBlock.tsx`) replaces the
old example+step-solution pairing for every fully worked numeric problem.
Every one follows the same eight-step sequence, never jumping straight
to a calculation:

1. Restate the problem in simple Arabic.
2. List every given quantity separately (المعطيات).
3. State what's actually being asked for (المطلوب).
4. Show the equation, and explain *why* it's the right one for this
   question — not just assert it.
5. Explain every unit conversion before performing it (e.g. "the radius
   is in km but the equation needs SI units, so we convert to meters
   first, by multiplying by 1000").
6. One arithmetic operation per line — never two steps folded into one.
7. The final answer, highlighted in its own box.
8. A "خطأ شائع" (Common Mistake) box naming the single most frequent
   student error for that specific problem.

Both of Lesson One's worked examples (the satellite's centripetal
acceleration, and the car's maximum safe cornering speed) are rewritten
this way.

## Status

Foundation, content engine, and two fully real lessons of Chapter One are
complete and verified: tokens, theme engine, layout primitives, the full
component library, a data-driven rendering pipeline for every content
block type, 5 bespoke static physics diagrams, 4 full interactive
simulations (drag, sliders, live vectors, play/pause/reset, auto-pause
off-screen), and 2 worked examples rebuilt as zero-prior-knowledge Guided
Solutions — all checked at desktop/tablet/mobile widths, in light and
dark mode, for RTL correctness, overflow, and working interactivity
(drag, sliders, play/pause/reset, off-screen pausing, show-solution, quiz
answers, diagram zoom, prev/next lesson navigation). Next step: Lesson
Three, matching this same bar for quality.
