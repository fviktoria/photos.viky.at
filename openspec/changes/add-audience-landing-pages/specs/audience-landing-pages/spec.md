## Purpose

Provides audience-specific landing pages (e.g. event photography, weddings, baptisms) that present curated photo galleries alongside targeted copy to help prospective clients find relevant work and reach out.

## ADDED Requirements

### Requirement: Service page content model
The system SHALL support an `service_page` content type in Contentful with the following fields: `slug` (unique URL segment), `seoTitle`, `headline`, `tagline`, `bodyText`, `ctaLabel`, and an ordered array of linked `portfolio_photo` entries.

#### Scenario: Valid service page entry exists
- **WHEN** a Contentful `service_page` entry has a slug, headline, and at least one linked photo
- **THEN** the system SHALL render that page without errors

#### Scenario: Missing optional fields
- **WHEN** `tagline`, `bodyText`, or `ctaLabel` are absent in Contentful
- **THEN** the system SHALL omit those elements from the rendered page without error

### Requirement: Service page routing
The system SHALL resolve requests to `/<slug>` where `<slug>` matches a Contentful `service_page` entry's slug field.

#### Scenario: Slug matches an service page
- **WHEN** a visitor navigates to `/<slug>` and a matching `service_page` entry exists in Contentful
- **THEN** the system SHALL render the audience landing page for that entry

#### Scenario: Slug does not match any service page
- **WHEN** a visitor navigates to `/<slug>` and no matching `service_page` entry exists
- **THEN** the system SHALL return a 404 response

#### Scenario: Static export pre-renders all slugs
- **WHEN** the site is built with `next build`
- **THEN** a static HTML page SHALL be generated for every published `service_page` slug

### Requirement: Service page layout
Each audience landing page SHALL display: a prominent headline, an optional tagline, optional body copy, a curated photo grid, and an optional CTA button that links to `/contact`.

#### Scenario: Full content present
- **WHEN** all editorial fields are populated in Contentful
- **THEN** the page SHALL render headline, tagline, body text, photo grid, and CTA button in that visual order

#### Scenario: Photo grid renders curated photos only
- **WHEN** an service page is rendered
- **THEN** only the photos explicitly linked in that entry's `photos` field SHALL appear in the grid

#### Scenario: CTA button navigates to contact
- **WHEN** a visitor clicks the CTA button on an audience landing page
- **THEN** they SHALL be taken to the `/contact` page

### Requirement: Service page SEO
Each audience landing page SHALL have a unique `<title>` and meta `description` sourced from the `seoTitle` and `tagline` fields of the Contentful entry.

#### Scenario: SEO title rendered in head
- **WHEN** a visitor loads an audience landing page
- **THEN** the `<title>` element SHALL contain the value of the entry's `seoTitle` field

#### Scenario: Open Graph tags present
- **WHEN** a visitor loads an audience landing page
- **THEN** the page SHALL include Open Graph `title` and `description` meta tags derived from the Contentful entry

### Requirement: Service pages in navigation
The site navigation SHALL provide links to audience landing pages so visitors can discover them.

#### Scenario: Navigation links to service pages
- **WHEN** service pages exist in Contentful
- **THEN** links to those pages SHALL be accessible from the site navigation on every page

### Requirement: Service pages in sitemap
All published audience landing pages SHALL be included in the sitemap.

#### Scenario: Sitemap includes service page URLs
- **WHEN** the sitemap is generated at build time
- **THEN** it SHALL contain one entry per published `service_page` slug
