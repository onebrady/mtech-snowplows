# Code Splitting Plan (WP single-bundle compatible)

Goal: keep source files small and maintainable while preserving single JS/CSS output for WordPress enqueue.

## Thresholds & Triggers

- Refactor a file when it approaches 350 lines (hard limit 400 lines).
- Split by responsibility: UI container vs. presentational pieces, micro-tools, and data.

## Structure Guidelines

- One component per file; extract subviews (Card, List, Item) into local modules.
- Move large constant data (Q&As, terms) to `src/content/` modules.
- Keep micro-tools in `src/components/microtools/` with minimal props and internal state.
- Use `src/components/shared/` for cross-cutting UI (CTA, banners, schema injectors).

## Optional dynamic import (future)

- If WP delivery allows multiple chunks later, use `import()` for:
  - Micro-tools (LaneCoverage, SaltUsage)
  - Heavy pages (quiz Phase 2)
- Guard SSR/DOM access and show lightweight fallback.

## Build Constraint

- Current Vite build intentionally disables chunk splitting to produce single bundle. Maintain this until asset strategy changes.
