# EnternFlix

A Netflix-inspired streaming front-end built with **Next.js 16 (App Router)**, **React 19**, **TanStack Query**, **TypeScript** and **Tailwind CSS**.

> Stream movies, TV shows and anime — discover trending titles, search across catalogs, and play content with HLS.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Quick Start](#quick-start)
3. [Environment Variables](#environment-variables)
4. [Available Scripts](#available-scripts)
5. [Project Architecture](#project-architecture)
6. [API Layer & React Query](#api-layer--react-query)
7. [Error Handling & Logging](#error-handling--logging)
8. [Testing](#testing)
9. [Code Quality](#code-quality)
10. [Deployment](#deployment)
11. [Contributing](#contributing)

---

## Tech Stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | Next.js 16 (App Router, RSC)            |
| UI             | React 19, Tailwind CSS, lucide-react    |
| Data fetching  | TanStack Query v5 + Axios               |
| Video          | hls.js                                  |
| Notifications  | react-hot-toast                         |
| Type system    | TypeScript 5 (strict)                   |
| Testing        | Vitest + Testing Library + fast-check   |
| Tooling        | ESLint (next/core-web-vitals), Prettier |
| Bundle insight | `@next/bundle-analyzer`                 |

---

## Quick Start

Requirements: **Node.js >= 20**, **npm >= 10** (or pnpm/yarn).

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env.local
# then edit .env.local

# 3. Run dev server
npm run dev
```

App is served on http://localhost:3000.

---

## Environment Variables

All env vars are read through a single typed module: `src/config/env.ts`.
Required keys are validated at module load — missing values fail fast.

| Variable                            | Required | Default                        | Description                                                  |
| ----------------------------------- | :------: | ------------------------------ | ------------------------------------------------------------ |
| `NODE_ENV`                          |          | `development`                  | `development` \| `test` \| `production`.                     |
| `PORT`                              |          | `3000`                         | Port for `next start` / Docker container.                    |
| `HOSTNAME`                          |          | `0.0.0.0`                      | Bind address for `next start` (use `0.0.0.0` in containers). |
| `NEXT_PUBLIC_TMDB_API_KEY`          |    Y     | —                              | TMDB v3 API key.                                             |
| `NEXT_PUBLIC_TMDB_BASE_URL`         |          | `https://api.themoviedb.org/3` | Override only if proxying TMDB.                              |
| `NEXT_PUBLIC_CUSTOM_API_URL`        |    Y     | —                              | Base URL of your backend (e.g. `http://localhost:8080/v1`).  |
| `NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL` |    Y     | —                              | CDN/S3 base URL for non-TMDB images. Must end with `/`.      |
| `NEXT_PUBLIC_IMAGE_HOSTS`           |          | _(empty)_                      | Comma-separated extra hostnames allowed by `next/image`.     |
| `NEXT_PUBLIC_ENABLE_LOGGING`        |          | `true` (non-prod) / `false`    | Toggles client debug/info/warn logs. Errors always emitted.  |
| `NEXT_PUBLIC_HTTP_TIMEOUT_MS`       |          | `10000`                        | Per-request axios timeout in ms.                             |

> Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets behind that prefix. Required vars are validated at module load (`src/config/env.ts`) — missing values fail fast.

---

## Available Scripts

| Script                  | Purpose                                 |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Start Next.js in development            |
| `npm run build`         | Production build                        |
| `npm run start`         | Run the production build                |
| `npm run lint`          | ESLint check                            |
| `npm run lint:fix`      | ESLint auto-fix                         |
| `npm run typecheck`     | `tsc --noEmit` strict type check        |
| `npm run format`        | Prettier write                          |
| `npm run format:check`  | Prettier check (CI-friendly)            |
| `npm run test`          | Run test suite once                     |
| `npm run test:watch`    | Watch-mode tests                        |
| `npm run test:coverage` | Coverage report (v8, lcov + html)       |
| `npm run analyze`       | Build with bundle analyzer              |
| `npm run docker:build`  | Build Docker image `enternflix:latest`  |
| `npm run docker:run`    | Run image with `--env-file .env.local`  |
| `npm run docker:up`     | `docker compose up --build -d`          |
| `npm run docker:down`   | `docker compose down`                   |
| `npm run docker:logs`   | Tail compose logs for the `web` service |

Recommended pre-commit / CI sequence:

```bash
npm run typecheck && npm run lint && npm run test
```

---

## Project Architecture

```
src/
├── app/              # Next.js App Router pages, layouts, error/not-found
├── components/       # UI components, grouped by feature
├── constants/        # Pure constants (caches, icon maps, navbar, ui, video, ...)
├── contexts/         # React contexts (Video, Transition)
├── hooks/            # Custom hooks
│   ├── api/          #   server-state hooks (React Query)
│   └── ui/           #   ui-state hooks
├── lib/              # Cross-cutting infrastructure (single source per concern)
│   ├── api/          #   Axios instances + interceptors + request URL builders
│   ├── env/          #   env.ts — typed runtime configuration
│   ├── logger/       #   logger.ts — sole logging boundary
│   └── query/        #   QueryProvider + queryKeys (React Query layer)
├── types/            # Shared type definitions
└── utils/            # Pure helpers (cn, validation, error helpers, video, ...)
```

### Conventions

- **Components** are functional, colocated by feature. Avoid prop drilling more than two levels — prefer a context, a custom hook, or composition.
- **Server state lives in React Query**, never in `useState`/`useEffect`. UI state lives in components or small contexts.
- **All `process.env` reads** must go through `src/lib/env/env.ts`.
- **All ad-hoc logging** must go through `src/lib/logger/logger.ts` — no raw `console.*` calls in app code.
- **Query keys** are centralized in `src/lib/query/queryKeys.ts`.
- **HTTP clients** live only in `src/lib/api/`. Never instantiate Axios elsewhere.
- **No business logic in components.** Move it into a hook or a util.

---

## API Layer & React Query

Two Axios instances are pre-configured:

- `src/lib/api/axios.ts` — TMDB
- `src/lib/api/customAxios.ts` — internal backend

Interceptors handle logging only. **Retries are owned by React Query** (see `QueryProvider`) so you get a single, observable retry policy:

- 4xx responses are **never** retried.
- Other failures are retried up to 2x with exponential back-off.
- Window-focus refetch is off; reconnect refetch is on.
- DevTools are mounted only outside production.

A typical hook:

```ts
export const useBanner = (type = "all") =>
  useQuery({
    queryKey: queryKeys.banner(type),
    queryFn: () =>
      customAxios.get(requests.fetchBanner(type)).then((r) => r.data.data),
  });
```

---

## Error Handling & Logging

- App-level boundary: `src/app/error.tsx` (Next.js convention).
- Component-level boundary: `src/components/UI/ErrorBoundary.tsx`.
- Helpers: `src/utils/errorHelpers.ts` — `formatErrorMessage`, `getUserFriendlyErrorMessage`, `handleApiError`, `isNetworkError`.
- Logger: `src/lib/logger/logger.ts`. Replace its body to plug in Sentry/Datadog later.

---

## Testing

- Runner: **Vitest** with **jsdom** environment.
- Component / hook helpers: **@testing-library/react**.
- Property-based: **fast-check**.

Layout convention: tests sit next to source as `*.test.ts(x)`.

```bash
npm run test               # one-shot
npm run test:watch         # TDD loop
npm run test:coverage      # coverage report under ./coverage
```

What to cover (in order of priority):

1. Pure utilities (`src/utils/*`)
2. API & query layer (`src/lib/api/*`, `src/lib/query/*`) — URL builders, Axios interceptors, retry policy
3. Hooks (`src/hooks/*`) — wrap with `QueryClientProvider` for API hooks
4. Components — happy + error + loading + empty states
5. Critical flows (Banner, Watch, Search) — consider Playwright if you add E2E

---

## Code Quality

- ESLint config: `eslint.config.mjs` (flat config, `next/core-web-vitals`)
- Prettier config: `.prettierrc.json`
- TypeScript: `strict: true`, target `ES2022`
- Path alias: `@/* -> src/*`

Avoid:

- `any` (use `unknown` and narrow)
- raw `console.*` (use `logger`)
- inline `process.env` reads (use `config`)
- placing API calls in components

---

## Deployment

Production build is `output: "standalone"` (see `next.config.js`), suitable for Docker / containerized hosting. For Vercel, deploy as a normal Next.js project.

Required env vars must be set on the host before `next build`.

### Docker

```bash
# 1. Configure env (compose reads .env)
cp .env.example .env

# 2. Build & run via compose (recommended)
npm run docker:up
npm run docker:logs        # tail logs
npm run docker:down

# Or build & run the image directly
npm run docker:build
npm run docker:run         # uses --env-file .env.local
```

The image is a multi-stage Alpine build that ships only the Next.js
**standalone** server output. It runs as a non-root user (`nextjs:1001`),
exposes port `3000`, and ships with a `wget` healthcheck against `/`.

`NEXT_PUBLIC_*` variables are baked in **at build time** — pass them as
`--build-arg` (or via `args:` in compose) so they are inlined into the client
bundle. Server-only secrets should be passed at runtime via `--env-file` /
compose `env_file`.

### Production checklist

- [ ] `NEXT_PUBLIC_TMDB_API_KEY` set as a build-time secret.
- [ ] `NEXT_PUBLIC_CUSTOM_API_URL` points at production backend (HTTPS).
- [ ] `NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL` resolves to a CDN host.
- [ ] `NEXT_PUBLIC_IMAGE_HOSTS` lists every additional CDN you load images from.
- [ ] `NODE_ENV=production`, `NEXT_PUBLIC_ENABLE_LOGGING=false`.
- [ ] `npm run typecheck && npm run lint && npm run test && npm run build` green.

---

## Contributing

See `CONTRIBUTING.md`.

---

## Author

[Vikas Singh](https://xanderbilla.com)
