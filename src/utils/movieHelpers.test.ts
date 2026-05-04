import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/env/env", () => ({
  config: {
    appEnv: "test",
    isProd: false,
    isDev: false,
    isTest: true,
    enableLogging: false,
    tmdb: { apiKey: "k", baseUrl: "https://api.themoviedb.org/3" },
    customApi: {
      baseUrl: "https://api.example.test",
      imageBaseUrl: "https://cdn.example.test",
    },
  },
}));

import { getImageUrl } from "./movieHelpers";

describe("getImageUrl", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns empty string for null path", () => {
    expect(getImageUrl(null)).toBe("");
  });

  it("builds a TMDB URL when path starts with /", () => {
    expect(getImageUrl("/abc.jpg")).toBe(
      "https://image.tmdb.org/t/p/w500/abc.jpg",
    );
  });

  it("respects the requested TMDB size", () => {
    expect(getImageUrl("/abc.jpg", "original")).toBe(
      "https://image.tmdb.org/t/p/original/abc.jpg",
    );
  });

  it("uses the custom image base URL for non-/ paths and ensures a single slash join", () => {
    expect(getImageUrl("posters/x.jpg")).toBe(
      "https://cdn.example.test/posters/x.jpg",
    );
  });
});
