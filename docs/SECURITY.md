# Security

## Current Security Controls

- Security headers in `next.config.js`:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` for camera/microphone/geolocation
- Image policy includes CSP sandbox for SVG handling in Next image config.
- URL/path/query encoding in API request builders.

## XSS Protection

- React escaping and controlled rendering are primary protections.
- Keep avoiding dangerous HTML injection patterns.
- Add explicit sanitization if rich HTML content is introduced.

## CSRF

- No full auth/session flow currently, so CSRF posture is incomplete.
- If cookie-based auth is introduced, add CSRF token strategy and same-site cookie policy.

## Secure Cookies

- Not currently applicable because auth cookie flow is not implemented.
- Future recommendation: `HttpOnly`, `Secure`, `SameSite=Lax/Strict`.

## Input Validation

- URL construction is encoded.
- Add explicit frontend schema validation for any user-submitted forms as they are introduced.

## Rate Limiting (Frontend Perspective)

- 429 responses are detected and logged.
- UI should provide friendly retry feedback for rate-limited states.

## Security Backlog

- Implement auth/session architecture.
- Add middleware route protection.
- Add incident logging/monitoring integration (Sentry/Datadog/etc).
