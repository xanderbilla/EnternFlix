/**
 * Unit tests for the search query logic extracted from useMovies.ts.
 *
 * We test the two pure behaviours that matter most:
 *   1. The `enabled` guard — the query must not fire for short inputs.
 *   2. `getNextPageParam` — pagination math must be correct.
 *   3. The query key structure — a sentinel for accidental key changes.
 *
 * We deliberately avoid mocking Axios / React Query internals to keep
 * these fast and stable. The full integration is covered by E2E / MSW tests.
 */
import { describe, it, expect } from "vitest";
import { queryKeys } from "@/lib/query/queryKeys";
import type { SearchResponseData } from "@/types/movie";

// ---------------------------------------------------------------------------
// Helpers mirroring the production logic in useMovies.ts
// ---------------------------------------------------------------------------

function isEnabled(query: string): boolean {
  return !!query && query.length > 2;
}

function getNextPageParam(lastPage: SearchResponseData): number | undefined {
  const totalPages = Math.ceil(
    lastPage.content.count / Math.max(lastPage.content.pageSize, 1),
  );
  return lastPage.content.page < totalPages
    ? lastPage.content.page + 1
    : undefined;
}

function makePage(
  page: number,
  count: number,
  pageSize: number,
): SearchResponseData {
  return {
    content: { results: [], count, page, pageSize },
    people: { results: [], count: 0, page: 1, pageSize: 20 },
    warnings: [],
  };
}

// ---------------------------------------------------------------------------
// `enabled` guard
// ---------------------------------------------------------------------------

describe("useSearch — enabled guard", () => {
  it.each(["", " ", "a", "ab"])("is disabled for query %j (≤ 2 chars)", (q) => {
    expect(isEnabled(q)).toBe(false);
  });

  it.each(["abc", "test", "spider-man"])(
    "is enabled for query %j (> 2 chars)",
    (q) => {
      expect(isEnabled(q)).toBe(true);
    },
  );
});

// ---------------------------------------------------------------------------
// `getNextPageParam` pagination math
// ---------------------------------------------------------------------------

describe("useSearch — getNextPageParam", () => {
  it("returns the next page number when results remain", () => {
    // 100 items, 20 per page → 5 pages total
    expect(getNextPageParam(makePage(1, 100, 20))).toBe(2);
    expect(getNextPageParam(makePage(4, 100, 20))).toBe(5);
  });

  it("returns undefined on the last page", () => {
    expect(getNextPageParam(makePage(5, 100, 20))).toBeUndefined();
  });

  it("returns undefined when the result set is empty", () => {
    // 0 items → 0 pages → no next page
    expect(getNextPageParam(makePage(1, 0, 20))).toBeUndefined();
  });

  it("handles a single-page result set", () => {
    // 5 items, 20 per page → 1 page
    expect(getNextPageParam(makePage(1, 5, 20))).toBeUndefined();
  });

  it("handles pageSize of 0 without throwing (guards Math.max)", () => {
    // Math.max(0, 1) = 1; Math.ceil(1 / 1) = 1 total page → no next page
    expect(getNextPageParam(makePage(1, 1, 0))).toBeUndefined();
  });

  it("handles partial last page correctly", () => {
    // 21 items, 20 per page → 2 pages; page 1 has next, page 2 does not
    expect(getNextPageParam(makePage(1, 21, 20))).toBe(2);
    expect(getNextPageParam(makePage(2, 21, 20))).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Query key shape (sentinel against accidental key changes)
// ---------------------------------------------------------------------------

describe("queryKeys.search", () => {
  it("applies correct defaults (scope=all, sort=recent)", () => {
    expect(queryKeys.search("batman")).toEqual([
      "search",
      "batman",
      "all",
      "recent",
    ]);
  });

  it("encodes all three dimensions", () => {
    expect(queryKeys.search("inception", "movie", "alpha_asc")).toEqual([
      "search",
      "inception",
      "movie",
      "alpha_asc",
    ]);
  });

  it("produces distinct keys for different scopes", () => {
    const a = queryKeys.search("hero", "movie", "recent");
    const b = queryKeys.search("hero", "tv", "recent");
    expect(a).not.toEqual(b);
  });

  it("produces distinct keys for different sorts", () => {
    const a = queryKeys.search("hero", "all", "recent");
    const b = queryKeys.search("hero", "all", "alpha_asc");
    expect(a).not.toEqual(b);
  });
});
