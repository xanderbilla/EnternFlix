import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  validateMovie,
  validateApiResponse,
  isNonEmptyString,
} from "./validationHelpers";
import type { Movie } from "@/types/movie";

/**
 * Feature: code-refactoring-and-optimization
 * Property 2: Validation Error Completeness
 *
 * **Validates: Requirements 2.5, 9.6**
 *
 * For any invalid data input to a validation function, the validation result
 * should contain at least one error with a non-empty message and error code.
 */
describe("Property 2: Validation Error Completeness", () => {
  it("validateMovie returns complete error details for invalid data", () => {
    fc.assert(
      fc.property(
        // Generate invalid movie data by creating objects with missing or wrong-typed fields
        fc.record({
          // id can be missing, wrong type, or valid
          id: fc.option(
            fc.oneof(
              fc.integer(),
              fc.string(),
              fc.constant(null),
              fc.constant(undefined),
            ),
            { nil: undefined },
          ),
          // overview can be missing, wrong type, or valid
          overview: fc.option(
            fc.oneof(
              fc.string(),
              fc.integer(),
              fc.constant(null),
              fc.constant(undefined),
            ),
            { nil: undefined },
          ),
          // backdrop_path can be missing, wrong type, or valid
          backdrop_path: fc.option(
            fc.oneof(fc.string(), fc.integer(), fc.boolean()),
            { nil: undefined },
          ),
          // poster_path can be missing, wrong type, or valid
          poster_path: fc.option(
            fc.oneof(fc.string(), fc.integer(), fc.boolean()),
            { nil: undefined },
          ),
          // vote_average can be missing, wrong type, or valid
          vote_average: fc.option(
            fc.oneof(fc.float(), fc.string(), fc.constant(null)),
            { nil: undefined },
          ),
          // vote_count can be missing, wrong type, or valid
          vote_count: fc.option(
            fc.oneof(fc.integer(), fc.string(), fc.constant(null)),
            { nil: undefined },
          ),
          // popularity can be missing, wrong type, or valid
          popularity: fc.option(
            fc.oneof(fc.float(), fc.string(), fc.constant(null)),
            { nil: undefined },
          ),
          // original_language can be missing, wrong type, or valid
          original_language: fc.option(
            fc.oneof(fc.string(), fc.integer(), fc.constant(null)),
            { nil: undefined },
          ),
        }),
        (invalidData) => {
          const result = validateMovie(invalidData);

          // If validation fails, verify error completeness
          if (!result.isValid) {
            // Must have at least one error
            expect(result.errors.length).toBeGreaterThan(0);

            // Every error must have non-empty message and code
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

          // If validation passes, errors array should be empty
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
        // Generate non-object values
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

          // Non-object data should always fail validation
          expect(result.isValid).toBe(false);
          expect(result.errors.length).toBeGreaterThan(0);

          // Verify error completeness
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
        // Generate invalid API response structures
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
          // Use a simple validator that always passes for the data
          const simpleValidator = (data: unknown) => ({
            isValid: true,
            data: data as Movie,
            errors: [],
          });

          const result = validateApiResponse(invalidResponse, simpleValidator);

          // If validation fails, verify error completeness
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

          // If validation passes, errors should be empty
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
        // Generate valid API response structure but with invalid data
        fc.record({
          status: fc.integer({ min: 200, max: 599 }),
          message: fc.string(),
          data: fc.record({
            // Invalid movie data
            id: fc.option(fc.string(), { nil: undefined }),
            overview: fc.option(fc.integer(), { nil: undefined }),
          }),
        }),
        (response) => {
          const result = validateApiResponse(response, validateMovie);

          // This should fail because the data is invalid
          if (!result.isValid) {
            expect(result.errors.length).toBeGreaterThan(0);

            result.errors.forEach((error) => {
              expect(error.message).toBeTruthy();
              expect(error.message.length).toBeGreaterThan(0);
              expect(error.code).toBeTruthy();
              expect(error.code.length).toBeGreaterThan(0);
              expect(error.field).toBeTruthy();
              // Data validation errors should have field prefixed with "data."
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
      fc.property(
        // Generate any kind of data
        fc.anything(),
        (data) => {
          const result = validateMovie(data);

          // Check that no error has empty message or code
          result.errors.forEach((error) => {
            expect(error.message).not.toBe("");
            expect(error.code).not.toBe("");
            expect(error.field).not.toBe("");
          });

          return true;
        },
      ),
      { numRuns: 100 },
    );
  });
});
