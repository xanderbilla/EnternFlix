# Contributing to EnternFlix

Thanks for taking the time to contribute! These rules keep the codebase consistent and easy to onboard.

## Workflow

1. Branch from `dev`. Use `feat/`, `fix/`, `chore/`, `refactor/` prefixes.
2. Keep PRs small and focused. One concern per PR.
3. Before opening a PR run:

   ```bash
   npm run typecheck && npm run lint && npm run test
   ```

4. Update or add tests for behavior you change.
5. Update docs (README / CONTRIBUTING) when you change conventions.

## Code Style

- TypeScript `strict` — no `any` without an inline `// eslint-disable` + reason.
- Functional components only. Hooks for state and side-effects.
- Server state → **React Query**. UI state → component or context.
- Read env via `@/lib/env/env`. Log via `@/lib/logger/logger`. Never call `process.env.*` or `console.*` directly in app code.
- Query keys come from `@/lib/query/queryKeys` — keep them centralized and typed.
- Components stay small; extract hooks when logic grows.

## Commit Messages

Conventional Commits style:

```text
feat(banner): pause autoplay when dialog is open
fix(api): retry only on 5xx
refactor(hooks): split useMovieScroll
```

## Tests

- Co-locate `*.test.ts(x)` with the source file.
- Cover happy path **and** at least one edge / error case.
- Use Testing Library queries by role/label first, by test-id last.

## Adding a new API endpoint

1. Add the URL builder to `src/lib/api/request.ts`.
2. Add a query key to `src/lib/query/queryKeys.ts`.
3. Create a hook in `src/hooks/api/` that returns the React Query result.
4. Consume the hook from your component — never call axios directly inside a component.

## Adding a new env var

1. Add it to `.env.example` with a description.
2. Add a typed accessor to `src/lib/env/env.ts`.
3. Document it in the README env table.
