# Deployment

EnternFlix builds to a Next.js standalone bundle and runs as a single Node process. No platform-specific config; ships anywhere that runs Node 20.

## Build Output

`next.config.js` sets `output: "standalone"`. After `npm run build`:

```
.next/
├── standalone/
│   ├── server.js          self-contained server entry
│   ├── node_modules/      pruned to runtime deps
│   └── .next/             server payload
└── static/                must be copied to standalone/.next/static
```

Public assets in `public/` must be copied to `standalone/public/` for the standalone server to serve them.

## Local Production Run

```bash
npm ci
npm run build
cp -r public  .next/standalone/
cp -r .next/static .next/standalone/.next/
node .next/standalone/server.js
```

Open `http://localhost:3000`.

## Required Environment

| Variable                            | Notes                                                |
| ----------------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_CUSTOM_API_URL`        | Required at build time (inlined into bundle)         |
| `NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL` | Required at build time                               |
| `NEXT_PUBLIC_SITE_URL`              | Set per environment (used for canonical/sitemap)     |
| `NEXT_PUBLIC_IMAGE_HOSTS`           | If non-default image origins are used                |
| `PORT`, `HOSTNAME`                  | Optional runtime overrides (`0.0.0.0` in containers) |
| `NEXT_TELEMETRY_DISABLED=1`         | Recommended in CI/containers                         |

`NEXT_PUBLIC_*` values are baked into the client bundle. **Rebuild after any change.**

## Docker

Multi-stage `Dockerfile` (Node 20 Alpine):

| Stage    | Purpose                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------- |
| `deps`   | `npm ci`                                                                                             |
| `build`  | Receives `NEXT_PUBLIC_*` build args, runs `npm run build`                                            |
| `runner` | Copies `standalone/`, `static/`, `public/`; non-root user; `EXPOSE 3000`; `CMD ["node","server.js"]` |

### Build

```bash
docker build \
  --build-arg NEXT_PUBLIC_CUSTOM_API_URL=https://api.example.com \
  --build-arg NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL=https://img.example.com \
  -t enternflix:latest .
```

### Run

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://enternflix.example.com \
  enternflix:latest
```

### docker-compose

```bash
cp .env.example .env
# Edit .env with your URLs
docker compose up --build
```

`docker-compose.yml` exposes port 3000, mounts no volumes, and uses an internal healthcheck against the running server.

## CI/CD

Not committed. Recommended pipeline:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm test`
5. `npm run build`
6. Build container, push to registry.
7. Deploy.

Cache `~/.npm` and `.next/cache` between builds for faster rebuilds.

## Health Checks

There is no dedicated health endpoint. For platform health checks, use `GET /` and expect a 308 to `/browse`. If a deeper check is required, add a route handler at `src/app/api/health/route.ts` that returns `{ ok: true }`.

## Reverse Proxy / CDN

- Forward original `Host` and `X-Forwarded-*` headers so canonical URLs and HSTS work correctly.
- Cache `/_next/static/*` and `/img/*` aggressively (immutable for hashed assets).
- Do not cache HTML responses unless you understand which routes are dynamic (everything is dynamic by default in this app).

## Troubleshooting

| Symptom                                 | Likely cause                                                             | Fix                                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Build fails with "missing required env" | `NEXT_PUBLIC_CUSTOM_*_URL` not provided at build time                    | Pass via `--build-arg` (Docker) or shell env (local CI)                                      |
| Blank page in browser                   | API origin not allowed by CSP                                            | Verify `NEXT_PUBLIC_CUSTOM_API_URL` matches actual API; check browser console for CSP errors |
| Images return 400 from `/_next/image`   | Image host not in `remotePatterns`                                       | Add hostname to `NEXT_PUBLIC_IMAGE_HOSTS` and rebuild                                        |
| All API calls fail with CORS in browser | Backend missing CORS for the new origin                                  | Configure backend; this app cannot bypass CORS                                               |
| Hydration mismatch errors               | Server render used a different value than the client (e.g. `Date.now()`) | Move dynamic value into a client component or pass it through props                          |
| `404` for static assets in standalone   | Forgot to copy `public/` and `.next/static/` into `standalone/`          | See "Local Production Run" steps                                                             |
| Stale data after backend deploy         | TanStack Query cache; user has not reloaded                              | Hard reload, or invalidate via a release version param if needed                             |
| Player never starts                     | Missing HLS playback URL in `usePlayback` response                       | Inspect network tab; confirm backend `c/play/{type}/{id}` returns a usable URL               |
| 401/403 on every request                | Backend now requires auth, app does not implement it                     | See [AUTHENTICATION.md](AUTHENTICATION.md)                                                   |

## Rollback

The container image is the unit of deploy. To roll back, redeploy the previous image tag. Application state is fully derived from the backend; there is nothing to migrate.
