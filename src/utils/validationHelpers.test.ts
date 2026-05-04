import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  validateMovie,
  validateApiResponse,
  isNonEmptyString,
} from "./validationHelpers";
import type { Movie } from "@/types/movie";

describe("Property 2: Validation Error Completeness", () => {
  it("validateMovie returns complete error details for invalid data", () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.option(
            fc.oneof(
              fc.integer(),
              fc.string(),
              fc.constant(null),
              fc.constant(undefined),
            ),
            { nil: undefined },
          ),
          overview: fc.option(
            fc.oneof(
              fc.string(),
              fc.integer(),
              fc.constant(null),
              fc.constant(undefined),
            ),
            { nil: undefined },
          ),
          backdropPath: fc.option(
            fc.oneof(fc.string(), fc.integer(), fc.boolean()),
            { nil: undefined },
          ),
          posterPath: fc.option(
            fc.oneof(fc.string(), fc.integer(), fc.boolean()),
            { nil: undefined },
          ),
          voteAverage: fc.option(
            fc.oneof(fc.float(), fc.string(), fc.constant(null)),
            { nil: undefined },
          ),
          voteCount: fc.option(
            fc.oneof(fc.integer(), fc.string(), fc.constant(null)),
            { nil: undefined },
          ),
          popularity: fc.option(
            fc.oneof(fc.float(), fc.string(), fc.constant(null)),
            { nil: undefined },
          ),
          originalLanguage: fc.option(
            fc.oneof(fc.string(), fc.integer(), fc.constant(null)),
            { nil: undefined },
          ),
        }),
        (invalidData) => {
          const result = validateMovie(invalidData);

          if (!result.isValid) {
            expect(result.errors.length).toBeGreaterThan(0);

            result.errors.forEach((error) => {
              expect(error.message).toBeTruthy();
              expect(error.message.length).toBeGreaterThan(0);
              expect(error.code).toBeTruthy();
              expect(error.code.length).toBeGreaterThan(0);
              expect(error.field).toBeTruthy();
              expect(error.field.length).toBeGreaterThan(0);
            });

            return true;
          }

          expect(result.errors).toEqual([]);
          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("validateMovie rejects non-object data with complete error details", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.string(),
          fc.integer(),
          fc.boolean(),
          fc.constant(null),
          fc.constant(undefined),
          fc.array(fc.anything()),
        ),
        (invalidData) => {
          const result = validateMovie(invalidData);

          expect(result.isValid).toBe(false);
          expect(result.errors.length).toBeGreaterThan(0);

          result.errors.forEach((error) => {
            expect(error.message).toBeTruthy();
            expect(error.message.length).toBeGreaterThan(0);
            expect(error.code).toBeTruthy();
            expect(error.code.length).toBeGreaterThan(0);
            expect(error.field).toBeTruthy();
          });

          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("validateApiResponse returns complete error details for invalid responses", () => {
    fc.assert(
      fc.property(
        fc.record({
          status: fc.option(
            fc.oneof(fc.integer(), fc.string(), fc.constant(null)),
            { nil: undefined },
          ),
          message: fc.option(
            fc.oneof(fc.string(), fc.integer(), fc.constant(null)),
            { nil: undefined },
          ),
          data: fc.option(fc.anything(), { nil: undefined }),
        }),
        (invalidResponse) => {
          const simpleValidator = (data: unknown) => ({
            isValid: true,
            data: data as Movie,
            errors: [],
          });

          const result = validateApiResponse(invalidResponse, simpleValidator);

          if (!result.isValid) {
            expect(result.errors.length).toBeGreaterThan(0);

            result.errors.forEach((error) => {
              expect(error.message).toBeTruthy();
              expect(error.message.length).toBeGreaterThan(0);
              expect(error.code).toBeTruthy();
              expect(error.code.length).toBeGreaterThan(0);
              expect(error.field).toBeTruthy();
            });

            return true;
          }

          expect(result.errors).toEqual([]);
          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("validateApiResponse propagates data validation errors with complete details", () => {
    fc.assert(
      fc.property(
        fc.record({
          status: fc.integer({ min: 200, max: 599 }),
          message: fc.string(),
          data: fc.record({
            id: fc.option(fc.string(), { nil: undefined }),
            overview: fc.option(fc.integer(), { nil: undefined }),
          }),
        }),
        (response) => {
          const result = validateApiResponse(response, validateMovie);

          if (!result.isValid) {
            expect(result.errors.length).toBeGreaterThan(0);

            result.errors.forEach((error) => {
              expect(error.message).toBeTruthy();
              expect(error.message.length).toBeGreaterThan(0);
              expect(error.code).toBeTruthy();
              expect(error.code.length).toBeGreaterThan(0);
              expect(error.field).toBeTruthy();
              if (error.field !== "data") {
                expect(error.field.startsWith("data.")).toBe(true);
              }
            });

            return true;
          }

          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("validation functions never return errors with empty messages or codes", () => {
    fc.assert(
      fc.property(fc.anything(), (data) => {
        const result = validateMovie(data);

        result.errors.forEach((error) => {
          expect(error.message).not.toBe("");
          expect(error.code).not.toBe("");
          expect(error.field).not.toBe("");
        });

        return true;
      }),
      { numRuns: 100 },
    );
  });
});
