import { describe, it, expect } from "vitest";
import { queryKeys } from "./queryKeys";

describe("queryKeys", () => {
  it("exposes stable static keys", () => {
    expect(queryKeys.trending).toEqual(["trending"]);
    expect(queryKeys.randomContent).toEqual(["random", "content"]);
  });

  it("derives parameterized keys", () => {
    expect(queryKeys.title("42")).toEqual(["title", "42"]);
    expect(queryKeys.person("p1")).toEqual(["person", "p1"]);
    expect(queryKeys.personMovies("p1", "movie")).toEqual([
      "personMovies",
      "p1",
      "movie",
    ]);
    expect(queryKeys.playback("movie", "id")).toEqual([
      "playback",
      "movie",
      "id",
    ]);
    expect(queryKeys.search("q")).toEqual(["search", "q", "all", "recent"]);
    expect(queryKeys.search("q", "tv", "popular")).toEqual([
      "search",
      "q",
      "tv",
      "popular",
    ]);
    expect(queryKeys.discover("movie", "popular")).toEqual([
      "discover",
      "movie",
      "popular",
    ]);
    expect(queryKeys.discoverByAttribute("g1", "movie")).toEqual([
      "discover",
      "attribute",
      "g1",
      "movie",
    ]);
    expect(queryKeys.discoverInfinite("latest", "all")).toEqual([
      "discoverInfinite",
      "latest",
      "all",
      "",
    ]);
    expect(queryKeys.discoverInfinite("latest", "movie", "alpha_asc")).toEqual([
      "discoverInfinite",
      "latest",
      "movie",
      "alpha_asc",
    ]);
    expect(queryKeys.discoverByAttributeInfinite("g1", "movie")).toEqual([
      "discoverByAttributeInfinite",
      "g1",
      "movie",
      "",
    ]);
    expect(queryKeys.attributesGenres("movie")).toEqual([
      "attributes",
      "genres",
      "movie",
    ]);
    expect(queryKeys.banner("movie")).toEqual(["banner", "movie"]);
    expect(queryKeys.customContent("home")).toEqual([
      "custom",
      "content",
      "home",
    ]);
    expect(queryKeys.customMovie("id")).toEqual(["custom", "movie", "id"]);
    expect(queryKeys.genres("movie")).toEqual(["genres", "movie"]);
  });
});
