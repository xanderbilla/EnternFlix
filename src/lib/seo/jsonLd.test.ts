import { describe, expect, it } from "vitest";
import {
  buildCollectionPageJsonLd,
  buildMovieJsonLd,
  buildTitleJsonLd,
  buildTvSeriesJsonLd,
} from "@/lib/seo/jsonLd";
import type { Movie } from "@/types/movie";

const movie: Movie = {
  id: "abc123",
  title: "Test Movie",
  overview: "A test.",
  backdropPath: "/back.jpg",
  releaseDate: "2024-01-15",
  originalLanguage: "en",
  runtime: 124,
  contentType: "MOVIE",
  genres: [
    { id: "1", name: "Action" },
    { id: "2", name: "Drama" },
  ],
  casts: [{ id: "c1", name: "Actor One" }],
  studios: [{ id: "s1", name: "Studio One" }],
  originCountry: ["US"],
  contentRating: "18_PLUS",
};

const series: Movie = {
  ...movie,
  id: "tv1",
  title: "Test Series",
  contentType: "TV",
  firstAirDate: "2023-03-01",
  lastAirDate: "2024-06-01",
  numberOfSeasons: 2,
  numberOfEpisodes: 18,
};

describe("jsonLd builders", () => {
  it("builds a Movie JSON-LD with absolute URLs and ISO duration", () => {
    const data = buildMovieJsonLd(movie);
    expect(data["@type"]).toBe("Movie");
    expect(data.name).toBe("Test Movie");
    expect(data.duration).toBe("PT124M");
    expect(data.url).toContain("/watch?id=abc123&type=movie");
    expect(data.image).toMatch(/^https?:\/\/.+\/back\.jpg$/);
    expect(data.genre).toEqual(["Action", "Drama"]);
  });

  it("builds a TVSeries JSON-LD with season/episode counts", () => {
    const data = buildTvSeriesJsonLd(series);
    expect(data["@type"]).toBe("TVSeries");
    expect(data.numberOfSeasons).toBe(2);
    expect(data.numberOfEpisodes).toBe(18);
    expect(data.startDate).toBe("2023-03-01");
    expect(data.url).toContain("/watch?id=tv1&type=tv");
  });

  it("buildTitleJsonLd routes by mediaType", () => {
    expect(buildTitleJsonLd(movie, "movie")["@type"]).toBe("Movie");
    expect(buildTitleJsonLd(series, "tv")["@type"]).toBe("TVSeries");
  });

  it("omits empty/undefined fields", () => {
    const minimal: Movie = {
      id: "x",
      backdropPath: null,
    };
    const data = buildMovieJsonLd(minimal);
    expect(data.image).toBeUndefined();
    expect(data.duration).toBeUndefined();
    expect(data.genre).toBeUndefined();
  });

  it("builds a CollectionPage JSON-LD tied to the website node", () => {
    const data = buildCollectionPageJsonLd({
      name: "Action Movies",
      description: "Action titles.",
      path: "/browse/genre/28",
    });
    expect(data["@type"]).toBe("CollectionPage");
    expect(data.url).toContain("/browse/genre/28");
    expect(data.isPartOf).toEqual({
      "@id": expect.stringContaining("#website"),
    });
  });
});
