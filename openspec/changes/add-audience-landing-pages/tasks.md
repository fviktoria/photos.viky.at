## 1. Contentful Content Type Setup

- [x] 1.1 Create `service_page` content type in Contentful with fields: `slug` (Short text, unique), `seoTitle` (Short text), `headline` (Short text), `tagline` (Short text, optional), `bodyText` (Long text, optional), `ctaLabel` (Short text, optional), `photos` (References, many, links to `portfolio_photo`)
- [x] 1.2 Create at least one test `service_page` entry in Contentful (e.g. slug: `hochzeit`, headline: `Hochzeitsfotografie`) to validate the integration end-to-end

## 2. TypeScript Interface & Contentful Client

- [x] 2.1 Create `src/lib/contentful/interfaces/service-page.interface.ts` with `ServicePageSkeleton` type and `ResolvedServicePage` interface (id, slug, seoTitle, headline, tagline?, bodyText?, ctaLabel?, photos: ResolvedPhoto[])
- [x] 2.2 Create `src/lib/contentful/mappers/service-page.mapper.ts` with a `toServicePage` function that maps a Contentful entry to `ResolvedServicePage`
- [x] 2.3 Create `src/lib/contentful/services/service-page.service.ts` with `getAllServicePageSlugs(): Promise<string[]>` and `getServicePageBySlug(slug: string): Promise<ResolvedServicePage | null>`

## 3. Landing Page Component

- [x] 3.1 Create `src/components/service-page.component.tsx` — layout: hero section (headline + tagline), optional body text paragraph, `PhotoGrid` component for the curated photos, optional CTA button linking to `/contact`
- [x] 3.2 Ensure the component renders gracefully when `tagline`, `bodyText`, or `ctaLabel` are absent (omit those elements, no layout breakage)

## 4. Next.js Route

- [x] 4.1 Create `src/app/[serviceSlug]/page.tsx` with `generateStaticParams` that fetches all slugs via `getAllServicePageSlugs()`; add reserved slug exclusion list (`about`, `contact`, `portfolio`, `albums`) to prevent collisions
- [x] 4.2 In the page component, fetch the entry by slug via `getServicePageBySlug`; call `notFound()` if null
- [x] 4.3 Export `generateMetadata` that sets `title` from `seoTitle` and Open Graph `title`/`description` from `seoTitle`/`tagline`

## 5. Navigation

- [x] 5.1 Update `src/components/navigation.tsx` to fetch all published audience pages at build time (slug + headline) and render links to `/<slug>` — either inline in the nav bar or under a "Leistungen" / "Services" dropdown

## 6. Sitemap

- [x] 6.1 Update `src/app/sitemap.ts` to include one entry per published `service_page` slug, using the same base URL pattern as existing pages

## 7. Validation & Build Check

- [x] 7.1 Run `next build` and confirm static pages are generated for each audience page slug without errors
- [x] 7.2 Verify a 404 is returned for an unknown slug (e.g. `/does-not-exist`)
- [x] 7.3 Verify navigation links to audience pages are rendered on every page
- [x] 7.4 Verify audience page URLs appear in the sitemap output
