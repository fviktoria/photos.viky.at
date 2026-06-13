## Context

This is a personal photography portfolio for Viky (Vienna, Austria) built as a static site. The current state includes basic Astro setup but no content collections, portfolio UI, or gallery functionality. The project uses Git as source of truth for content without a CMS.

Key constraints:
- Must be fast and SEO-optimized
- Static generation preferred (no runtime overhead)
- Content managed in Git (markdown files)
- Support for large image collections
- Responsive design for mobile-first viewing

## Goals / Non-Goals

**Goals:**
- Implement complete content model (photos + albums) with metadata inheritance
- Build responsive masonry grid for photo discovery with tag-based filtering
- Integrate PhotoSwipe lightbox for full-size image viewing
- Enable album grouping with narrative collection pages
- Optimize for SEO with static HTML, Open Graph, structured data, and sitemaps
- Support scalable content structure for unlimited future tags and photos

**Non-Goals:**
- No user accounts or authentication
- No image upload functionality (images must be added via Git)
- No comment/rating system
- No CMS integration
- No dynamic image resizing at runtime

## Decisions

### 1. Static Site Generation with Astro
**Decision**: Use Astro's SSG capabilities exclusively, no SSR routes.
**Rationale**: Astro is optimized for static generation, provides excellent image optimization, and generates fast HTML. Perfect for image-heavy portfolio sites.
**Alternatives Considered**: 
- Next.js: Overkill for static portfolio, unnecessary JavaScript overhead
- Hugo: Lower-level templating, less TypeScript integration
- Plain HTML: No content model or automation

### 2. Content Collections for Schema Validation
**Decision**: Use Astro Content Collections API to define Photo and Album schemas.
**Rationale**: Provides type-safe frontmatter validation, enables programmatic access, and prevents invalid content structures.
**Alternatives Considered**:
- Plain markdown with custom parsing: More flexible but fragile, requires manual validation
- Headless CMS: Violates Git-as-source-of-truth requirement

### 3. Markdown Files with YAML Frontmatter for Content
**Decision**: Store photos and albums as markdown files in `src/content/` with YAML frontmatter for metadata.
**Rationale**: Git-friendly, version control friendly, no database required, markdown descriptions enable rich content.
**Alternative**: JSON files - less expressive for descriptions, less human-readable in version control

### 4. Image Storage in public/images/
**Decision**: Store all image files in `public/images/` directory as static assets, referenced by filename in content.
**Rationale**: Simple, static, no build-time processing needed for images themselves (Astro Image handles optimization at build time).
**Alternatives Considered**:
- Hosted CDN: Adds external dependency, complicates Git-based workflow
- Build-time image processing: Already handled by Astro Image component

### 5. Metadata Inheritance for DRY Content
**Decision**: Implement inheritance rules where photos inherit from albums (description, tags, location, date) when fields are omitted.
**Rationale**: Reduces duplication, enables efficient organization of large photo collections while maintaining flexibility.
**Implementation**: Validation layer in content schema with default values

### 6. Masonry Grid with Tailwind CSS
**Decision**: Use Tailwind CSS Grid and custom masonry layout for portfolio display.
**Rationale**: Modern, responsive, minimal custom CSS, integrates well with Astro.
**Alternatives Considered**:
- CSS Columns: Less control over item sizing
- JavaScript-based masonry: Unnecessary complexity for static content

### 7. PhotoSwipe for Lightbox Gallery
**Decision**: Integrate PhotoSwipe v5 for image lightbox with metadata overlay.
**Rationale**: Mature, touch-friendly, supports keyboard navigation, minimal dependencies, good performance.
**Alternatives Considered**:
- Lightbox2: Older, less modern
- Swipebox: Smaller but fewer features
- Custom lightbox: Significant development effort

### 8. Dynamic Album Pages with Astro Dynamic Routes
**Decision**: Generate `/albums/[slug]` pages dynamically from album collection.
**Rationale**: Astro's dynamic routes handle this automatically with minimal boilerplate, enables narrative browsing.
**Alternative**: Static pre-generation - requires manual route definition

### 9. SEO via Astro Integrations and Manual Markup
**Decision**: Use Astro's built-in head management + astro-seo integration for Open Graph + JSON-LD structured data for schema markup.
**Rationale**: Astro provides helpers for managing head tags, integrations reduce boilerplate, schema.org structured data improves search visibility.
**Alternatives Considered**:
- Headless SEO service: Adds dependency, unnecessary complexity
- Manual markup: Works but error-prone and maintenance-heavy

### 10. Tag System with Unlimited Extensibility
**Decision**: Tags defined as YAML array in content, no hardcoded tag list. UI generates tags from all content.
**Rationale**: Allows unlimited future tags without code changes. Initial UI shows common tags but system supports any tag.
**Implementation**: Aggregate all tags from content at build time, generate filter options dynamically.

### 11. Lazy Loading for Images
**Decision**: Use Astro Image component with `loading="lazy"` attribute for masonry grid images.
**Rationale**: Improves page load performance, especially for mobile. Astro Image handles format optimization (AVIF/WebP fallback).
**Alternative**: Eager loading - unnecessary overhead for above-the-fold images in masonry

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Large image collections slow build time | Monitor build performance, consider splitting content by year if needed. Astro's caching helps. |
| Manual image management in public/ | Establish clear naming conventions and directory structure. Document in README. |
| No runtime image resizing | Accept static sizes generated at build time; document image specifications. |
| Metadata inheritance complexity | Clear documentation of inheritance rules; validation warns of missing required fields. |
| PhotoSwipe library size | Lazy-loaded via dynamic import; only loads when lightbox is first opened. |
| Dynamic route generation for albums | Test thoroughly; Astro handles reliably but requires valid content structure. |
| Static hosting limitations | Not an issue for portfolio; no backend required. CDN caching is beneficial. |

## Migration Plan

### Phase 1: Content Structure Setup
1. Create Astro Content Collections schemas (`src/content/config.ts`) for Photo and Album
2. Define validation rules and type exports
3. Create sample content structure documentation

### Phase 2: Component Development
1. Build PhotoPortfolio component (masonry grid + filtering)
2. Implement PhotoCard component with image lazy loading
3. Develop Lightbox component with PhotoSwipe integration
4. Build AlbumPage component for `/albums/[slug]` layout

### Phase 3: Homepage Integration
1. Create portfolio section on homepage
2. Integrate filtering system
3. Add navigation menu (Portfolio, About, Contact)
4. Implement hero section with SEO text

### Phase 4: SEO & Optimization
1. Add Open Graph metadata to photo and album layouts
2. Implement structured data (JSON-LD) for Photograph and CreativeWork schemas
3. Generate sitemap
4. Add alt text generation logic
5. Verify canonical URLs

### Phase 5: Testing & Deployment
1. Test responsive design across devices
2. Validate image optimization output
3. Verify lightbox functionality and accessibility
4. Test tag filtering and album navigation
5. Deploy to Vercel or Cloudflare Pages

### Rollback Strategy
- Keep current state in git history
- Deploy to staging first for validation
- Simple rollback: revert commit and redeploy

## Open Questions

1. **Image size specifications**: What are target image dimensions for masonry grid? (e.g., 400px wide, variable height)
2. **Initial content seeding**: Do we have sample photos ready, or should we create with placeholder content?
3. **Tag initial set**: Are "Events, Portraits, Documentary, Street" the right starting tags? Can we add "Other" as catch-all?
4. **About/Contact pages**: Beyond portfolio, what other pages needed? (About, Contact, Services?)
5. **Performance targets**: Any specific lighthouse/performance benchmarks to hit?
6. **EXIF display**: Should photos display camera/lens EXIF data in lightbox when available?
7. **Blog/Posts**: Future need for blog entries alongside portfolio photos?
