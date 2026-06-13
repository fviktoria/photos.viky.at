## Why

Building a professional photography portfolio requires a fast, SEO-optimized static site that showcases visual work with minimal overhead. A Git-based content model eliminates the need for a CMS while maintaining flexibility for photographers to manage their portfolio directly through version control.

## What Changes

- Creates Next.js 15 App Router static site (`output: 'export'`) for photography portfolio
- Implements JSON-based content model for photos and albums with metadata inheritance
- Adds masonry grid layout with tag-based filtering on homepage portfolio
- Implements PhotoSwipe lightbox for image viewing with metadata display
- Implements SEO features: Open Graph, structured data, sitemaps, canonical URLs
- Creates album pages for narrative-based browsing (/albums/[slug])
- Establishes Git-based content management without CMS

## Capabilities

### New Capabilities
- `portfolio-grid`: Masonry grid display of all photos with infinite scroll, lazy-loading, and tag-based filtering (All, Events, Portraits, Documentary, Street)
- `photo-content-model`: Photo content collection with metadata (title, description, tags, location, date, album reference) and individual addressability
- `album-content-model`: Album content collection for grouping related photos with metadata inheritance rules
- `lightbox-gallery`: PhotoSwipe-based image lightbox with title, description, location, date, and album context display
- `portfolio-seo`: SEO optimization including Open Graph metadata, structured data (CreativeWork schema), sitemap generation, canonical URLs, and alt text
- `album-pages`: Individual album browsing pages at /albums/[slug] showing narrative collections with metadata and contained photos

## Impact

- Affects: Site architecture, routing, content organization (content/, public/images, src/)
- Dependencies: Next.js 15, React 19, TypeScript, Tailwind CSS v4, PhotoSwipe v5
- New configuration: TypeScript interfaces in `src/lib/content.ts`; JSON files in `content/`
- Build pipeline: Static generation via `next build` with `output: 'export'`
- Deployment: Vercel or Cloudflare Pages compatible
