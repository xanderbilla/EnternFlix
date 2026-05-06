# Configuration

All runtime config flows through `src/lib/env/env.ts`. The browser only sees variables prefixed `NEXT_PUBLIC_`. Required variables fail fast on the server and warn in the browser at import time.

## Environment Files

| File             | Used by                          | Committed |
| ---------------- | -------------------------------- | --------- |
| `.env.example`   | Documentation of all variables   | Yes       |
| `.env.local`     | Local dev (Next.js auto-loads)   | No        |
| `.env`           | `docker-compose` builds and runs | No        |
| Platform secrets | Production (Vercel, ECS, etc.)   | n/a       |

Never put secrets behind `NEXT_PUBLIC_`.

## Variables

| Variable                            | Required | Type    | Default                         | Used By                                                   |
| ----------------------------------- | -------- | ------- | ------------------------------- | --------------------------------------------------------- |
| `NODE_ENV`                          | No       | enum    | `development`                   | `config.appEnv`, `isProd`/`isDev`/`isTest` flags          |
| `PORT`                              | No       | number  | `3000`                          | Standalone server bind                                    |
| `HOSTNAME`                          | No       | string  | `0.0.0.0`                       | Standalone server bind (use `0.0.0.0` in containers)      |
| `NEXT_PUBLIC_CUSTOM_API_URL`        | **Yes**  | URL     | —                               | `customAxios.baseURL`, `next.config.js` CSP / image hosts |
| `NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL` | **Yes**  | URL     | —                               | `next/image` remote patterns, `RemoteImage`               |
| `NEXT_PUBLIC_SITE_URL`              | No       | URL     | `https://enternflix.vercel.app` | `siteConfig.url`, metadata canonical, sitemap, robots     |
| `NEXT_PUBLIC_HTTP_TIMEOUT_MS`       | No       | int ms  | `10000`                         | `customAxios.timeout`                                     |
| `NEXT_PUBLIC_ENABLE_LOGGING`        | No       | boolean | `!isProd`                       | `logger.ts` emit guard (errors always emit)               |
| `NEXT_PUBLIC_IMAGE_HOSTS`           | No       | csv     | `[]`                            | `next.config.js` adds extra `next/image` remote patterns  |
| `NEXT_TELEMETRY_DISABLED`           | No       | `0/1`   | unset                           | Disables Next telemetry (Dockerfile sets `1`)             |
| `ANALYZE`                           | No       | boolean | unset                           | `npm run analyze` enables `@next/bundle-analyzer`         |

## Validation Helpers

`src/lib/env/env.ts`:

| Helper                  | Behavior                                                                      |
| ----------------------- | ----------------------------------------------------------------------------- |
| `requireValue(name, v)` | Throws on the server when `v` is empty; logs a warning in the browser.        |
| `withDefault(v, fb)`    | Returns `fb` if `v` is empty.                                                 |
| `parseBool(v, fb)`      | Treats `"true"` / `"1"` as true, anything else as false; falls back if empty. |
| `parseInteger(v, fb)`   | Parses positive integer; returns fallback for invalid values.                 |
| `parseList(v)`          | Splits on `,`, trims, drops empties.                                          |

The exported `config` object groups env values into namespaces (`config.customApi.baseUrl`, `config.http.timeoutMs`, `config.app.siteUrl`, `config.appEnv`).

## Image Hosts

`next.config.js` builds the `images.remotePatterns` array from:

1. `NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL` (host + protocol)
2. `NEXT_PUBLIC_CUSTOM_API_URL` (so backend-served thumbnails work)
3. Each entry in `NEXT_PUBLIC_IMAGE_HOSTS` (bare hostname → `https`, full URL → its protocol)

Adding a new image source means adding it to `NEXT_PUBLIC_IMAGE_HOSTS` and rebuilding (image config is read at build time, not runtime).

## CSP

The Content-Security-Policy header is also derived from these origins. See [SECURITY.md](SECURITY.md).

## Local Setup

```bash
cp .env.example .env.local
# Edit at minimum:
#   NEXT_PUBLIC_CUSTOM_API_URL
#   NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL
npm run dev
```

If a required variable is missing, the server throws on first import of `src/lib/env/env.ts`. The browser logs a warning instead so client renders do not crash on partial misconfiguration during a hot reload.

## Docker

`docker-compose.yml` reads variables from `.env` next to the compose file. `Dockerfile` accepts `NEXT_PUBLIC_*` build args so they are inlined into the build. Re-build after changing any `NEXT_PUBLIC_*` value.

## Reading Config in Code

```ts
import { config, isProd } from "@/lib/env/env";

const url = config.customApi.baseUrl;
if (isProd) {
  /* ... */
}
```

Do not access `process.env` outside `src/lib/env/env.ts` and `next.config.js`.
