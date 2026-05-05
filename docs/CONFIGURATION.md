# Configuration

## Environment Variables

All runtime env reads are centralized in `src/lib/env/env.ts`.

Required keys:

- `NEXT_PUBLIC_TMDB_API_KEY`
- `NEXT_PUBLIC_CUSTOM_API_URL`
- `NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL`

Optional/common keys:

- `NODE_ENV` (`development|test|production`)
- `PORT` (default 3000)
- `HOSTNAME` (default `0.0.0.0`)
- `NEXT_PUBLIC_TMDB_BASE_URL` (default TMDB API URL)
- `NEXT_PUBLIC_ENABLE_LOGGING`
- `NEXT_PUBLIC_HTTP_TIMEOUT_MS` (default 10000)
- `NEXT_PUBLIC_IMAGE_HOSTS` (comma-separated extra hosts)

## NEXT_PUBLIC Rules

- Only `NEXT_PUBLIC_*` variables are exposed to browser bundles.
- Never put secrets in `NEXT_PUBLIC_*` variables.

## Environment Files

- Local dev: `.env.local`
- Docker Compose: `.env`
- CI/CD/hosting: platform secret manager variables

## Environment Differences

### Development

- Logging enabled by default
- Local backend/API URL likely points to localhost

### Staging

- Mirror production values with lower-risk data endpoints
- Enable observability and smoke checks

### Production

- Logging minimized
- HTTPS backend endpoints only
- Strict image host allowlist maintained

## Config Validation Behavior

- Server: missing required values fail fast.
- Browser: missing values warn to console (prevents app shell hard crash).
