import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  getImageUrl,
  getReleaseYear,
  getContentType,
  getTruncatedTitle,
  getGenres,
  getDuration,
} from "./movieHelpers";
import { getContentRating, getQuality, truncateText } from "./contentHelpers";
import { getCardPositionClass, getPositionClass } from "./layoutHelpers";
import { cn } from "./cn";
import type { Movie } from "@/types/movie";

/**
 * Feature: code-refactoring-and-optimization
 * Property 1: Utility Function Determinism
 *
 * **Validates: Requirements 1.4, 1.5, 1.6, 8.6**
 *
 * For any utility function in the utils folder and any valid input, calling
 * the function multiple times with the same input should produce identical
 * output without side effects.
 */
describe("Property 1: Utility Function Determinism", () => {
  // Arbitrary for generating Movie objects
  const movieArbitrary = fc.record({
    id: fc.oneof(fc.integer({ min: 1 }), fc.string({ minLength: 1 })),
    title: fc.option(fc.string(), { nil: undefined }),
    overview: fc.string(),
    backdropPath: fc.option(fc.string(), { nil: null }),
    posterPath: fc.option(fc.string(), { nil: null }),
    releaseDate: fc.option(fc.string(), { nil: undefined }),
    firstAirDate: fc.option(fc.string(), { nil: undefined }),
    voteAverage: fc.float({ min: 0, max: 10 }),
    voteCount: fc.integer({ min: 0 }),
    popularity: fc.float({ min: 0, max: 10000 }),
    adult: fc.option(fc.boolean(), { nil: undefined }),
    contentRating: fc.option(fc.constantFrom("18_PLUS", "21_PLUS"), {
      nil: undefined,
    }),
    genres: fc.option(
      fc.array(
        fc.record({
          id: fc.integer({ min: 1 }),
          name: fc.string({ minLength: 1 }),
        }),
        { minLength: 0, maxLength: 5 },
      ),
      { nil: undefined },
    ),
    contentType: fc.option(fc.constantFrom("MOVIE", "TV", "PERSON"), {
      nil: undefined,
    }),
    numberOfSeasons: fc.option(fc.integer({ min: 0, max: 20 }), {
      nil: undefined,
    }),
    numberOfEpisodes: fc.option(fc.integer({ min: 0, max: 500 }), {
      nil: undefined,
    }),
    runtime: fc.option(fc.integer({ min: 0, max: 500 }), { nil: undefined }),
  }) as fc.Arbitrary<Movie>;

  describe("movieHelpers.ts", () => {
    it("getImageUrl produces consistent results", () => {
      fc.assert(
        fc.property(
          fc.option(fc.string(), { nil: null }),
          fc.constantFrom("w500", "w780", "original"),
          (path, size) => {
            const result1 = getImageUrl(path, size);
            const result2 = getImageUrl(path, size);
            const result3 = getImageUrl(path, size);

            // All results should be identical
            expect(result1).toBe(result2);
            expect(result2).toBe(result3);

            return result1 === result2 && result2 === result3;
          },
        ),
        { numRuns: 100 },
      );
    });

    it("getReleaseYear produces consistent results", () => {
      fc.assert(
        fc.property(movieArbitrary, (movie) => {
          const result1 = getReleaseYear(movie);
          const result2 = getReleaseYear(movie);
          const result3 = getReleaseYear(movie);

          // All results should be identical
          expect(result1).toBe(result2);
          expect(result2).toBe(result3);

          return result1 === result2 && result2 === result3;
        }),
        { numRuns: 100 },
      );
    });

    it("getContentType produces consistent results", () => {
      fc.assert(
        fc.property(movieArbitrary, (movie) => {
          const result1 = getContentType(movie);
          const result2 = getContentType(movie);
          const result3 = getContentType(movie);

          // All results should be identical
          expect(result1).toBe(result2);
          expect(result2).toBe(result3);

          return result1 === result2 && result2 === result3;
        }),
        { numRuns: 100 },
      );
    });

    it("getTruncatedTitle produces consistent results", () => {
      fc.assert(
        fc.property(
          movieArbitrary,
          fc.integer({ min: 1, max: 200 }),
          (movie, maxLength) => {
            const result1 = getTruncatedTitle(movie, maxLength);
            const result2 = getTruncatedTitle(movie, maxLength);
            const result3 = getTruncatedTitle(movie, maxLength);

            // All results should be identical
            expect(result1).toBe(result2);
            expect(result2).toBe(result3);

            return result1 === result2 && result2 === result3;
          },
        ),
        { numRuns: 100 },
      );
    });

    it("getGenres produces consistent results", () => {
      fc.assert(
        fc.property(movieArbitrary, (movie) => {
          const result1 = getGenres(movie);
          const result2 = getGenres(movie);
          const result3 = getGenres(movie);

          // All results should be identical
          expect(result1).toBe(result2);
          expect(result2).toBe(result3);

          return result1 === result2 && result2 === result3;
        }),
        { numRuns: 100 },
      );
    });

    it("getDuration produces consistent results", () => {
      fc.assert(
        fc.property(movieArbitrary, (movie) => {
          const result1 = getDuration(movie);
          const result2 = getDuration(movie);
          const result3 = getDuration(movie);

          // All results should be identical
          expect(result1).toBe(result2);
          expect(result2).toBe(result3);

          return result1 === result2 && result2 === result3;
        }),
        { numRuns: 100 },
      );
    });
  });

  describe("contentHelpers.ts", () => {
    it("getContentRating produces consistent results", () => {
      fc.assert(
        fc.property(movieArbitrary, (movie) => {
          const result1 = getContentRating(movie);
          const result2 = getContentRating(movie);
          const result3 = getContentRating(movie);

          // All results should be identical
          expect(result1).toBe(result2);
          expect(result2).toBe(result3);

          return result1 === result2 && result2 === result3;
        }),
        { numRuns: 100 },
      );
    });

    it("getQuality produces consistent results", () => {
      fc.assert(
        fc.property(movieArbitrary, (movie) => {
          const result1 = getQuality(movie);
          const result2 = getQuality(movie);
          const result3 = getQuality(movie);

          // All results should be identical
          expect(result1).toBe(result2);
          expect(result2).toBe(result3);

          return result1 === result2 && result2 === result3;
        }),
        { numRuns: 100 },
      );
    });

    it("truncateText produces consistent results", () => {
      fc.assert(
        fc.property(
          fc.option(fc.string(), { nil: undefined }),
          fc.integer({ min: 1, max: 500 }),
          (text, maxLength) => {
            const result1 = truncateText(text, maxLength);
            const result2 = truncateText(text, maxLength);
            const result3 = truncateText(text, maxLength);

            // All results should be identical
            expect(result1).toBe(result2);
            expect(result2).toBe(result3);

            return result1 === result2 && result2 === result3;
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  describe("layoutHelpers.ts", () => {
    it("getCardPositionClass produces consistent results", () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 100 }),
          fc.integer({ min: 1, max: 10 }),
          (index, itemsPerRow) => {
            const result1 = getCardPositionClass(index, itemsPerRow);
            const result2 = getCardPositionClass(index, itemsPerRow);
            const result3 = getCardPositionClass(index, itemsPerRow);

            // All results should be identical
            expect(result1).toBe(result2);
            expect(result2).toBe(result3);

            return result1 === result2 && result2 === result3;
          },
        ),
        { numRuns: 100 },
      );
    });

    it("getPositionClass produces consistent results", () => {
      fc.assert(
        fc.property(fc.boolean(), fc.boolean(), (isFirst, isLast) => {
          const result1 = getPositionClass(isFirst, isLast);
          const result2 = getPositionClass(isFirst, isLast);
          const result3 = getPositionClass(isFirst, isLast);

          // All results should be identical
          expect(result1).toBe(result2);
          expect(result2).toBe(result3);

          return result1 === result2 && result2 === result3;
        }),
        { numRuns: 100 },
      );
    });
  });

  describe("cn.ts", () => {
    it("cn produces consistent results", () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.oneof(
              fc.string(),
              fc.constant(null),
              fc.constant(undefined),
              fc.dictionary(fc.string(), fc.boolean()),
            ),
            { maxLength: 10 },
          ),
          (inputs) => {
            const result1 = cn(...inputs);
            const result2 = cn(...inputs);
            const result3 = cn(...inputs);

            // All results should be identical
            expect(result1).toBe(result2);
            expect(result2).toBe(result3);

            return result1 === result2 && result2 === result3;
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  describe("Cross-function determinism", () => {
    it("all utility functions maintain determinism when called in sequence", () => {
      fc.assert(
        fc.property(movieArbitrary, (movie) => {
          // Call all functions in sequence multiple times
          const sequence1 = {
            imageUrl: getImageUrl(movie.posterPath, "w500"),
            releaseYear: getReleaseYear(movie),
            contentType: getContentType(movie),
            contentRating: getContentRating(movie),
            quality: getQuality(movie),
            truncatedText: truncateText(movie.overview, 100),
          };

          const sequence2 = {
            imageUrl: getImageUrl(movie.posterPath, "w500"),
            releaseYear: getReleaseYear(movie),
            contentType: getContentType(movie),
            contentRating: getContentRating(movie),
            quality: getQuality(movie),
            truncatedText: truncateText(movie.overview, 100),
          };

          const sequence3 = {
            imageUrl: getImageUrl(movie.posterPath, "w500"),
            releaseYear: getReleaseYear(movie),
            contentType: getContentType(movie),
            contentRating: getContentRating(movie),
            quality: getQuality(movie),
            truncatedText: truncateText(movie.overview, 100),
          };

          // All sequences should produce identical results
          expect(sequence1).toEqual(sequence2);
          expect(sequence2).toEqual(sequence3);

          return (
            JSON.stringify(sequence1) === JSON.stringify(sequence2) &&
            JSON.stringify(sequence2) === JSON.stringify(sequence3)
          );
        }),
        { numRuns: 100 },
      );
    });

    it("utility functions do not modify input data", () => {
      fc.assert(
        fc.property(movieArbitrary, (movie) => {
          // Create a deep copy of the movie object using structuredClone
          const originalMovie = structuredClone(movie);

          // Call all utility functions
          getImageUrl(movie.posterPath, "w500");
          getReleaseYear(movie);
          getContentType(movie);
          getContentRating(movie);
          getQuality(movie);
          truncateText(movie.overview, 100);
          getTruncatedTitle(movie, 50);
          getGenres(movie);
          getDuration(movie);

          // Movie object should remain unchanged
          expect(movie).toEqual(originalMovie);

          return true;
        }),
        { numRuns: 100 },
      );
    });
  });
});
