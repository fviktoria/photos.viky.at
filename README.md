# photos.viky.at

Photography portfolio — built with Next.js 16 and Contentful.

## Stack

- **Next.js 16** (App Router, static export)
- **Contentful** — content source for albums and photos
- **Tailwind CSS v4**
- **PhotoSwipe** — lightbox

## Project Structure

```text
src/
├── app/
│   ├── page.tsx                  # Home / portfolio overview
│   ├── portfolio/page.tsx        # Portfolio page
│   ├── albums/[slug]/page.tsx    # Album detail page
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── navigation.tsx
│   ├── portfolio-section.tsx
│   ├── photo-grid.tsx
│   ├── photo-card.tsx
│   ├── tag-filter.tsx
│   └── light-box.tsx
├── lib/
│   ├── contentful/
│   │   ├── contentful.client.ts
│   │   ├── interfaces/           # TypeScript types
│   │   ├── mappers/              # Contentful entry → domain model
│   │   ├── services/             # Data-fetching functions
│   │   └── utils/
│   └── seo/
│       └── structured-data.util.ts  # JSON-LD schema builders
└── styles/
    └── global.css
```

## Commands

| Command         | Action                        |
| :-------------- | :---------------------------- |
| `npm install`   | Install dependencies          |
| `npm run dev`   | Start dev server at `localhost:3000` |
| `npm run build` | Build for production          |
| `npm start`     | Start production server       |

## Environment Variables

```env
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
```
