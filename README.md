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

### Homepage hero decorations

`src/components/hero/` — three purely decorative pieces that turn the
homepage hero into more of "a digital science lab" than a static landing
page, all `aria-hidden` and built the same way as the physics
simulations (CSS `@keyframes` for the actual motion — compositor-only,
no per-frame JS — plus `useInViewport` from `src/components/simulations/hooks.ts`
to pause every animation the instant it scrolls off-screen):

- **EarthMoonSystem** — Earth spins on its axis (rotating continents
  under a fixed radial-gradient light/shadow overlay), the Moon orbits
  around it on its own independent period.
- **ChemistryDecorations** — a sparse, gently floating/rotating cluster
  of a hexagonal ring, two simple ball-and-stick molecules, an
  electron-orbit glyph, and formula chips (H₂O, CO₂, NaCl, CH₄, O₂,
  H₂SO₄) — deliberately kept sparse rather than dense, per "elegant, not
  cluttered."
- **CircularMotionHero** — sits centered below the hero title: a
  spinning spoked wheel (rotational motion) plus an orbiting body
  carrying its live velocity and centripetal-force vectors (circular
  motion), both rotating around one shared pivot, with a soft SVG glow
  filter on the moving body.

All three respect `prefers-reduced-motion` (animations disabled
outright) and hide the two side decorations below a 900px viewport width
so a narrow phone screen keeps only the centered circular-motion
illustration — confirmed with no horizontal overflow at any breakpoint.

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

## Content policy: every image becomes an interaction

This is a standing rule for **all** content in this book, not just what's
built so far — it governs Lesson Three onward and any future chapter.

**Every educational image must contribute to learning through
interaction, animation, simulation, or exploration.** Whenever it's
technically possible to rebuild a static textbook figure as something a
student can manipulate, do that instead of embedding the picture. A
static image is only acceptable when recreating the figure would reduce
scientific accuracy (e.g. a genuine photograph being cited as a primary
source, or an apparatus too specific/rare to model faithfully).

What that means per subject, when future lessons reach these topics:

- **Physics** (circular motion, projectiles, motion graphs, vectors,
  electricity, magnetism, waves, optics): drag objects, move sliders,
  play/pause/reset, change variables, watch the effect immediately —
  never a static force diagram alone.
- **Astronomy** (solar system, Earth, Moon, eclipses, seasons, orbits):
  orbital motion and self-rotation together, at legible (not
  necessarily literal-scale) relative speeds, with zoom, labels,
  tooltips, and glow.
- **Chemistry** (atoms, molecules, ionic/covalent/metallic bonds,
  crystal structures): rotatable molecules, inspectable atoms,
  drag-to-bond interactions, visible bond angles.
- **Laboratory equipment** (centrifuge, microscope, balance, beakers,
  flasks, test tubes, electrical apparatus): pressable buttons,
  turnable knobs, openable lids, an animated "run the experiment," not
  a photo of the device.
- **Biology** (heart, lungs, digestive system, cells): animate the
  actual process — blood flow, breathing, food movement, cell
  division — not just a labeled static cross-section.

Every interactive figure should still teach: clickable labels, hover/tap
explanations with Arabic tooltips, and — where it makes sense — both a
guided walkthrough and free exploration. Motion stays smooth,
professional, and subtle; never flashy or distracting. Every simulation
must: run on `React + SVG` (`Canvas` only if a subject genuinely needs
pixel-level rendering `SVG` can't do reasonably), pause when scrolled
off-screen (`IntersectionObserver`) and when the browser tab is hidden
(Page Visibility API), respect `prefers-reduced-motion` by freezing
rather than autoplaying, work equally on desktop/tablet/mobile and
mouse/touch input, and be built from small reusable components (a shared
animation-frame hook, a shared pause/visibility hook, one component per
moving part) rather than one monolithic file per lesson. And nothing
about the simulation — the motion, the vectors, the labels, the
equations — may depict physics or science the source didn't actually
teach; interactivity is never a license to invent.

## Interactive simulations — "a virtual laboratory, not a scanned textbook"

Lessons One and Two are already fully compliant with the policy above —
every static photo of an apparatus, vehicle, or orbit across both
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
- **Solar System simulation** (`src/components/simulations/solar-system/`)
  — replaces Lesson One's static solar-system photo entirely. All 8
  planets orbit the Sun at their own angular velocity (Mercury fastest
  through Neptune slowest — never uniform), Earth spins on its own axis
  while the Moon orbits it and both revolve around the Sun together, the
  Sun pulses with a soft glow and a slowly-rotating corona, orbit paths
  glow with an animated marching-dash stroke, and a quiet twinkling star
  field fills the background. Every body (Sun, 8 planets, Moon) is
  hoverable, tappable, and keyboard-focusable, showing its Arabic name
  and a one-line educational fact via a pure-SVG `Tooltip` that shares
  the scene's own coordinate system — built from reusable
  `Planet`/`Orbit`/`Moon`/`Stars`/`Tooltip` components, not one
  monolithic file.

All simulations share two hooks: `useRafLoop` (a `requestAnimationFrame`
loop — the browser's native 60fps animation timer — reporting delta-time
between frames, capped at 50ms so a tab returning from the background
can't cause a huge simulation jump) and `useInViewport`
(`IntersectionObserver`-based), which **automatically pauses every
simulation's physics loop the instant it scrolls out of the
viewport** — confirmed by scrolling a running simulation away and back
and observing its state hadn't advanced while off-screen. The four
physics labs additionally share `SimShell` (play/pause/reset toolbar,
canvas, controls, live-value readouts); the Solar System has its own
lighter toolbar (no sliders/readouts needed) plus two more hooks —
`useDocumentVisible` (Page Visibility API, pauses when the browser tab
itself is hidden) and `usePrefersReducedMotion` — since under reduced
motion it freezes in place rather than just pausing on request, while
staying fully hoverable/tappable for its educational content.

### Concept-demo figures (`src/components/simulations/concept-demos/`)

Beyond the apparatus/vehicle/orbit photos above, five smaller in-lesson
diagrams (Figures 1-1 through 1-3 in Lesson One, 1-4 and 1-5 in Lesson
Two) were originally rebuilt as bespoke *static* SVGs — accurate and
labeled, but not actually interactive. Per the "every image becomes an
interaction" policy, each was reviewed individually and rebuilt again
with the specific interaction that teaches *its own* concept best,
deliberately not the same treatment five times over:

- **Figure 1-1** (`VectorDirectionDemo`) — the body auto-orbits or can
  be dragged to any point on the circle directly; v and aᴄ stay
  correctly tangent/radial from wherever it's placed, teaching that
  their directions never depend on position.
- **Figure 1-2** (`AccelerationComposerDemo`) — two independent sliders
  (aᵀ, aᴄ magnitude) with a live vector-sum parallelogram, teaching
  vector composition by letting the student build it themselves rather
  than read one fixed drawing.
- **Figure 1-3** (`CentripetalForceDemo`) — a single speed slider; Fᴄ's
  vector length and a live N-value both scale with the *square* of
  speed, isolating exactly the one relationship the formula asserts.
- **Figure 1-4** (`KeplerOrbitDemo`) — an eccentricity slider reshapes a
  true focus-based ellipse (`orbitMath.ts`) live, with the occupied
  focus fixed on screen so only the far side visibly stretches out —
  teaching that the gravitating body sits at a focus, not the center.
- **Figure 1-5** (`KeplerAreaSweepDemo`) — reuses the same accurate
  orbit math to sweep one wedge continuously over a fixed time window
  instead of showing two static wedges side by side, so the width
  visibly widens near the focus and narrows far from it in real time.

Figures 1-4 and 1-5 share `orbitMath.ts`: a true-anomaly, focus-based
ellipse parametrization where the angular rate is set to exactly
∝ 1/r² — the literal statement of Kepler's second law, not an
approximation — so both demos move consistently with each other and
with the physics actually being taught. All five share a lighter
`ConceptDemoShell` (title bar with an optional play/pause/reset, canvas,
optional sliders, optional one-line hint) rather than the heavier
`SimShell` built for the four full labs, since a single-slider or
drag-only demo doesn't need a controls/readouts grid designed for
multi-variable exploration — another instance of not reaching for the
same component just because it already existed.

## Every figure in Lessons One and Two — upgrade checklist

Lessons One and Two are the project's Golden Standard: every
educational image in both has been individually reviewed and, unless
recreating it would have reduced scientific accuracy, rebuilt as a real
interactive component. Nothing static remains.

| # | Figure | Lesson | Was | Now |
|---|--------|--------|-----|-----|
| 1 | Figure 1-1 — اتجاها v وaᴄ | One | bespoke static SVG | `VectorDirectionDemo` — drag/auto-orbit, live tangent + radial vectors |
| 2 | Figure 1-2 — محصلة التعجيل | One | bespoke static SVG | `AccelerationComposerDemo` — two-slider live vector composition |
| 3 | Figure 1-3 — القوة المركزية | One | bespoke static SVG | `CentripetalForceDemo` — speed slider, quadratic force scaling |
| 4 | Centrifuge (هل تعلم؟) | One | cropped textbook photo | `CentrifugeLab` — RPM + sample-mass sliders, start/stop, live aᴄ/Fᴄ |
| 5 | Circular-motion / car-cornering illustration | One | cropped textbook photo | `CircularMotionLab` — drag + radius/ω/mass sliders, live v/aᴄ/Fᴄ |
| 6 | Banked-road force diagram | One | cropped textbook photo | `BankedRoadLab` — angle/speed/friction sliders, live force decomposition + safe/slide status |
| 7 | Solar-system intro image | One | stock/cropped photo | `SolarSystemSimulation` — 8 planets at individual angular velocities, Earth+Moon, pulsing Sun, hoverable tooltips |
| 8 | Example 1 (satellite aᴄ) worked solution | One | example + step list | `guidedSolution` — 8-step zero-prior-knowledge format |
| 9 | Example 2 (car cornering speed) worked solution | One | example + step list | `guidedSolution` — 8-step zero-prior-knowledge format |
| 10 | Satellite-orbit hero image | Two | cropped textbook photo | `SatelliteMotionLab` — orbit trail, adjustable radius/speed/mass |
| 11 | Figure (Kepler's first law, ellipse) | Two | bespoke static SVG | `KeplerOrbitDemo` — eccentricity slider + drag, true focus-based ellipse |
| 12 | Figure (Kepler's second law, equal areas) | Two | bespoke static SVG | `KeplerAreaSweepDemo` — live sweeping wedge over a fixed Δt |

Rows 4-10 were completed in earlier rounds of this same standard; rows
1-3, 11-12 are this round's work. Every row shares the same
non-negotiables: pauses off-screen (`useInViewport`) and, where
continuous motion exists, respects `prefers-reduced-motion`; every
number, vector, and label is physically accurate to what the source
teaches — none of it was invented to make the interaction more
impressive.

## Guided Solutions — worked examples for a very weak student

The `guidedSolution` block type (`GuidedSolutionBlock.tsx`) replaces the
old example+step-solution pairing for every fully worked numeric problem.
Every one follows the same eight-step sequence, and the prose around the
math is kept to one short sentence per section on purpose — for a
student with zero prior knowledge, the math itself needs to occupy more
visual space than any explanation of it:

1. Restate the problem — one short sentence.
2. List every given quantity separately (المعطيات), each its own chip.
3. State what's asked for (المطلوب) — one short sentence.
4. Show the equation, with one short clause on why it applies.
5. Explain each unit conversion in one short clause before performing it.
6. **Each solving step is its own card**, separated by a divider: a short
   instruction line ("نربّع السرعة:") followed by its equations — formula,
   substitution, result — each on its own centered, KaTeX-rendered line.
   Never a sentence with the arithmetic folded into it (never "نقسم
   الناتج على نصف القطر: aᴄ = 132,059 ÷ 5,000,000" as one line — the
   instruction and the equation are always visually separate).
7. The final answer as one large, centered, highlighted KaTeX expression
   in its own green box, with an optional one-line note underneath (e.g.
   what the unit means).
8. A "خطأ شائع" (Common Mistake) box — one short sentence naming the
   single most frequent student error for that specific problem.

Both of Lesson One's worked examples (the satellite's centripetal
acceleration, and the car's maximum safe cornering speed), and the short
prose explanations behind its three "علّل" exercises, are written this
way — the reader should never have to parse a paragraph to find the one
number that matters.

## Gold Standard — the binding template for every remaining lesson

**Lessons One and Two are approved.** Every lesson from Lesson Three
onward — for the rest of Chapter One and every chapter after it — is
built to match them exactly. This is not a style preference to
reconsider per lesson; it's the fixed contract:

- Same layout and component structure — a lesson is `blocks:
  ContentBlock[]` rendered through `ContentBlockList`; a new lesson is a
  new data file wired into the registry, never a new page or a
  one-off layout.
- Same design language, typography, spacing, color, and motion —
  everything comes from `src/styles/tokens.css` and the existing
  glass-surface utilities. No new visual system, no new component
  family, unless a genuinely new kind of content demands one — and even
  then it's built to blend in (see `ConceptDemoShell` vs. `SimShell`:
  two shells, one shared visual language).
- The "every image becomes an interaction" policy applies without
  exception — see above. A static figure is only acceptable when
  recreating it would reduce scientific accuracy.
- Worked examples keep the same eight-step Guided Solution format (see
  below) for a reader with zero prior knowledge, every time.
- Reuse existing components and hooks first (`useRafLoop`,
  `useInViewport`, `useDocumentVisible`, `usePrefersReducedMotion`,
  `SimShell`/`ConceptDemoShell`, `DiagramDefs`/`VectorLabel`,
  `MathFormula`). Only build something new for a genuinely new
  interaction an existing piece can't already express.
- RTL Arabic, accessibility (keyboard focus, `aria-label`s, reduced
  motion, off-screen pausing), and responsiveness at
  desktop/tablet/mobile are non-negotiable for every new piece, not a
  follow-up pass.
- No fabricated content, ever: every definition, law, formula, example,
  and exercise traces back to `books/كتاب الطبيعيات.pdf`; a lesson
  simply omits a section (quiz, exercises, a given block type) rather
  than invent material the source doesn't have, exactly as Lesson Two
  omitted its quiz.

Design decisions within this contract (which existing component fits a
new figure, how a lesson's sections nest, wording of a hint) are made
without stopping to ask — the same way Lessons One and Two were built.
Only a genuine scientific ambiguity in the source material (unclear
scope boundary, an apparent inconsistency, a fact that needs
verification) is worth pausing for.

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
answers, diagram zoom, prev/next lesson navigation). **Lessons One and
Two are approved as the Gold Standard** (see above) — every remaining
lesson is built to match. Next step: Lesson Three.
