# Routing

## App Router Structure

Current routes under `src/app`:

- `/` -> `src/app/page.tsx`
- `/movies` -> `src/app/(pages)/movies/page.tsx`
- `/search` -> `src/app/(pages)/search/page.tsx`
- `/watch` -> `src/app/(pages)/watch/page.tsx`
- global error boundary -> `src/app/error.tsx`
- global not-found -> `src/app/not-found.tsx`

## Dynamic Routes

- No dynamic path segments (`[id]`) are currently used in app router files.
- Watch route currently reads query params (`id`, `type`) from URL search params.

## Layouts

- Root layout in `src/app/layout.tsx` sets metadata and providers.
- Search has route-group layout: `src/app/(pages)/search/layout.tsx`.

## Middleware Usage

- No `middleware.ts` is currently present.
- No request-time route interception or auth guard at edge/server middleware level.

## Protected Routes

- No protected route framework is currently implemented.
- If auth is added, preferred sequence:
  1. Add middleware for route guarding.
  2. Add redirect rules for unauthenticated users.
  3. Keep server-side validation authoritative.
