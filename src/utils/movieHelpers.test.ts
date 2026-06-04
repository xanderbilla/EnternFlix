import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/env/env", () => ({
  config: {
    appEnv: "test",
    isProd: false,
    isDev: false,
    isTest: true,
    logLevel: "off",
    customApi: {
      baseUrl: "https://api.example.test",
      imageBaseUrl: "https://cdn.example.test",
    },
  },
}));

import { getImageUrl, getReleaseYear } from "./movieHelpers";

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

  it("strips a leading slash and joins against the configured CDN", () => {
    expect(getImageUrl("/abc.jpg")).toBe("https://cdn.example.test/abc.jpg");
  });

  it("ignores the size argument (CDN serves a single size)", () => {
    expect(getImageUrl("/abc.jpg", "original")).toBe(
      "https://cdn.example.test/abc.jpg",
    );
  });

  it("uses the custom image base URL for non-/ paths and ensures a single slash join", () => {
    expect(getImageUrl("posters/x.jpg")).toBe(
      "https://cdn.example.test/posters/x.jpg",
    );
  });
});

describe("getReleaseYear", () => {
  it("uses firstAirDate when releaseDate is missing", () => {
    expect(
      getReleaseYear({
        id: "1",
        backdropPath: null,
        firstAirDate: "2022-11-20",
      }),
    ).toBe("2022");
  });

  it("returns Unknown when releaseDate is placeholder", () => {
    expect(
      getReleaseYear({
        id: "2",
        backdropPath: null,
        releaseDate: "0001-01-01",
        firstAirDate: "2021-08-15",
      }),
    ).toBe("Unknown");
  });
});
