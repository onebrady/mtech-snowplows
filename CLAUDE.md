# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **MTech Knowledge Hub**, a React TypeScript application that provides snow equipment knowledge content. The app is designed to be embedded as a WordPress plugin via shortcode `[mtech_knowledge_hub]` while also functioning as a standalone web application.

## Common Commands

### Development
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server on localhost:5173
- `pnpm preview` - Preview production build locally

### Build & Deploy  
- `pnpm build` - Standard production build (outputs to `dist/`)
- `pnpm build:wp` - WordPress plugin build (outputs to `wp-plugin/mtech-knowledge-hub/assets/`)
- `pnpm check:files` - Check file sizes before WordPress build

### Quality Assurance
- `pnpm lint` - Run ESLint
- `pnpm test` - Run Playwright tests (comprehensive visual regression and functionality tests)

## Architecture Overview

### Dual-Purpose Application
The application uses a unique mount system in `src/main.tsx` that supports both:
1. **Standalone mode**: Traditional React app mounting to `#root`  
2. **WordPress embed**: Exposes `window.MTechKnowledgeHub.mount()` for plugin integration

### Content Management System
Content is structured as a modular knowledge base:

- **Knowledge Sections** (`src/content/sections/`): Individual topic modules (plows-101, spreaders-101, etc.)
- **Content Types** (`src/content/types.ts`): TypeScript definitions for QA items, knowledge sections
- **Central Registry** (`src/content/knowledge.ts`): Aggregates all sections via `KNOWLEDGE_SECTIONS` array

Each knowledge section contains:
- QA pairs with optional groupings
- Interactive microtools (lane coverage estimator, salt usage calculator)
- Downloads, fact cards, and checklists
- Related section linking

### Component Structure
- **Pages**: Route-level components (`LandingPage`, `KnowledgeSectionPage`, `QuizPage`, `DownloadsPage`)
- **Knowledge Components** (`components/knowledge/`): QA display and grouping
- **Quiz System** (`components/quiz/`): Multi-step quiz engine with recommendation results
- **Microtools** (`components/microtools/`): Interactive calculators embedded in sections
- **SEO** (`components/seo/`): JSON-LD schema injection for FAQ and HowTo content

### Routing & Navigation
Uses HashRouter for WordPress compatibility. Routes:
- `/` - Landing page with knowledge grid
- `/section/:slug` - Individual knowledge section pages  
- `/quiz` - Interactive equipment recommendation quiz
- `/downloads` - Resource downloads page

### WordPress Integration
The WordPress plugin (`wp-plugin/mtech-knowledge-hub/`) handles:
- Conditional asset enqueuing based on shortcode presence
- HMR support for development (define `MTECH_KH_DEV=true` in wp-config.php)
- Fallback from Vercel-hosted assets to local dev server

### Build System
Vite configuration supports dual build modes:
- **Standard**: Multi-chunk output for web hosting
- **WordPress**: Single-file bundles (`knowledge-hub.js`, `knowledge-hub.css`) for plugin embedding

### Testing Strategy
Comprehensive Playwright test suite covering:
- Visual regression testing with screenshots
- Content validation and structure
- Quiz logic and user flows  
- WordPress integration scenarios
- Accessibility and schema validation

## Development Patterns

### Adding Knowledge Content
1. Create new section file in `src/content/sections/`
2. Export section object matching `KnowledgeSection` type
3. Import and add to `KNOWLEDGE_SECTIONS` array in `knowledge.ts`
4. Add corresponding icon from Lucide React

### WordPress Development
- Enable HMR: Add `define('MTECH_KH_DEV', true);` to wp-config.php
- Use shortcode: `[mtech_knowledge_hub]` or `[mtech_knowledge_hub id="custom-id"]`
- Local WordPress setup available via `wp-local/docker-compose.yml`

### Content Guidelines
- QA answers support basic HTML markup
- Maintain consistent terminology via `src/content/glossary.ts`
- Regional compliance information uses `RegionSelector` component with localStorage persistence