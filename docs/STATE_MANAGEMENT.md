# State Management

## What Is Used

- Server state: TanStack Query (`@tanstack/react-query`)
- Global UI state: React Context
- Local UI state: component state + UI hooks

## Global vs Local State

### Global

- `VideoContext`: controls shared video pause/resume behavior
- `TransitionContext`: controls transition flags across page changes

### Server State

- QueryProvider wraps app with shared defaults.
- Query keys are centralized in `src/lib/query/queryKeys.ts`.
- API hooks in `src/hooks/api/*` provide domain-level data access.

### Local

- Interaction behavior in `src/hooks/ui/*` (keyboard handling, scroll behavior, dropdowns, controls visibility).
- Ephemeral UI state remains near the component that owns it.

## Caching Strategy

- Query stale time: 15 minutes
- Query garbage collection time: 1 hour
- Retries configured centrally (see retry policy)
- Window-focus refetch disabled to reduce noisy re-fetching
- Reconnect refetch enabled

## Rules

- Do not duplicate server state in local component state.
- Prefer deriving view state from query responses.
- Keep query keys stable and centralized.
