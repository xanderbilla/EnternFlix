# Runbook

## 1) API Not Responding

Symptoms:

- Empty movie lists, loading states never resolve, or generic error messages

Checks:

1. Verify env values in `.env.local`/deployment settings.
2. Confirm `NEXT_PUBLIC_CUSTOM_API_URL` and `NEXT_PUBLIC_TMDB_API_KEY` are valid.
3. Inspect browser network tab and API status codes.
4. Check interceptor logs and backend health.

Actions:

- Fix incorrect base URLs/keys.
- Restart app after env changes.
- Coordinate with backend if upstream outage persists.

## 2) UI Not Loading

Symptoms:

- Blank screen or hydration mismatch behavior

Checks:

1. Open browser console for runtime errors.
2. Validate `npm run dev` / `npm run build` logs.
3. Check dynamic import failures and route-level errors.

Actions:

- Resolve first thrown runtime error.
- Verify route components and provider tree in root layout.

## 3) Build Failure

Checks:

1. Run `npm run typecheck`.
2. Run `npm run lint`.
3. Run `npm run test`.
4. Run `npm run build` again after fixing first root issue.

## 4) Env Misconfiguration

Symptoms:

- Missing API data, invalid image hosts, startup errors

Checks:

1. Compare `.env.local` against `.env.example`.
2. Ensure required vars are present.
3. Verify build-time vs runtime env scope for `NEXT_PUBLIC_*`.

## 5) SSR/CSR Behavior Issues

Symptoms:

- Unexpected client-only render delays or hydration warnings

Checks:

1. Review components loaded via `next/dynamic` with `ssr: false`.
2. Confirm browser-only APIs are guarded.
3. Check route-level Suspense fallbacks.

## 6) Hydration Errors

Checks:

1. Confirm deterministic rendering output.
2. Remove non-deterministic values from initial render (timestamps/randoms).
3. Ensure env-dependent values are stable between server/client.

## Escalation

If issue remains unresolved after standard checks:

1. Capture reproduction steps.
2. Collect console/network/build logs.
3. Open incident ticket with impact, scope, and timeline.
