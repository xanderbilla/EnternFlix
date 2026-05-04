# Performance

## Current Optimizations

- Dynamic imports (`src/utils/dynamicImports.tsx`) for heavy client components.
- `next/image` used for optimized remote image loading.
- Remote image host allowlist generated in `next.config.js`.
- Query caching via TanStack Query:
  - staleTime = 15 min
  - gcTime = 1 hour
- Retry policy avoids wasteful retries on 4xx errors.

## Lazy Loading

- Multiple UI blocks are loaded with `next/dynamic` and `ssr: false`.
- IntersectionObserver helper exists in `src/utils/lazyLoadManager.ts`.

## Bundle Optimization

- Bundle analyzer integrated (`npm run analyze`).
- Console stripping in production via Next compiler settings.

## Caching Strategy

- Client data caching via React Query.
- Image caching behavior configured through Next image settings and host platform/CDN.

## Improvement Backlog

- Add route-level loading skeletons where missing.
- Review components currently forced client-side to recover SSR where possible.
- Add performance budgets (LCP, CLS, TBT) in CI checks.
