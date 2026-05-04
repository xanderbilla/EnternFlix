# Frontend Developer Guide

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Default app URL: `http://localhost:3000`

## Folder Conventions

- `src/app`: routes, metadata, global layout
- `src/components/<Feature>`: feature-first component organization
- `src/hooks/api`: data hooks using React Query
- `src/hooks/ui`: behavior hooks for UI interactions
- `src/lib`: platform/infrastructure code (API/env/query/logger)
- `src/utils`: pure helpers and dynamic import registry

## Component Rules

- Prefer small, focused functional components.
- Keep data-fetching logic inside hooks, not UI components.
- Avoid direct `console.*`; use shared logger.
- Reuse shared utility/helpers instead of inline transformations.

## Naming Conventions

- Components: `PascalCase.tsx`
- Hooks: `useXxx.ts`
- Utilities/constants: `camelCase.ts` with named exports where practical
- Feature folders: semantic names (`MovieList`, `WatchPage`, `TitlePage`)

## Adding a New Page

1. Create route file under `src/app` (or route group under `src/app/(pages)`).
2. Export route-level `metadata` where relevant.
3. Implement page composition with existing providers and feature components.
4. If data is needed, create/update hook in `src/hooks/api`.
5. Add tests for any new non-trivial utility or data behavior.

## Adding a New Component

1. Create component in feature folder under `src/components`.
2. Keep props typed from `src/types` if shared.
3. Avoid mixing transport logic (axios/query) into view components.
4. Use Tailwind utility classes and shared patterns from existing UI.
5. Add unit/component tests if behavior is critical.
