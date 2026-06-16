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
