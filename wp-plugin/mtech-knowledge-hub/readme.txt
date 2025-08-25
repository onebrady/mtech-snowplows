=== MTech Knowledge Hub ===
Contributors: mtech
Requires at least: 6.0
Tested up to: 6.x
Stable tag: 0.1.0
License: GPLv2 or later

Shortcode: [mtech_knowledge_hub]

Dev HMR: define('MTECH_KH_DEV', true) in wp-config.php and run `pnpm dev`.
Dev origin override (Docker): define('MTECH_KH_DEV_ORIGIN', 'http://host.docker.internal:5173');

Phase 2 updates:
Conditional loading:
- Assets load only on pages rendering the shortcode, not sitewide.

Cache-busting:
- CSS/JS include a filemtime version to avoid stale caches after deploy.

- Hero image uses WebP and responsive sources; eager load for above-the-fold.
- FAQ and HowTo JSON-LD embedded for rich results eligibility.
- Trust indicators and breadcrumb navigation added.
- Region selector persists choice; banner copy reflects selected region.


