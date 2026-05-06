# Folder Structure

The full layout under `src/` and the rules for where new code goes.

## Top-Level

```
.
├── docs/                  this documentation
├── public/                static assets served at /
├── scripts/               one-off node scripts (a11y checklist)
├── src/                   application code
├── Dockerfile             multi-stage container build
├── docker-compose.yml     local container orchestration
├── next.config.js         security headers, image hosts, redirects
├── tailwind.config.js     theme tokens
├── tsconfig.json          paths: @/* → ./src/*
├── vitest.config.ts       test runner config
└── vitest.setup.ts        global test setup (matchers, env)
```

## `src/`

```
src/
├── app/                   App Router (routes, layouts, metadata)
├── components/            feature components grouped by surface
├── config/                site-wide config (brand, SEO defaults)
├── constants/             constants, enums, icon maps
├── contexts/              React context providers
├── hooks/                 hooks split by concern
│   ├── api/               TanStack Query hooks
│   ├── ui/                local UI/state hooks
│   └── video/             playback-related hooks
├── lib/                   infrastructure
│   ├── api/               axios instance, interceptors, request builders
│   ├── env/               validated runtime config
│   ├── logger/            log emitter
│   ├── query/             QueryProvider, query key factory, retry policy
│   └── seo/               metadata + JSON-LD helpers
├── services/              backend-call wrappers (server-callable)
├── types/                 shared TypeScript types
└── utils/                 pure helpers
```

## `src/app/`

```
app/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
├── not-found.tsx
├── NotFoundContent.tsx    used by error.tsx and not-found.tsx
├── globals.css
├── robots.ts
├── sitemap.ts
└── (pages)/
    ├── browse/
    │   ├── page.tsx
    │   ├── recent/page.tsx
    │   ├── latest/page.tsx
    │   ├── popular/page.tsx
    │   ├── trending/page.tsx
    │   ├── movies/page.tsx
    │   ├── tv-shows/page.tsx
    │   └── genre/[id]/page.tsx
    ├── search/page.tsx
    └── watch/page.tsx
```

## `src/components/`

| Folder                  | Purpose                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| `Banner/`               | Hero banner with autoplay video                                                                   |
| `BrowseCollectionPage/` | Browse collection layout                                                                          |
| `Button/`               | Button primitives and `ActionButton`, `IconButton`                                                |
| `Dialogs/`              | `BaseDialog` consumers (Cast, Explore, Info, Discover)                                            |
| `Footer/`               | Footer                                                                                            |
| `GenrePage/`            | Genre filter page composition                                                                     |
| `Home/`                 | Home page composition (banner + carousels)                                                        |
| `Icon/`                 | Icon wrappers                                                                                     |
| `Layout/`               | Navbar + content + footer wrapper                                                                 |
| `MovieCard/`            | Poster card with hover overlay                                                                    |
| `MovieList/`            | Horizontal carousel of movie cards                                                                |
| `MoviesPage/`           | Movies browse page                                                                                |
| `Navbar/`               | Top navigation, search, menu                                                                      |
| `NotFound/`             | 404 visuals                                                                                       |
| `SearchPage/`           | Search results UI                                                                                 |
| `TitlePage/`            | Title detail page                                                                                 |
| `Toggle/`               | Toggle switch                                                                                     |
| `UI/`                   | Shared primitives: `RemoteImage`, `BaseDialog`, `ErrorBoundary`, `SortDropdown`, `CircularButton` |
| `WatchPage/`            | Player surface                                                                                    |

## `src/hooks/`

| Subfolder | Hooks                                                                                       |
| --------- | ------------------------------------------------------------------------------------------- |
| `api/`    | `useMovies`, `usePerson`, `useTitle`, `usePlayback`, etc. (TanStack Query)                  |
| `ui/`     | `useDialogManager`, `useDropdown`, `useNavbar`, `useNavbarSearch`, `useTabScroll`, others   |
| `video/`  | `useHLSPlayer`, `useVideoControls`, `useKeyboardShortcuts`, `useFullscreen`, `useSubtitles` |

## `src/lib/`

| Subfolder | Files                                                  |
| --------- | ------------------------------------------------------ |
| `api/`    | `customAxios.ts`, `axiosInterceptors.ts`, `request.ts` |
| `env/`    | `env.ts` (validated config + helpers)                  |
| `logger/` | `logger.ts`                                            |
| `query/`  | `QueryProvider.tsx`, `queryKeys.ts`, `retryPolicy.ts`  |
| `seo/`    | `metadata.ts`, `jsonLd.tsx`                            |

## `src/services/`

```
services/
└── content/
    ├── exploreContent.ts    discover/explore navigation + fresh fetches
    └── titleContent.ts      single-title fetch (server + client safe)
```

## `src/types/`

| File            | Contains                                            |
| --------------- | --------------------------------------------------- |
| `api.ts`        | `ApiResponse`, `PaginatedResponse`, error envelopes |
| `common.ts`     | Shared utility types                                |
| `components.ts` | Component prop types                                |
| `movie.ts`      | `Movie`, `Person`, `Genre`, `Cast`, search types    |
| `navbar.ts`     | Navbar-specific shapes                              |
| `playback.ts`   | Playback response, subtitles, qualities             |
| `title.ts`      | Title page props                                    |
| `validation.ts` | Validation result + error types                     |
| `video.ts`      | Video player state, subtitle cue                    |

## Placement Rules

- **Route**: add a folder under `src/app/(pages)/`. Add `page.tsx`, optional `loading.tsx`, optional `error.tsx`. Export `metadata` or `generateMetadata`.
- **Reusable component**: pick the closest existing feature folder under `src/components/` or create a new one. Cross-cutting primitives go in `src/components/UI/`.
- **Data fetch**: add a function to `src/services/` and a TanStack Query hook in `src/hooks/api/`. Components never import services directly.
- **Constant**: `src/constants/` only for app-wide values. Local constants stay in the file that uses them.
- **Type**: shared types go in `src/types/`. Component-only props live with the component.
- **Util**: pure helpers go in `src/utils/`. Anything touching `process.env` belongs in `src/lib/env/`.
- **Hook**: `api/` for server data, `ui/` for local UI state, `video/` for playback.
- **Test**: colocated with the file (`foo.ts` + `foo.test.ts`).

## What Does Not Belong in `src/`

- Build output (`.next/`, `coverage/`, `tmp/`).
- Backend code (lives in [bi8s-go](https://github.com/xanderbilla/bi8s-go)).
- Generated assets — commit only originals to `public/`.
