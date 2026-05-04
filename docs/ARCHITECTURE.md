# Architecture

## Framework and Router

- Next.js: 16.x
- Router model: App Router (`src/app`)
- Rendering model: hybrid, but currently mostly client-driven rendering for feature components

## High-Level Structure

```txt
src/
  app/            # routes, root layout, metadata, error/not-found pages
  components/     # feature components
  constants/      # shared constants
  contexts/       # React contexts (Video, Transition)
  hooks/
    api/          # React Query hooks
    ui/           # local UI behavior hooks
  lib/
    api/          # axios instances, interceptors, request builders
    env/          # typed runtime config
    logger/       # centralized logging
    query/        # QueryProvider, query keys, retry policy
  types/          # shared types
  utils/          # pure utilities and dynamic imports
```

## Rendering Strategy (SSR vs CSR vs SSG)

- Root route structure is App Router.
- Most feature-heavy UI blocks are loaded via dynamic imports with `ssr: false` (client-rendered).
- React Query handles server-state fetching on the client side.
- No dedicated static generation strategy is currently documented for content pages.

## Data Fetching Patterns

- HTTP clients:
  - `src/lib/api/axios.ts` for TMDB
  - `src/lib/api/customAxios.ts` for custom backend
- API route builders: `src/lib/api/request.ts`
- Query orchestration: TanStack Query in `src/hooks/api/*`
- Query defaults from `src/lib/query/QueryProvider.tsx`:
  - staleTime: 15 min
  - gcTime: 1 hour
  - retries via shared policy (`retryPolicy.ts`)

## Component Hierarchy

- Root composition in `src/app/layout.tsx`:
  - `QueryProvider`
  - `VideoProvider`
  - `TransitionProvider`
- Page-level composition happens in route pages under `src/app` and `src/app/(pages)`.
- Feature folders under `src/components/*` hold presentational and interactive UI.

## Architectural Constraints

- Read env only from `src/lib/env/env.ts`.
- Keep API access in `src/lib/api/*` and query hooks in `src/hooks/api/*`.
- Keep logging through `src/lib/logger/logger.ts`.
