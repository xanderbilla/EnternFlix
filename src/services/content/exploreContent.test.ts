import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/api/customAxios", () => ({
  default: {
    get: vi.fn(),
  },
}));

import customAxios from "@/lib/api/customAxios";
import {
  fetchFreshExploreMovies,
  getDiscoverNavigation,
} from "@/services/content/exploreContent";

describe("exploreContent service", () => {
  it("returns route navigation for discover-backed hooks", () => {
    expect(getDiscoverNavigation("latestRelease")).toEqual({
      pagePath: "/browse/latest",
      queryType: undefined,
    });

    expect(getDiscoverNavigation("trendingMovies")).toEqual({
      pagePath: "/browse/recent",
      queryType: "movie",
    });
  });

  it("returns undefined navigation for non-discover hooks", () => {
    expect(getDiscoverNavigation("allContent")).toBeUndefined();
  });

  it("fetches discover data for discover hooks", async () => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        data: { items: [{ id: "d1", backdropPath: null }] },
      },
    });

    const result = await fetchFreshExploreMovies("latestRelease", []);

    expect(result).toEqual([{ id: "d1", backdropPath: null }]);
    expect(customAxios.get).toHaveBeenCalledWith(
      "c/discover?type=latest&content=all",
    );
  });

  it("fetches all-content fallback for non-discover mapped hooks", async () => {
    (customAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        data: { items: [{ id: "m1", backdropPath: null }] },
      },
    });

    const result = await fetchFreshExploreMovies("allMovies", []);

    expect(result).toEqual([{ id: "m1", backdropPath: null }]);
    expect(customAxios.get).toHaveBeenCalledWith("c/content?type=movie");
  });

  it("returns provided fallback movies for unknown hook names", async () => {
    const fallback = [{ id: "local", backdropPath: null }];

    const result = await fetchFreshExploreMovies("unknownHook", fallback);

    expect(result).toBe(fallback);
  });
});
