import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/env/env", () => ({
  config: {
    appEnv: "test",
    isProd: false,
    isDev: false,
    isTest: true,
    logLevel: "off",
    http: { timeoutMs: 5000 },
    customApi: {
      baseUrl: "https://api.example.com",
      imageBaseUrl: "https://img.example.com",
    },
    images: { extraHosts: [] },
  },
}));

import requests from "./request";

describe("request URL builders", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("custom backend endpoints", () => {
    it("fetchAllContent defaults to type=all", () => {
      expect(requests.fetchAllContent()).toBe("c/content?type=all");
    });

    it("fetchAllContent honours explicit type", () => {
      expect(requests.fetchAllContent("movie")).toBe("c/content?type=movie");
    });

    it("fetchMovieById embeds the id", () => {
      expect(requests.fetchMovieById("abc-123")).toBe("c/content/abc-123");
    });

    it("fetchPersonById embeds the id", () => {
      expect(requests.fetchPersonById("p-7")).toBe("c/people/p-7");
    });

    it("fetchPersonMovies includes id and type", () => {
      expect(requests.fetchPersonMovies("p-7", "tv")).toBe(
        "c/people/p-7/content?type=tv",
      );
    });

    it("fetchPersonMovies defaults type to all", () => {
      expect(requests.fetchPersonMovies("p-7")).toBe(
        "c/people/p-7/content?type=all",
      );
    });

    it("fetchDiscoverByAttribute composes attributeId and content", () => {
      expect(requests.fetchDiscoverByAttribute("genre-28", "movie")).toBe(
        "c/attributes/genre-28?content=movie",
      );
    });

    it("fetchAttributes defaults to genres", () => {
      expect(requests.fetchAttributes()).toBe("c/attributes?type=genres");
    });

    it("fetchAttributes accepts explicit attribute type", () => {
      expect(requests.fetchAttributes("GENRE")).toBe("c/attributes?type=GENRE");
    });

    it("fetchDiscover defaults to latest/all", () => {
      expect(requests.fetchDiscover()).toBe(
        "c/discover?type=latest&content=all",
      );
    });

    it("fetchBanner defaults to all", () => {
      expect(requests.fetchBanner()).toBe("c/banner?type=all");
    });

    it("fetchSearch builds query with defaults", () => {
      expect(requests.fetchSearch("naruto")).toBe(
        "c/search?query=naruto&in=all&sort=recent",
      );
    });

    it("fetchSearch includes explicit pagination options", () => {
      expect(
        requests.fetchSearch("naruto", {
          in: "people",
          contentPage: 3,
          contentPageSize: 30,
          peoplePage: 2,
          peoplePageSize: 15,
        }),
      ).toBe(
        "c/search?query=naruto&in=people&sort=recent&contentPage=3&contentPageSize=30&peoplePage=2&peoplePageSize=15",
      );
    });

    it("fetchPlayback embeds contentType and contentId", () => {
      expect(requests.fetchPlayback("movie", "m-1")).toBe("c/play/movie/m-1");
    });
  });

  describe("URL encoding (security)", () => {
    it("encodes path-segment ids that contain a slash", () => {
      // Without encoding `a/b` would inject an extra path segment.
      expect(requests.fetchMovieById("a/b")).toBe("c/content/a%2Fb");
    });

    it("encodes path-segment ids that contain a question mark", () => {
      // Without encoding `a?x=1` would inject a query string.
      expect(requests.fetchPersonById("a?x=1")).toBe("c/people/a%3Fx%3D1");
    });

    it("encodes path-segment ids that contain a hash fragment", () => {
      expect(requests.fetchPersonById("a#frag")).toBe("c/people/a%23frag");
    });

    it("encodes path-segment ids that contain spaces and unicode", () => {
      expect(requests.fetchMovieById("hello world")).toBe(
        "c/content/hello%20world",
      );
      expect(requests.fetchMovieById("漫画")).toBe(
        "c/content/%E6%BC%AB%E7%94%BB",
      );
    });

    it("encodes query params and prevents query-string injection", () => {
      // Without encoding `&` could inject an extra query parameter.
      expect(requests.fetchAllContent("a b&c=d")).toBe(
        "c/content?type=a+b%26c%3Dd",
      );
    });

    it("encodes both attributeId path segment and content query value", () => {
      expect(requests.fetchDiscoverByAttribute("g/28", "tv shows")).toBe(
        "c/attributes/g%2F28?content=tv+shows",
      );
    });

    it("encodes both type and content for fetchDiscover", () => {
      expect(requests.fetchDiscover("a b", "c&d")).toBe(
        "c/discover?type=a+b&content=c%26d",
      );
    });

    it("encodes type for fetchAttributes query value", () => {
      expect(requests.fetchAttributes("genre & mood")).toBe(
        "c/attributes?type=genre+%26+mood",
      );
    });

    it("encodes both segments for fetchPlayback", () => {
      expect(requests.fetchPlayback("movie", "id with/space")).toBe(
        "c/play/movie/id%20with%2Fspace",
      );
    });

    it("encodes search query values", () => {
      expect(requests.fetchSearch("one piece&tv")).toBe(
        "c/search?query=one+piece%26tv&in=all&sort=recent",
      );
    });

    it("encodes type for fetchPersonMovies query value", () => {
      expect(requests.fetchPersonMovies("p?x", "tv&y")).toBe(
        "c/people/p%3Fx/content?type=tv%26y",
      );
    });
  });

  describe("custom backend URL hygiene", () => {
    it("never includes api key in custom backend URLs", () => {
      expect(requests.fetchBanner()).not.toContain("api_key");
      expect(requests.fetchAllContent()).not.toContain("api_key");
    });
  });
});
