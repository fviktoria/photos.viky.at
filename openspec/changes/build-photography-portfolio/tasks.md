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

- [ ] 7.1 Configure Astro Image for automatic AVIF/WebP generation
- [ ] 7.2 Set image sizes for masonry grid (responsive srcset)
- [ ] 7.3 Implement lazy loading for below-the-fold images
- [ ] 7.4 Test lighthouse scores (target: 90+ performance)
- [ ] 7.5 Test image load times and optimization output

## 8. Accessibility

- [ ] 8.1 Ensure all images have meaningful alt text
- [ ] 8.2 Test keyboard navigation in lightbox (arrow keys, escape)
- [ ] 8.3 Add ARIA labels to filter buttons and navigation
- [ ] 8.4 Test with screen reader (VoiceOver/NVDA)
- [ ] 8.5 Verify color contrast meets WCAG AA standards

## 9. Testing & Validation

- [ ] 9.1 Test masonry grid responsive behavior on mobile, tablet, desktop
- [ ] 9.2 Test tag filtering functionality (single and combined filters if enabled)
- [ ] 9.3 Test lightbox opening, navigation, metadata display, close behavior
- [ ] 9.4 Test album page navigation and contained photo display
- [ ] 9.5 Verify all photos render correctly in grid
- [ ] 9.6 Verify album inheritance: missing photo metadata falls back to album values
- [ ] 9.7 Test image lazy loading and optimization
- [ ] 9.8 Verify sitemap includes all photos and albums
- [ ] 9.9 Test Open Graph metadata in social sharing (preview)
- [ ] 9.10 Validate JSON-LD schema using Google's Structured Data Testing Tool

## 10. Documentation

- [ ] 10.1 Document content structure in README (photo/album frontmatter fields)
- [ ] 10.2 Document how to add new photos and albums
- [ ] 10.3 Document image naming conventions and directory structure
- [ ] 10.4 Document how to add new tags
- [ ] 10.5 Document photo metadata inheritance rules
- [ ] 10.6 Add example photo and album files

## 11. Deployment

- [ ] 11.1 Configure build for static output (astro build)
- [ ] 11.2 Test full build locally (no errors)
- [ ] 11.3 Deploy to staging environment (Vercel or Cloudflare Pages)
- [ ] 11.4 Run lighthouse audit on staging
- [ ] 11.5 Verify all pages render and content displays correctly
- [ ] 11.6 Test image optimization on production CDN
- [ ] 11.7 Deploy to production
- [ ] 11.8 Monitor performance metrics post-deployment
