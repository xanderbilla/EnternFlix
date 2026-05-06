# State Management

EnternFlix has three distinct state categories. Mixing them is the most common source of bugs.

| Category    | Where it lives                                            | Tool                                                      |
| ----------- | --------------------------------------------------------- | --------------------------------------------------------- |
| Server data | Anything fetched from the backend                         | TanStack Query (`@tanstack/react-query`)                  |
| App-wide UI | Cross-component UI flags (banner pause, page transitions) | React Context (`src/contexts/`)                           |
| Local UI    | Component-only state, refs, derived values                | `useState`, `useReducer`, custom hooks in `src/hooks/ui/` |

## Server State (TanStack Query)

`src/lib/query/QueryProvider.tsx` configures one `QueryClient` for the whole app:

```ts
{
  queries: {
    staleTime: 15 * 60 * 1000,   // 15 minutes
    gcTime:    60 * 60 * 1000,   // 1 hour
    refetchOnWindowFocus: false,
    refetchOnReconnect:   true,
    retry: retryPolicy,          // src/lib/query/retryPolicy.ts
  }
}
```

Single-resource hooks (`useTitle`, `usePerson`, `usePersonMovies`, `usePlayback`) override to `staleTime: 5m`, `gcTime: 10m`, `retry: 2`.

### Query Keys

Defined inline per hook today; if/when the count grows, centralize in `src/lib/query/queryKeys.ts`. Keep keys serializable:

```ts
["title", id][("person", id)][("search", query, scope, sort)][
  ("discoverInfinite", type, content, sort)
];
```

### Hook Pattern

```ts
export function useTitle(id: string, enabled = true) {
  return useQuery({
    queryKey: ["title", id],
    queryFn: () => fetchTitleData(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}
```

Rules:

- `enabled` must guard on every required input (`!!id`).
- The `queryFn` must return the response body, not a wrapper.
- Never throw inside `queryFn` for "no data" — return `null` and let the component handle the empty state.

### Infinite Queries

Used by `useSearch` and `useInfiniteDiscover`. `getNextPageParam` reads `cursor` / `hasMore` from `PaginatedResponse<T>`.

### Invalidation

There are no mutations today. When mutations are added, prefer:

```ts
queryClient.invalidateQueries({ queryKey: ["title", id] });
```

Avoid `setQueryData` unless you are certain about the cache shape.

## App-Wide UI State (Contexts)

| Provider             | File                                 | Owns                                                      |
| -------------------- | ------------------------------------ | --------------------------------------------------------- |
| `QueryProvider`      | `src/lib/query/QueryProvider.tsx`    | Single `QueryClient` instance                             |
| `VideoProvider`      | `src/contexts/VideoContext.tsx`      | Banner pause ref-count, `pauseBanner()`, `resumeBanner()` |
| `TransitionProvider` | `src/contexts/TransitionContext.tsx` | `navigateWithTransition(url, onBefore?)` for fade routing |

Order in `src/app/layout.tsx`:

```
<QueryProvider>
  <VideoProvider>
    <TransitionProvider>
      {children}
    </TransitionProvider>
  </VideoProvider>
</QueryProvider>
```

Add a new global concern only when more than one unrelated component needs it. Otherwise prefer a hook.

### `VideoContext` semantics

`pauseCount` is a ref-count, not a boolean. Every dialog that opens calls `pauseBanner()`; `resumeBanner()` decrements. The banner only resumes when the count returns to zero. This avoids races between overlapping modals.

### `TransitionContext` semantics

`navigateWithTransition` triggers a 500 ms fade-out, runs the optional `onBeforeTransition` callback, then `router.push`. Use it for in-app navigation; do not use it for external links.

## Local UI State

Hooks under `src/hooks/ui/` encapsulate page-local concerns:

| Hook                     | Purpose                                         |
| ------------------------ | ----------------------------------------------- |
| `useDialogManager`       | Open/close coordination across multiple dialogs |
| `useDropdown`            | Outside-click + focus management for dropdowns  |
| `useNavbar`              | Navbar scroll state                             |
| `useNavbarSearch`        | Debounced search → URL push (`/search?q=...`)   |
| `useTabScroll`           | Active-tab scroll into view                     |
| `useResponsiveItemCount` | Compute carousel page size from container width |
| `useReadMore`            | Truncate-with-toggle text                       |

Rules:

- A hook owns one concern. If it returns more than ~6 fields, split it.
- Avoid storing server data in component state — use a query hook.
- Refs (`useRef`) are preferred over state when the value does not affect rendering.

## URL as State

For pages where the user can share or bookmark a view, the URL is the source of truth:

- `/search?q=...` — query string drives `useSearch`.
- `/watch?id=...&type=...` — drives `usePlayback` and `useTitle`.
- `/browse/genre/[id]` — path param drives `useDiscoverByAttribute`.

Components read these via `useSearchParams` / route props and pass them into hooks. Do not duplicate URL state in `useState`.

## Forms

There are no forms beyond the navbar search input. If forms are added, prefer `react-hook-form` over context-based field state, and keep validation rules in `src/utils/validationHelpers.ts`.

## Persistence

Nothing is persisted to `localStorage` today. If user preferences are added (e.g. autoplay), persist via a thin wrapper hook so the storage layer can be swapped.
