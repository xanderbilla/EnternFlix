# Security

EnternFlix is a public, read-only frontend with no authentication today. Security work focuses on transport headers, content security policy, input encoding, dependency hygiene, and image source restriction.

## HTTP Headers

`next.config.js → headers()` applies the following on every response:

| Header                         | Value                                                          | Purpose                   |
| ------------------------------ | -------------------------------------------------------------- | ------------------------- |
| `Content-Security-Policy`      | See CSP table below                                            | Restrict resource loading |
| `X-Frame-Options`              | `DENY`                                                         | Prevent clickjacking      |
| `X-Content-Type-Options`       | `nosniff`                                                      | Block MIME sniffing       |
| `Referrer-Policy`              | `strict-origin-when-cross-origin`                              | Limit referer leakage     |
| `X-DNS-Prefetch-Control`       | `on`                                                           | Allow DNS prefetch        |
| `Cross-Origin-Opener-Policy`   | `same-origin`                                                  | Process isolation         |
| `Cross-Origin-Resource-Policy` | `same-origin`                                                  | Resource isolation        |
| `Permissions-Policy`           | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | Disable powerful APIs     |
| `Strict-Transport-Security`    | `max-age=63072000; includeSubDomains; preload` (prod only)     | Enforce HTTPS             |

`X-Powered-By` is stripped via `poweredByHeader: false`.

## Content Security Policy

Built dynamically from env (see `next.config.js → buildContentSecurityPolicy`):

| Directive                   | Value                                                     |
| --------------------------- | --------------------------------------------------------- |
| `default-src`               | `'self'`                                                  |
| `base-uri`                  | `'self'`                                                  |
| `object-src`                | `'none'`                                                  |
| `frame-ancestors`           | `'none'`                                                  |
| `form-action`               | `'self'`                                                  |
| `script-src`                | `'self' 'unsafe-inline'` (+ `'unsafe-eval'` in dev)       |
| `style-src`                 | `'self' 'unsafe-inline'`                                  |
| `img-src`                   | `'self' data: blob: <api-origin> <image-origin> <extras>` |
| `media-src`                 | `'self' blob: <api-origin> <image-origin> <extras>`       |
| `connect-src`               | `'self' <origins>` (+ `ws: wss:` in dev)                  |
| `font-src`                  | `'self' data:`                                            |
| `worker-src`                | `'self' blob:`                                            |
| `manifest-src`              | `'self'`                                                  |
| `upgrade-insecure-requests` | set                                                       |

`'unsafe-inline'` for scripts is required by Next.js App Router until a nonce middleware is added; it is the single largest hardening item left.

## Input Handling and URL Construction

`src/lib/api/request.ts` enforces percent-encoding for every dynamic segment and query value:

- `encPath()` runs `encodeURIComponent` on path segments — blocks `/`, `?`, `#`, spaces.
- `encQuery()` encodes query values and substitutes `%20` → `+`.

Never construct backend URLs by string concatenation; always go through these helpers.

## XSS

- React escapes by default. Do not use `dangerouslySetInnerHTML` except for serialized JSON-LD (already wrapped in helper components in `src/lib/seo/jsonLd.tsx`).
- Backend-supplied strings (titles, descriptions, cast names) render through React text nodes, not HTML.

## Image Sources

`next/image` is configured with an explicit `remotePatterns` allow-list built at build time from:

- `NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL`
- `NEXT_PUBLIC_CUSTOM_API_URL`
- `NEXT_PUBLIC_IMAGE_HOSTS`

Unknown hosts are rejected. Adding a host requires an env change and a rebuild.

`dangerouslyAllowSVG: true` is enabled with a sandboxed CSP (`script-src 'none'; sandbox`) so SVG never executes scripts.

## Server vs Client Data

- Only `NEXT_PUBLIC_*` variables ever reach the browser.
- All other env reads happen in server-only modules (`src/lib/env/env.ts`, `next.config.js`).
- Services are safe to import in both contexts because they do not read non-public env.

## Authentication

Not implemented. `src/lib/api/axiosInterceptors.ts` already classifies 401/403 responses and warns through the logger so an auth layer can plug in cleanly. See [AUTHENTICATION.md](AUTHENTICATION.md).

## Rate Limiting

Not implemented. The browser is rate-limited only by the backend. Browser-side throttling lives in:

- TanStack Query `staleTime` (15m default) — avoids redundant fetches.
- `useNavbarSearch` — debounces search input before navigating.

## Dependencies

- Lockfile committed (`package-lock.json`).
- Run `npm audit` (or `npm audit --omit=dev`) before each release.
- Renovate / Dependabot recommended; not configured in this repo.

## Secrets

- No server secrets are needed for the current functionality.
- If adding any (analytics keys, server-side tokens), put them in **non-public** env and read only in server modules. Never inline a secret behind `NEXT_PUBLIC_`.

## Logging

`src/lib/logger/logger.ts` gates non-error logs behind `NEXT_PUBLIC_ENABLE_LOGGING`. Errors always emit. Avoid logging full request bodies, response payloads with PII, or env values.

## Backlog

| Item                                                 | Notes                                            |
| ---------------------------------------------------- | ------------------------------------------------ |
| Nonce-based CSP (drop `'unsafe-inline'` for scripts) | Requires middleware injecting nonce per response |
| `subresource-integrity` for any third-party scripts  | Currently no third-party scripts                 |
| Add `report-to` / `report-uri` for CSP               | Needs an endpoint to receive reports             |
| Auth + token storage policy                          | See [AUTHENTICATION.md](AUTHENTICATION.md)       |
| Dependency scanning in CI                            | Not yet wired                                    |
