# Testing

Vitest + Testing Library + jsdom. 200+ tests across utilities, services, hooks, and components. Property-based tests via `fast-check` where input space is large.

## Stack

| Tool                          | Purpose                              |
| ----------------------------- | ------------------------------------ |
| `vitest`                      | Test runner                          |
| `@testing-library/react`      | Component rendering                  |
| `@testing-library/user-event` | Realistic user interactions          |
| `@testing-library/jest-dom`   | DOM matchers                         |
| `jsdom`                       | Browser environment                  |
| `fast-check`                  | Property-based testing for utilities |
| `@vitest/coverage-v8`         | Coverage reports                     |

## Configuration

`vitest.config.ts`:

- Environment: `jsdom`
- Setup file: `vitest.setup.ts` (extends matchers, sets default test env)
- Path alias `@/*` → `src/*`
- Coverage provider: `v8`, output to `coverage/`

## Commands

| Command                     | Purpose                                          |
| --------------------------- | ------------------------------------------------ |
| `npm test`                  | Run the full suite once                          |
| `npm run test:watch`        | Watch mode                                       |
| `npm run test:coverage`     | Run with v8 coverage; HTML report in `coverage/` |
| `npm run test -- file.test` | Run a single file                                |
| `npm run test -- -t "name"` | Run tests matching name                          |

CI should run `npm run lint && npm run typecheck && npm test`.

## What to Test

| Layer             | Test focus                                                                  |
| ----------------- | --------------------------------------------------------------------------- |
| `src/utils/`      | Pure functions; aim for 100% branch coverage. Use `fast-check` where useful |
| `src/lib/`        | env validators, query key factory, retry policy, SEO builders               |
| `src/services/`   | Mock axios, assert URL + params + response shape                            |
| `src/hooks/api/`  | Mock services, assert query state transitions and `enabled` guards          |
| `src/hooks/ui/`   | State machine behavior, debounce, outside-click                             |
| `src/components/` | User-visible behavior with Testing Library; avoid testing markup details    |

## What Not to Test

- Snapshot of large component trees — too brittle.
- Internal component state directly — assert observable output instead.
- Next.js framework internals (router, image optimizer).
- Third-party libraries (`hls.js` internals, axios internals).

## Patterns

### Service Test

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import customAxios from "@/lib/api/customAxios";
import { fetchTitleData } from "@/services/content/titleContent";

vi.mock("@/lib/api/customAxios", () => ({
  default: { get: vi.fn() },
}));

describe("fetchTitleData", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls c/content/{id}", async () => {
    (customAxios.get as any).mockResolvedValue({
      data: {
        success: true,
        data: {
          /* … */
        },
      },
    });
    await fetchTitleData("abc");
    expect(customAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("c/content/abc"),
    );
  });
});
```

### Hook Test (with QueryClient)

```ts
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function withClient() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

it("loads a title", async () => {
  const { result } = renderHook(() => useTitle("abc"), { wrapper: withClient() });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
```

### Component Test

```ts
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("opens the info dialog", async () => {
  render(<MovieCard movie={mockMovie} />);
  await userEvent.click(screen.getByRole("button", { name: /more info/i }));
  expect(screen.getByRole("dialog")).toBeVisible();
});
```

### Property-Based Test

```ts
import fc from "fast-check";

it("encPath is reversible", () => {
  fc.assert(
    fc.property(fc.string(), (s) => decodeURIComponent(encPath(s)) === s),
  );
});
```

## Mocks and Setup

- `vitest.setup.ts` registers `@testing-library/jest-dom` matchers and stubs browser APIs that jsdom does not implement (`IntersectionObserver`, `matchMedia`).
- Avoid global mocks — prefer per-file `vi.mock`. Reset with `vi.clearAllMocks()` in `beforeEach`.
- Never mock the module under test.

## Test File Conventions

- Colocated: `foo.ts` + `foo.test.ts` (or `foo.test.tsx` for components).
- One `describe` per export; nested `describe`s for branches.
- Test names describe behavior, not implementation: `"returns null when id is empty"`, not `"calls validator"`.

## Coverage

`npm run test:coverage` writes:

- `coverage/lcov.info` — for CI integrations.
- `coverage/index.html` — open in a browser.

There is no enforced threshold yet. Recommended additions when CI is wired:

| Area            | Target |
| --------------- | ------ |
| `src/utils/`    | 95%    |
| `src/lib/`      | 90%    |
| `src/services/` | 90%    |
| `src/hooks/`    | 80%    |
| Overall         | 70%    |

## Flaky Test Triage

- Use `screen.findByRole` / `waitFor` instead of arbitrary timeouts.
- Never `setTimeout` in a test; use `vi.useFakeTimers()` and `vi.advanceTimersByTime()`.
- Always clean up portals (`afterEach(() => cleanup())` is automatic with the React Testing Library setup).
