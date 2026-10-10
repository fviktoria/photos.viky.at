## Context

The site is a Next.js 14+ static export (`output: 'export'`) using Contentful as the CMS. Existing pages use React Server Components and fetch from Contentful at build time via a typed client. The `portfolio_page` content type already supports curated photo arrays; the homepage today renders all photos from that entry with a client-side tag filter. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Introduce an `service_page` Contentful content type and the corresponding TypeScript interfaces, service, and mapper
- Add a dynamic Next.js route `app/[serviceSlug]/page.tsx` that resolves to audience pages (with `generateStaticParams` for static export)
- Build a landing page layout component with hero text, body copy, photo grid, and CTA
- Surface audience pages in navigation and sitemap
- Keep the homepage change minimal — it already works correctly; changes are editorial framing only

**Non-Goals:**
- Tag-based filtering on audience landing pages (tag filters stay on the homepage only)
- A/B testing of landing page copy
- Analytics events per audience page
- CMS-driven navigation ordering (nav links to audience pages are hardcoded at first, or driven by a fixed Contentful query)

## Decisions

### Decision 1: New `service_page` content type vs. reusing `portfolio_page`

**Chosen**: New `service_page` content type.

**Rationale**: `portfolio_page` has no slug or copy fields — repurposing it would require schema changes that affect the existing homepage fetch. A dedicated type keeps concerns separate and lets audience pages evolve independently (e.g. adding a hero image later).

**Alternative considered**: Adding a `slug`, `headline`, etc. to `portfolio_page`. Rejected because it complicates the homepage query and conflates two distinct editorial concepts.

---

### Decision 2: Dynamic route vs. static per-page routes

**Chosen**: Single dynamic route `app/[serviceSlug]/page.tsx` with `generateStaticParams`.

**Rationale**: The set of audience pages is CMS-driven and may grow. A dynamic route with static param generation means adding a new page in Contentful auto-generates the static HTML at the next build — no code change required.

**Alternative considered**: Manually creating `app/events/page.tsx`, `app/hochzeit/page.tsx`, etc. Rejected because it requires code changes every time a new audience page is added.

---

### Decision 3: Photo fetching strategy — curated array vs. tag-based query

**Chosen**: Curated photo array in the `service_page` entry (same pattern as `portfolio_page`).

**Rationale**: Gives full editorial control over which photos appear and in what order on each landing page. Tag-based queries would auto-populate but the editor loses curation ability, and tag taxonomies aren't maintained with landing pages in mind.

**Alternative considered**: Fetch photos by tag matching the audience page's slug. Rejected because tag values were designed for the homepage filter UI, not for routing.

---

### Decision 4: Navigation strategy for audience pages

**Chosen**: Fetch all published `service_page` slugs and headlines at build time; render them in the navigation as a flat list (or grouped under a "Services" label).

**Rationale**: Keeps navigation in sync with CMS without code changes. The fetch is a single lightweight query (slug + headline only) added to the layout or navigation component.

**Alternative considered**: Hardcode navigation links. Rejected because it would fall out of sync if audience pages are added/removed in Contentful.

---

### Decision 5: CTA destination

**Chosen**: CTA button always links to `/contact`.

**Rationale**: The contact page is the only conversion goal. Linking to a different URL per audience page adds CMS complexity with no benefit at this stage.

## Risks / Trade-offs

- **Slug collision with existing routes**: The dynamic `[serviceSlug]` segment could shadow existing routes if a Contentful editor creates a slug like `about` or `contact`. Mitigation: document reserved slugs; add a list of excluded slugs to `generateStaticParams` or use a path prefix (e.g. `/leistungen/[audiencePage]`).
- **Contentful content type setup is manual**: The `service_page` content type must be created in Contentful before the code can be tested end-to-end. Mitigation: document the required fields clearly in the tasks; consider a Contentful migration script if the team grows.
- **Build-time only — no preview**: Because it's a static export, draft audience pages in Contentful are only visible after a build with `CONTENTFUL_PREVIEW=true` if preview mode is added later. Mitigation: accepted for now; noted as a future concern.

## Migration Plan

1. Create `service_page` content type in Contentful (manual step, documented in tasks)
2. Deploy code changes — new route returns 404 until Contentful entries are published
3. Publish audience page entries in Contentful
4. Trigger a production build — static pages are generated
5. Rollback: remove the `[serviceSlug]` route directory; no data loss, Contentful entries remain

## Open Questions

- ~~Should a path prefix (e.g. `/leistungen/`) be used to avoid slug collisions, or is the flat slug approach (e.g. `/hochzeit`) preferred for cleaner URLs and better SEO?~~ **Resolved**: Flat slugs chosen (e.g. `/events`, `/paare`, `/hochzeit`, `/taufe`).
