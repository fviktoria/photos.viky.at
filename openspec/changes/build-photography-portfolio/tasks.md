## 1. Setup & Dependencies

- [x] 1.1 Add required dependencies: photoswipe, astro-seo (or equivalent SEO integration)
- [x] 1.2 Create Content Collections config (`src/content/config.ts`) with Zod schemas
- [x] 1.3 Define Photo collection schema with required/optional fields and validation
- [x] 1.4 Define Album collection schema with required/optional fields and validation
- [x] 1.5 Create content directories: `src/content/photos/` and `src/content/albums/`
- [x] 1.6 Create images directory: `public/images/` with README documenting naming conventions

## 2. Content Model & Infrastructure

- [x] 2.1 Create utility function for metadata inheritance (photos inherit from albums)
- [x] 2.2 Create utility to fetch and aggregate all tags from photo and album content
- [x] 2.3 Create utility to fetch photos by tag with inheritance rules
- [x] 2.4 Create utility to fetch album with contained photos
- [x] 2.5 Add type definitions and exports from `src/content/config.ts`
- [x] 2.6 Create sample photo and album content files for testing

## 3. Components - Core Gallery UI

- [x] 3.1 Create `PhotoCard.astro` component for masonry grid items with lazy-loaded images
- [x] 3.2 Implement image optimization using Astro Image component (AVIF/WebP fallback)
- [x] 3.3 Create `PhotoGrid.astro` component for masonry layout with Tailwind CSS Grid
- [x] 3.4 Create `TagFilter.astro` component for tag-based filtering UI
- [x] 3.5 Create `Lightbox.astro` component with PhotoSwipe integration
- [x] 3.6 Implement PhotoSwipe initialization and configuration (metadata overlay, navigation)
- [x] 3.7 Add lightbox metadata display (title, description, location, date)
- [x] 3.8 Create `PortfolioSection.astro` combining grid + filters + lightbox

## 4. Pages - Portfolio & Albums

- [x] 4.1 Create portfolio page `/portfolio` (or integrate to homepage)
- [x] 4.2 Fetch all photos (with inheritance) and display in masonry grid
- [x] 4.3 Implement client-side tag filtering with state management (if needed)
- [x] 4.4 Create dynamic album page template: `src/pages/albums/[slug].astro`
- [x] 4.5 Implement album metadata display on album pages
- [x] 4.6 Display contained photos on album pages in masonry grid
- [x] 4.7 Add breadcrumb navigation on album pages
- [x] 4.8 Create link to return to main portfolio from album pages

## 5. Homepage Integration

- [x] 5.1 Update homepage hero section with Viky's photographer introduction text
- [x] 5.2 Add SEO keywords to hero: "Photographer Vienna", "Event Photography Vienna", etc.
- [x] 5.3 Create or update navigation menu with Portfolio, About, Contact links
- [x] 5.4 Integrate portfolio section into homepage (partial/preview or full grid)
- [x] 5.5 Ensure responsive design on mobile, tablet, desktop

## 6. SEO Optimization

- [x] 6.1 Create SEO layout/component for standard metadata (title, description)
- [x] 6.2 Generate and apply Open Graph metadata for each photo page
- [x] 6.3 Generate and apply Open Graph metadata for each album page
- [x] 6.4 Create and apply JSON-LD Photograph schema for photo pages
- [x] 6.5 Create and apply JSON-LD CreativeWork schema for album pages
- [x] 6.6 Generate XML sitemap including all photo and album pages
- [x] 6.7 Add canonical URLs to all pages
- [x] 6.8 Create alt text generation from title + metadata context
- [x] 6.9 Verify location-based SEO keywords appear in meta descriptions

## 7. Image Optimization & Performance

- [x] 7.1 Add `width` and `height` fields to photo JSON schema and content files (required for `next/image`)
- [x] 7.2 Replace plain `<img>` tags in `PhotoCard.tsx` and `PhotoGrid.tsx` with `next/image` and a static export–compatible loader
- [x] 7.3 Implement `loading="lazy"` on below-the-fold images (first 4–8 photos use `loading="eager"`)