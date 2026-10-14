# Project Conventions

## File Naming

- Use kebab-case for all file names: `album-entry.ts`, `image-card.tsx`
- Append a type suffix to make the file's role immediately clear:
  - `.interface.ts` — TypeScript interfaces and types
  - `.client.ts` — API or service clients (e.g. Contentful client)
  - `.util.ts` — Pure helper/utility functions
  - `.service.ts` — Business logic / data-fetching functions
  - `.component.tsx` — React components
  - `.hook.ts` — Custom React hooks
  - `.config.ts` — Configuration constants and setup

Examples: `album.interface.ts`, `contentful.client.ts`, `image.util.ts`, `use-albums.hook.ts`

## File Responsibility

Keep files focused on a single concern — do not mix clients, types, helpers, and business logic in one file. If a file is doing more than one thing, split it.

## Static Export Constraints

This project uses `output: "export"` for production builds. The following Next.js features are **not compatible** and must not be used:

- **Middleware** (`middleware.ts`) — not supported with static export; do not create or suggest middleware-based solutions
- **Server-side rendering** (`getServerSideProps`, server actions that write/mutate) — all data fetching must be static (`generateStaticParams` + async page components at build time)
- **API routes** (`app/api/`) — not supported with static export
- **Image Optimization** — the built-in `next/image` optimizer is disabled; a custom loader is used instead (see `contentful-image.loader.ts`)
- **`next/headers`**, **`cookies()`**, **`redirect()` from `next/navigation`** at request time — these require a Node.js server

When adding i18n features, locale detection and routing must happen client-side or via static path generation (`generateStaticParams`), not via middleware.
