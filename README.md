# MTech Knowledge Hub (Vite + React + TypeScript)

Dev

1. pnpm install
2. pnpm dev
3. For WP HMR, define `define('MTECH_KH_DEV', true);` in wp-config.php and activate the `mtech-knowledge-hub` plugin, then use shortcode `[mtech_knowledge_hub]`.

Build for WordPress

- pnpm run build:wp (outputs single JS/CSS to `wp-plugin/mtech-knowledge-hub/assets`)

Embed

- Use shortcode `[mtech_knowledge_hub]` (optionally `[mtech_knowledge_hub id="custom-id"]`).

Phase 2 Notes

- Media: hero uses WebP with responsive `srcset`/`sizes`; above-the-fold image is `loading="eager"`.
- Schema: FAQ (8 Q&As) and HowTo (checklists) JSON-LD injected and validated via tests.
- UX Polish: Trust indicators on hero; breadcrumb trail on section pages.
- Region: selector persists to localStorage; banner copy updates accordingly.
