# Deployment

## Build and Start

```bash
npm run build
npm run start
```

Next config uses `output: "standalone"` for production packaging.

## Docker Deployment

```bash
npm run docker:build
npm run docker:run
```

Compose flow:

```bash
npm run docker:up
npm run docker:logs
npm run docker:down
```

## Runtime Notes

- Docker image is multi-stage and runs as non-root user.
- Health checks probe `/` on port 3000.
- `NEXT_PUBLIC_*` variables are inlined at build time.

## Hosting Targets

- Vercel: native Next.js deployment path
- Container platforms: Docker image with standalone output

## CI/CD Recommendations

1. Install dependencies
2. Run `typecheck`, `lint`, `test`
3. Build app
4. Build and publish image (if containerized)
5. Deploy
6. Smoke test health endpoint

## Rollback Steps

1. Identify last known good deployment artifact/image.
2. Redeploy previous artifact.
3. Validate app health and critical routes.
4. Capture incident details and root cause before re-promote.
