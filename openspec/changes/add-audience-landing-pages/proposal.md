## Why

The current homepage shows a generic photo grid with no editorial focus, and the site has no pages that speak to specific client needs. Potential clients looking for a wedding photographer or event photographer have no targeted entry point that builds trust and shows relevant work.

## What Changes

- **Homepage** becomes a curated "highlights" gallery — the existing `portfolio_page` content type already supports photo curation; the homepage will be renamed/re-framed as "Highlights" with tag filters retained. No Contentful model change needed here.
- **New audience landing pages** at routes like `/events`, `/paare`, `/hochzeit` (weddings), `/taufe` (baptisms) — each with a hero headline, descriptive copy, and a curated photo grid.
- **New Contentful content type** `service_page` with editorial fields (slug, SEO title, headline, tagline, body text, CTA label, curated photos array).
- **New Next.js dynamic route** `src/app/[audiencePage]/page.tsx` resolves slugs to audience page entries and renders the landing page layout.
- **New landing page component** `audience-page.component.tsx` — landing page style layout: full-width hero text, intro copy, photo grid (no filters), optional CTA button linking to contact.
- **Navigation** updated to link to audience pages (either in main nav or a "Services" section).

## Capabilities

### New Capabilities

- `audience-landing-pages`: Audience-specific landing pages (events, couples, weddings, baptisms) — Contentful-driven content model, dynamic Next.js routes, landing page layout component
- `highlighted-homepage`: Homepage re-framed as a curated highlights gallery with filters; existing `portfolio_page` curation in Contentful already provides this — minimal code change, primarily editorial setup

### Modified Capabilities

<!-- No existing spec-level requirements are changing — this is net-new routing and content. -->

## Impact

- **New Contentful content type**: `service_page` (slug, seoTitle, headline, tagline, bodyText, ctaLabel, photos)
- **New route**: `src/app/[serviceSlug]/page.tsx` + `src/lib/contentful/services/service-page.service.ts`
- **New interfaces**: `src/lib/contentful/interfaces/service-page.interface.ts`
- **New component**: `src/components/service-page.component.tsx`
- **Updated**: `src/components/navigation.tsx` to surface audience pages
- **Updated**: `src/app/sitemap.ts` to include audience page slugs
- No breaking changes to existing routes or content types
