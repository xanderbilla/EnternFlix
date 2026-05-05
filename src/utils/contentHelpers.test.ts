import { describe, expect, it } from "vitest";
import { getContentRating, truncateText } from "./contentHelpers";
import type { Movie } from "@/types/movie";

function makeMovie(partial: Partial<Movie> = {}): Movie {
  return {
    id: "m-1",
    backdropPath: "/backdrop.jpg",
    posterPath: "/poster.jpg",
    ...partial,
  };
}

describe("contentHelpers", () => {
  it("returns explicit content rating when provided", () => {
    const movie = makeMovie({ contentRating: "18_PLUS" });
    expect(getContentRating(movie)).toBe("A 18+");
  });

  it("derives rating from string genre IDs", () => {
    const movie = makeMovie({
      genres: [{ id: "27", name: "Horror" }],
      releaseDate: "2024-01-01",
    });
    expect(getContentRating(movie)).toBe("U/A 16+");
  });

  it("truncates text at max length", () => {
    expect(truncateText("abcdef", 4)).toBe("abc...");
  });
});
