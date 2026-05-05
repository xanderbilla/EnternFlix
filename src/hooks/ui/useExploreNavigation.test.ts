import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useExploreNavigation } from "./useExploreNavigation";

describe("useExploreNavigation", () => {
  it("creates typed fallback movies when no trending data exists", () => {
    const openCastDialog = vi.fn();
    const openDetailDialog = vi.fn();

    const { result } = renderHook(() =>
      useExploreNavigation({
        data: undefined,
        trendingData: { results: [] },
        openCastDialog,
        openDetailDialog,
      }),
    );

    result.current.handleExploreClick("Action", "Action", false);

    expect(openDetailDialog).toHaveBeenCalledTimes(1);
    const movies = openDetailDialog.mock.calls[0][1] as Array<{ id: string }>;
    expect(movies).toHaveLength(8);
    expect(typeof movies[0].id).toBe("string");
  });
});
