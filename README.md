# كتاب الطبيعيات التفاعلي — Interactive Physics Book (Platform Foundation)

This repository currently contains **only the platform foundation** — the
design system and reusable component library for a premium, RTL-first
Arabic physics learning platform. No educational content, chapters, PDFs,
or lessons have been imported yet; this is intentional and awaiting
approval before that work begins.

## Stack

- **Vite + React + TypeScript**
- CSS Modules for component-scoped styles, plain CSS custom properties for
  the design token layer
- **KaTeX** for math rendering
- RTL-first (`<html lang="ar" dir="rtl">`), **Cairo** webfont
- PWA-ready (`manifest.webmanifest`, installable, themed icons)

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
  components/
    layout/          // Header, Sidebar, Footer, Hero, Container, AppShell, Breadcrumb
    cards/           // Chapter/Lesson/Example/Exercise/Question/Solution/
                      // Formula/Note/Warning/Video/Image/Quiz/AIAssistant
    ui/               // Button, Input, Textarea, Modal, Tabs, Accordion, Timeline,
                      // ProgressBar, ThemeToggle, Skeleton, Spinner, EmptyState,
                      // ErrorState
    math/             // MathFormula (KaTeX), InteractiveDiagramContainer
  pages/
    HomePage.tsx      // landing page — placeholder content only
    ChapterPage.tsx   // chapter overview + lesson list — placeholder content only
    LessonPage.tsx    // full lesson reading flow — placeholder content only
    ShowcasePage.tsx  // component gallery — placeholder content only
```

## Design language

Educational Glassmorphism: frosted glass surfaces with high text contrast,
soft elevation, an indigo/amber/teal accent system, an 8pt spacing scale,
and a fluid Cairo type scale. Both light and dark themes are implemented
and WCAG AA contrast has been verified for text and badge color pairs.
Every card is built to grow with content — no fixed heights, no truncated
Arabic text — and has been stress-tested with long strings to rule out
overflow, clipping, or overlap at every breakpoint.

## Running locally

```bash
npm install
npm run dev
```

## Status

Foundation complete: tokens, theme engine, layout primitives, and the full
component library (including loading/empty/error states and form inputs)
are built and demoed on `ShowcasePage`. Next step (pending approval):
importing real physics chapter content.
