# Authentication

## Current Status

Authentication is not fully implemented in the current codebase.

What exists:

- Axios interceptor logs auth-related HTTP errors (401/403).
- Some UI labels reference auth (for example, sign-in links), but no complete flow is wired.

What does not exist yet:

- Login/logout routes and pages
- Token issuance flow
- Token refresh flow
- Route protection middleware
- Session persistence strategy

## Recommended Flow (Target)

1. User submits credentials to backend auth endpoint.
2. Backend sets secure HTTP-only cookies (preferred) or returns short-lived token.
3. Frontend stores only non-sensitive session state locally.
4. Axios request interceptor includes required auth context.
5. Response interceptor handles 401 and attempts refresh when valid.
6. Middleware protects private routes and redirects to login when needed.

## Token Storage Guidance

- Prefer secure HTTP-only cookies for auth/session tokens.
- Avoid localStorage for sensitive long-lived tokens.

## Protected Routes

- Implement in `middleware.ts` once auth routes are introduced.
- Define route groups: public, authenticated, admin.

## Action Items

- Add auth API integration doc updates when endpoints are available.
- Add auth integration tests (login, expired token, refresh, logout).
