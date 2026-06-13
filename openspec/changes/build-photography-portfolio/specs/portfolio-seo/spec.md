## ADDED Requirements

### Requirement: Static HTML rendering for SEO
The system SHALL generate static HTML for all pages to ensure full SEO indexability.

#### Scenario: Pages render as static HTML
- **WHEN** site is built
- **THEN** all photo pages and album pages are rendered as static HTML files

#### Scenario: Content is crawlable
- **WHEN** search engine crawlers access the site
- **THEN** all content is visible in static HTML (no client-side rendering blocking)

### Requirement: Open Graph metadata
The system SHALL include Open Graph metadata for social media sharing.

#### Scenario: Photo OG metadata
- **WHEN** photo page is shared on social media
- **THEN** system displays photo title, description, and image preview

#### Scenario: Album OG metadata
- **WHEN** album page is shared on social media
- **THEN** system displays album title, description, and cover image

### Requirement: Structured data markup
The system SHALL include structured data using CreativeWork or Photograph schema.

#### Scenario: Photograph schema for photos
- **WHEN** photo page renders
- **THEN** system includes JSON-LD structured data identifying the photo with title, description, image, creator, date, location

#### Scenario: CreativeWork schema for albums
- **WHEN** album page renders
- **THEN** system includes JSON-LD structured data for the album collection

### Requirement: Sitemap generation
The system SHALL automatically generate XML sitemap for all indexed pages.

#### Scenario: Sitemap includes all photos
- **WHEN** site is built
- **THEN** sitemap.xml includes entries for all photo pages

#### Scenario: Sitemap includes all albums
- **WHEN** site is built
- **THEN** sitemap.xml includes entries for all album pages

### Requirement: Canonical URLs
The system SHALL include canonical URL tags on all pages.

#### Scenario: Photo canonical URL
- **WHEN** photo page renders
- **THEN** system includes canonical link to the primary photo URL

#### Scenario: Album canonical URL
- **WHEN** album page renders
- **THEN** system includes canonical link to the primary album URL

### Requirement: Alt text optimization
The system SHALL optimize alt text for accessibility and SEO.

#### Scenario: Alt text in masonry grid
- **WHEN** image displays in masonry grid
- **THEN** alt text combines photo title and contextual information

#### Scenario: Alt text in lightbox
- **WHEN** image displays in lightbox
- **THEN** alt text includes title, description excerpt, and metadata context

### Requirement: Location-based SEO targeting
The system SHALL optimize for geographic location keywords.

#### Scenario: Vienna and Austria targeting
- **WHEN** site renders
- **THEN** metadata, headings, and structured data include location-specific keywords for Vienna and Austria

#### Scenario: Homepage SEO text
- **WHEN** homepage renders
- **THEN** hero section includes SEO-optimized text targeting: Photographer Vienna, Event Photography Vienna, Portrait Photography Vienna, Documentary Photography Vienna, Visual Storytelling Austria
