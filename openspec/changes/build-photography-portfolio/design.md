## Context

This is a personal photography portfolio for Viky (Vienna, Austria) built as a static site. The project uses Git as source of truth for content without a CMS. Originally started with Astro; **rewritten to Next.js 15 (App Router)** after initial implementation.

Key constraints:
- Must be fast and SEO-optimized
- Static generation preferred (no runtime overhead)
- Content managed in Git (JSON files in `content/`)
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

### 1. Static Site Generation with Next.js
**Decision**: Use Next.js 15 App Router with `output: 'export'` for fully static HTML generation.
**Rationale**: Next.js provides a familiar React ecosystem, excellent TypeScript support, built-in Metadata API for SEO, and static export works with Vercel, Cloudflare Pages, and any CDN. Switched from Astro after initial implementation.
**Alternatives Considered**:
- Astro: Initially used; replaced due to developer preference for React
- Hugo: Lower-level templating, less TypeScript integration
- Plain HTML: No content model or automation

### 2. JSON Files for Content
**Decision**: Store photo and album metadata as JSON files in `content/photos/` and `content/albums/`. File slug is derived from the filename.
**Rationale**: Simple, fast to parse (no YAML/markdown parser needed), type-safe with TypeScript interfaces, git-friendly. `src/lib/content.ts` reads files with Node.js `fs` at build time.
**Alternatives Considered**:
- Markdown with YAML frontmatter: Good for prose-heavy content; unnecessary for structured metadata
- Astro Content Collections: Astro-specific, not portable
- Headless CMS: Violates Git-as-source-of-truth requirement

### 3. TypeScript Interfaces for Content Validation
**Decision**: Content shape is enforced via TypeScript interfaces (`PhotoData`, `AlbumData`) in `src/lib/content.ts`.
**Rationale**: Zero runtime overhead, IDE autocompletion when editing content functions, no extra dependency.
**Alternative**: Zod schema validation at read time — adds runtime safety but adds dependency and complexity for author-controlled content.

### 4. Image Storage in public/images/
**Decision**: Store all image files in `public/images/` directory as static assets, referenced by filename in content.
**Rationale**: Simple, static, no build-time processing needed for images themselves. `next/image` can optimize images served from `public/` when deployed to Vercel.
**Alternatives Considered**:
- Hosted CDN: Adds external dependency, complicates Git-based workflow
- `src/assets/` with import: Requires knowing file paths at compile time, less flexible

### 5. Metadata Inheritance for DRY Content
**Decision**: Implement inheritance rules where photos inherit from albums (description, tags, location, date) when fields are omitted.
**Rationale**: Reduces duplication, enables efficient organization of large photo collections while maintaining flexibility.
**Implementation**: Validation layer in content schema with default values

### 6. Masonry Grid with Tailwind CSS
**Decision**: Use Tailwind CSS Grid and custom masonry layout for portfolio display.
**Rationale**: Modern, responsive, minimal custom CSS, integrates well with Next.js via `@tailwindcss/postcss`.
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

### 8. Dynamic Album Pages with Next.js App Router
**Decision**: Generate `/albums/[slug]` pages via `generateStaticParams` from the album JSON files.
**Rationale**: Next.js handles static param generation reliably; pages are pre-rendered at build time as static HTML.
**Alternative**: Manual route definition — not scalable as album count grows

### 9. SEO via Next.js Metadata API
**Decision**: Use Next.js built-in `Metadata` export and `generateMetadata` for Open Graph + canonical URLs + JSON-LD via `dangerouslySetInnerHTML`.
**Rationale**: No extra dependencies; Next.js Metadata API handles `<head>` injection correctly for static export. JSON-LD is rendered as an inline `<script>` tag.
**Alternatives Considered**:
- `next-seo` package: Extra dependency, Next.js Metadata API covers the same ground
- `astro-seo`: Astro-specific, not applicable

### 10. Tag System with Unlimited Extensibility
**Decision**: Tags defined as JSON array in content, no hardcoded tag list. UI generates tags from all content.
**Rationale**: Allows unlimited future tags without code changes. Initial UI shows common tags but system supports any tag.
**Implementation**: Aggregate all tags from content at build time via `getAllTags()`, pass to `PortfolioSection` for client-side filter state.

### 11. Lazy Loading for Images
**Decision**: Images rendered with plain `<img>` tags; lazy loading to be addressed in task 7.3 using `next/image` or native `loading="lazy"`.
**Rationale**: Initial implementation prioritises visibility; optimization is a separate concern (task group 7).
**Alternative**: `next/image` with known dimensions — requires adding `width`/`height` to JSON content schema

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Large image collections slow build time | Monitor build performance, consider splitting content by year if needed. Next.js incremental builds help. |
| Manual image management in public/ | Establish clear naming conventions and directory structure. Document in README. |
| No runtime image resizing | Accept static sizes generated at build time; document image specifications. |
| Metadata inheritance complexity | Clear documentation of inheritance rules; validation warns of missing required fields. |
| PhotoSwipe library size | Loaded client-side only via `useEffect`; only initializes when component mounts. |
| Dynamic route generation for albums | Test thoroughly; `generateStaticParams()` in Next.js requires valid content structure. |
| Static hosting limitations | Not an issue for portfolio; no backend required. CDN caching is beneficial. |

## Implementation Plan

### Phase 1: Content Structure Setup
1. Define TypeScript interfaces (`PhotoData`, `AlbumData`) in `src/lib/content.ts`
2. Implement `fs`-based JSON readers and resolver functions
3. Create JSON content files in `content/photos/` and `content/albums/`

### Phase 2: Component Development
1. Build `PortfolioSection` component (masonry grid + client-side filtering)
2. Implement `PhotoCard` component with PhotoSwipe data attributes
3. Develop `Lightbox` component with PhotoSwipe v5 integration
4. Build album page at `src/app/albums/[slug]/page.tsx`

### Phase 3: Homepage Integration
1. Create portfolio section on homepage with hero text
2. Integrate `PortfolioSection` with tag filtering
3. Add `Nav` component (Portfolio, About, Contact)

### Phase 4: SEO & Optimization
1. Add Open Graph metadata via Next.js Metadata API to all pages
2. Implement structured data (JSON-LD) for Photograph and CreativeWork schemas
3. Generate `sitemap.ts` and `robots.ts` with `force-static`
4. Add descriptive alt text generation logic in `PhotoCard`
5. Verify canonical URLs via `metadataBase` in root layout

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
