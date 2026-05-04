# API Integration

## Base URLs

Configured through env and centralized config module:

- TMDB base URL: `NEXT_PUBLIC_TMDB_BASE_URL` (default `https://api.themoviedb.org/3`)
- Custom backend base URL: `NEXT_PUBLIC_CUSTOM_API_URL`

## HTTP Clients

- `src/lib/api/axios.ts`: TMDB axios instance
- `src/lib/api/customAxios.ts`: custom backend axios instance
- Shared timeout: `NEXT_PUBLIC_HTTP_TIMEOUT_MS` (default `10000`)

## Request Builders

- `src/lib/api/request.ts` builds endpoint paths/query strings.
- Path and query values are encoded to prevent malformed URLs.

## Interceptors

Defined in `src/lib/api/axiosInterceptors.ts`.

- Request interceptor: logs request-level failures.
- Response interceptor:
  - 5xx: error logging
  - 401/403: auth warning logs
  - 429: rate-limit warning logs

## Auth Headers

- No token injection interceptor is currently implemented.
- If auth is introduced, add header injection in request interceptor and document token source.

## Error Handling Strategy

- API exceptions are surfaced to React Query and handled in hooks/components.
- User-facing normalization utilities live in `src/utils/errorHelpers.ts`.

## Retry Logic

- Retries are handled by React Query, not Axios.
- Policy in `src/lib/query/retryPolicy.ts`:
  - no retries for 4xx
  - max 2 retries for network/5xx
  - exponential backoff (capped)

## Timeout Handling

- Axios timeout is global and env-driven.
- Timeout failures flow through query error state and should be surfaced through UI fallback patterns.
