# Performance

The two performance goals are: ship the smallest JavaScript bundle that still renders the route, and never re-fetch data the user already has.

## Rendering Strategy

| Surface                    | Type                        | Why                                               |
| -------------------------- | --------------------------- | ------------------------------------------------- |
| `src/app/layout.tsx`       | Server                      | Boots providers; no interactivity at this level   |
| `src/app/page.tsx`         | Server                      | Issues 308 redirect to `/browse`; zero JS shipped |
| `src/app/(pages)/browse/*` | Server                      | Static composition + client carousels inside      |
| `src/app/(pages)/watch`    | Server (with client island) | Metadata + JSON-LD on server, player on client    |
| Carousels, dialogs, player | Client (`"use client"`)     | DOM measurement, refs, event handlers             |

Default to server components. Add `"use client"` only when you need refs, state, effects, or browser APIs.

## Code Splitting

- Route-level splitting is automatic via the App Router.
- Heavy client islands are isolated in their own files so server pages stay light.
- The repo does **not** use `next/dynamic` for app code (see `src/utils/dynamicImports.tsx` history note). Reach for it only if a component is rarely visited and pulls in a heavy third-party dep (e.g. an analytics dashboard).

## Bundle Analysis

```bash
ANALYZE=true npm run build
```

Opens the `@next/bundle-analyzer` report. Watch for:

- Duplicate copies of `react`, `axios`, `hls.js`.
- Accidental client-side imports of server-only modules.
- Large icon imports — prefer per-icon imports from `lucide-react`.

## Images

`RemoteImage` (`src/components/UI/RemoteImage.tsx`) wraps `next/image` and:

- Forces `width` / `height` to prevent CLS.
- Defaults to `loading="lazy"`. Pass `priority` for above-the-fold banners only.
- Uses configured remote patterns (see [CONFIGURATION.md](CONFIGURATION.md)).

`next.config.js → images`:

- `formats: ["image/avif", "image/webp"]` — modern formats first.
- `deviceSizes` and `imageSizes` tuned for the app's breakpoints.

## Fonts

System fonts via Tailwind defaults. No webfont request. If a brand font is added, use `next/font` so it is self-hosted and preloaded.

## Data Fetching

| Pattern                                  | Where                                     |
| ---------------------------------------- | ----------------------------------------- |
| Server: `React.cache(fetchTitleData)`    | `generateMetadata` + page share one fetch |
| Client: TanStack Query, `staleTime: 15m` | All hooks under `src/hooks/api/`          |
| Infinite scroll: cursor-based            | `useSearch`, `useInfiniteDiscover`        |

Rules:

- Detail data (`useTitle`, `usePerson`, `usePlayback`) uses 5m / 10m stale/gc + `retry: 2`.
- `refetchOnWindowFocus: false` because the catalog rarely changes.
- Never call services in `useEffect`; use the corresponding hook.

## Network

`src/lib/api/customAxios.ts`:

- One shared instance per origin.
- 10 s default timeout, configurable via `NEXT_PUBLIC_HTTP_TIMEOUT_MS`.
- Retries handled by React Query, not axios.

## Production Compiler

`next.config.js → compiler.removeConsole` strips `console.*` (except `console.error`) in production builds. Avoid relying on `console.log` for runtime telemetry.

## Caching Headers

Static assets under `/_next/static/*` are cache-immutable by Next defaults. The standalone server emits standard headers; if fronted by a CDN, configure long-cache for `/_next/static/` and `/img/`.

## HLS Playback

`hls.js` is loaded only on the watch page. It is large; do not import from a server component. The player hooks under `src/hooks/video/` keep its lifecycle within the client island.

## Runtime Hot Paths

- `useResponsiveItemCount` recomputes on `resize`; its result is memoized to prevent carousel re-renders.
- Carousels use CSS scroll snapping — no JS animation loops in the hot path.
- Banner autoplay pauses via the `VideoContext` ref-count when any dialog opens, freeing the main thread.

## Common Pitfalls

| Pitfall                                       | Fix                                                             |
| --------------------------------------------- | --------------------------------------------------------------- |
| Import of `axios` from a server component     | Import a service instead; do not bundle axios into RSC payloads |
| `"use client"` on a layout                    | Push it down to the leaf that actually needs interactivity      |
| `useState` mirroring a query result           | Read from the query directly                                    |
| Loading large images without `width`/`height` | Always go through `RemoteImage`                                 |
| Re-implementing pagination                    | Use `useInfiniteQuery` patterns already in `src/hooks/api/`     |

## Measuring

- Local: Lighthouse against `npm run build && npm start`. Use a clean profile.
- CI: not wired. Recommended additions:
  - Lighthouse CI on PRs against the deployed preview.
  - Bundle size budget check (`size-limit`).
