# منصة العلوم التفاعلية — Interactive Science Book (Platform Foundation)

This repository currently contains **only the platform foundation** — the
design system and reusable component library for a premium, RTL-first
Arabic educational platform. No educational content, chapters, or lessons
have been created yet; this is intentional and awaiting approval before
that work begins.

## Stack

- **Vite + React + TypeScript**
- CSS Modules for component-scoped styles, plain CSS custom properties for
  the design token layer
- **KaTeX** for math rendering
- RTL-first (`<html lang="ar" dir="rtl">`), **Cairo** webfont

## Structure

```
src/
  styles/
    tokens.css      // color system, type scale, spacing, radii, shadows, z-index
    global.css      // reset, RTL base, glass-surface utilities, a11y helpers
    layout.css       // container, bento grid, auto-grid, flex/stack utilities
  theme/
    ThemeContext.tsx // light/dark theme engine (data-theme + localStorage)
  components/
    layout/          // Header, Sidebar, Footer, Hero, Container, AppShell
    cards/           // Chapter/Lesson/Example/Exercise/Question/Solution/
                      // Formula/Note/Warning/Video/Image/Quiz/AIAssistant
    ui/              // Button, Modal, Tabs, Accordion, Timeline, ProgressBar,
                      // ThemeToggle
    math/            // MathFormula (KaTeX), InteractiveDiagramContainer
  pages/
    ShowcasePage.tsx  // component gallery — placeholder content only
```

## Design language

Educational Glassmorphism: frosted glass surfaces with high text contrast,
soft elevation, an indigo/amber/teal accent system, an 8pt spacing scale,
and a fluid Cairo type scale. Both light and dark themes are implemented
and WCAG AA contrast has been verified for text and badge color pairs.

## Running locally

```bash
npm install
npm run dev
```

## Status

Foundation complete: tokens, theme engine, layout primitives, and the full
component library are built and demoed on `ShowcasePage`. Next step
(pending approval): importing real chapter content.
