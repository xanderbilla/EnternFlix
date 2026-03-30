import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fc from "fast-check";
import { formatErrorMessage, createError, logError } from "./errorHelpers";
import type { ValidationError, AppError } from "@/types/validation";

/**
 * Feature: code-refactoring-and-optimization
 * Property 3: Error Message User-Friendliness
 * **Validates: Requirements 9.3**
 *
 * For any error that reaches the user interface, the displayed error message
 * should be non-empty, contain no stack traces, and contain no technical jargon.
 */
describe("Property 3: Error Message User-Friendliness", () => {
  // Arbitrary for generating ValidationError objects
  const validationErrorArbitrary = fc.record({
    field: fc.string({ minLength: 1 }),
    message: fc.string({ minLength: 1 }),
    code: fc.string({ minLength: 1 }),
  }) as fc.Arbitrary<ValidationError>;

  // Arbitrary for generating AppError objects
  const appErrorArbitrary = fc.record({
    message: fc.string({ minLength: 1 }),
    code: fc.string({ minLength: 1 }),
    timestamp: fc
      .integer({ min: 946684800000, max: 1924905600000 }) // 2000-01-01 to 2030-12-31 in milliseconds
      .map((ms) => new Date(ms).toISOString()),
    context: fc.option(fc.dictionary(fc.string(), fc.anything()), {
      nil: undefined,
    }),
  }) as fc.Arbitrary<AppError>;

  // Arbitrary for generating standard Error objects
  const standardErrorArbitrary = fc
    .string({ minLength: 1 })
    .map((msg) => new Error(msg));

  // Arbitrary for generating string errors
  const stringErrorArbitrary = fc.string({ minLength: 1 });

  // Arbitrary for generating various error types
  const anyErrorArbitrary = fc.oneof(
    validationErrorArbitrary,
    appErrorArbitrary,
    standardErrorArbitrary,
    stringErrorArbitrary,
  );

  it("should return non-empty messages for all error types", () => {
    fc.assert(
      fc.property(anyErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
        return result.length > 0;
      }),
      { numRuns: 100 },
    );
  });

  it("should not contain stack traces in formatted messages", () => {
    fc.assert(
      fc.property(anyErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
        // Check for common stack trace indicators
        const hasStackTrace =
          result.includes("at ") ||
          result.includes("stack:") ||
          result.includes("Stack:") ||
          result.includes("\n    at ") ||
          /at\s+\w+\s+\(/.test(result) || // "at functionName ("
          /at\s+[A-Z]/.test(result); // "at ClassName"
        return !hasStackTrace;
      }),
      { numRuns: 100 },
    );
  });

  it("should not contain technical error codes in formatted messages", () => {
    fc.assert(
      fc.property(anyErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
        // Check for common technical jargon patterns
        const hasTechnicalJargon =
          result.includes("API_ERROR") ||
          result.includes("VALIDATION_ERROR") ||
          result.includes("COMPONENT_ERROR") ||
          result.includes("ERROR_CODE") ||
          result.includes("code:") ||
          result.includes("Code:");
        return !hasTechnicalJargon;
      }),
      { numRuns: 100 },
    );
  });

  it("should handle ValidationError objects correctly", () => {
    fc.assert(
      fc.property(validationErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
        // Should return the message field
        return result === error.message && result.length > 0;
      }),
      { numRuns: 100 },
    );
  });

  it("should handle AppError objects correctly", () => {
    fc.assert(
      fc.property(appErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
        // Should return the message field
        return result === error.message && result.length > 0;
      }),
      { numRuns: 100 },
    );
  });

  it("should handle standard Error objects correctly", () => {
    fc.assert(
      fc.property(standardErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
        // Should return the error message
        return result === error.message && result.length > 0;
      }),
      { numRuns: 100 },
    );
  });

  it("should handle string errors correctly", () => {
    fc.assert(
      fc.property(stringErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
        // Should return the string itself
        return result === error && result.length > 0;
      }),
      { numRuns: 100 },
    );
  });

  it("should return a fallback message for unknown error types", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(null),
          fc.constant(undefined),
          fc.integer(),
          fc.boolean(),
          fc.array(fc.anything()),
        ),
        (error) => {
          const result = formatErrorMessage(error);
          // Should return a non-empty fallback message
          return (
            result.length > 0 &&
            result === "An unexpected error occurred. Please try again."
          );
        },
      ),
      { numRuns: 100 },
    );
  });

  it("should produce consistent results for the same input", () => {
    fc.assert(
      fc.property(anyErrorArbitrary, (error) => {
        const result1 = formatErrorMessage(error);
        const result2 = formatErrorMessage(error);
        // Should be deterministic
        return result1 === result2;
      }),
      { numRuns: 100 },
    );
  });
});

/**
 * Feature: code-refactoring-and-optimization
 * Property 4: Error Logging Context
 * **Validates: Requirements 9.4**
 *
 * For any error that is logged, the log entry should contain sufficient context
 * for debugging (message, code, timestamp, and optional context data).
 */
describe("Property 4: Error Logging Context", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    // Set NODE_ENV to development to enable logging
    (process.env as any).NODE_ENV = "development";
    // Spy on console.error to capture log output
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original NODE_ENV
    (process.env as any).NODE_ENV = originalNodeEnv;
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  // Arbitrary for generating AppError objects with various context data
  const appErrorArbitrary = fc.record({
    message: fc.string({ minLength: 1 }),
    code: fc.string({ minLength: 1 }),
    timestamp: fc
      .integer({ min: 946684800000, max: 1924905600000 }) // 2000-01-01 to 2030-12-31 in milliseconds
      .map((ms) => new Date(ms).toISOString()),
    context: fc.option(
      fc.dictionary(
        fc.string({ minLength: 1 }),
        fc.oneof(
          fc.string(),
          fc.integer(),
          fc.boolean(),
          fc.constant(null),
          fc.constant(undefined),
          fc.array(fc.string()),
          fc.record({
            nested: fc.string(),
            value: fc.integer(),
          }),
        ),
      ),
      { nil: undefined },
    ),
  }) as fc.Arbitrary<AppError>;

  it("should log all required fields for any AppError", () => {
    fc.assert(
      fc.property(appErrorArbitrary, (error) => {
        // Clear previous calls
        consoleErrorSpy.mockClear();

        // Log the error
        logError(error);

        // Verify console.error was called
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

        // Get the logged data
        const loggedArgs = consoleErrorSpy.mock.calls[0];
        expect(loggedArgs).toBeDefined();
        expect(loggedArgs.length).toBe(2);

        // First argument should be the label
        expect(loggedArgs[0]).toBe("[Error]");

        // Second argument should be the error object with all required fields
        const loggedError = loggedArgs[1] as Record<string, unknown>;
        expect(loggedError).toBeDefined();

        // Verify all required fields are present
        expect(loggedError).toHaveProperty("message");
        expect(loggedError).toHaveProperty("code");
        expect(loggedError).toHaveProperty("timestamp");
        expect(loggedError).toHaveProperty("context");

        // Verify field values match the original error
        expect(loggedError.message).toBe(error.message);
        expect(loggedError.code).toBe(error.code);
        expect(loggedError.timestamp).toBe(error.timestamp);
        expect(loggedError.context).toEqual(error.context);

        return true;
      }),
      { numRuns: 100 },
    );
  });

  it("should log message field as non-empty string", () => {
    fc.assert(
      fc.property(appErrorArbitrary, (error) => {
        consoleErrorSpy.mockClear();
        logError(error);

        const loggedError = consoleErrorSpy.mock.calls[0][1] as Record<
          string,
          unknown
        >;

        // Message must be a non-empty string
        expect(typeof loggedError.message).toBe("string");
        expect((loggedError.message as string).length).toBeGreaterThan(0);

        return true;
      }),
      { numRuns: 100 },
    );
  });

  it("should log code field as non-empty string", () => {
    fc.assert(
      fc.property(appErrorArbitrary, (error) => {
        consoleErrorSpy.mockClear();
        logError(error);

        const loggedError = consoleErrorSpy.mock.calls[0][1] as Record<
          string,
          unknown
        >;

        // Code must be a non-empty string
        expect(typeof loggedError.code).toBe("string");
        expect((loggedError.code as string).length).toBeGreaterThan(0);

        return true;
      }),
      { numRuns: 100 },
    );
  });

  it("should log timestamp field as valid ISO string", () => {
    fc.assert(
      fc.property(appErrorArbitrary, (error) => {
        consoleErrorSpy.mockClear();
        logError(error);

        const loggedError = consoleErrorSpy.mock.calls[0][1] as Record<
          string,
          unknown
        >;

        // Timestamp must be a string
        expect(typeof loggedError.timestamp).toBe("string");

        // Timestamp should be a valid ISO date string
        const timestamp = loggedError.timestamp as string;
        const parsedDate = new Date(timestamp);
        expect(parsedDate.toISOString()).toBe(timestamp);

        return true;
      }),
      { numRuns: 100 },
    );
  });

  it("should log context field when present", () => {
    fc.assert(
      fc.property(
        appErrorArbitrary.filter((error) => error.context !== undefined),
        (error) => {
          consoleErrorSpy.mockClear();
          logError(error);

          const loggedError = consoleErrorSpy.mock.calls[0][1] as Record<
            string,
            unknown
          >;

          // Context should be present and match the original
          expect(loggedError.context).toBeDefined();
          expect(loggedError.context).toEqual(error.context);

          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("should log context field as undefined when not present", () => {
    fc.assert(
      fc.property(
        appErrorArbitrary.filter((error) => error.context === undefined),
        (error) => {
          consoleErrorSpy.mockClear();
          logError(error);

          const loggedError = consoleErrorSpy.mock.calls[0][1] as Record<
            string,
            unknown
          >;

          // Context should be undefined
          expect(loggedError.context).toBeUndefined();

          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("should preserve complex context data structures", () => {
    fc.assert(
      fc.property(
        fc.record({
          message: fc.string({ minLength: 1 }),
          code: fc.string({ minLength: 1 }),
          timestamp: fc
            .integer({ min: 946684800000, max: 1924905600000 }) // 2000-01-01 to 2030-12-31 in milliseconds
            .map((ms) => new Date(ms).toISOString()),
          context: fc.record({
            userId: fc.integer(),
            action: fc.string(),
            metadata: fc.record({
              nested: fc.string(),
              values: fc.array(fc.integer()),
            }),
            tags: fc.array(fc.string()),
          }),
        }) as fc.Arbitrary<AppError>,
        (error) => {
          consoleErrorSpy.mockClear();
          logError(error);

          const loggedError = consoleErrorSpy.mock.calls[0][1] as Record<
            string,
            unknown
          >;

          // Complex context should be preserved exactly
          expect(loggedError.context).toEqual(error.context);

          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("should not log in production environment", () => {
    fc.assert(
      fc.property(appErrorArbitrary, (error) => {
        // Set NODE_ENV to production
        (process.env as any).NODE_ENV = "production";
        consoleErrorSpy.mockClear();

        logError(error);

        // console.error should not be called in production
        expect(consoleErrorSpy).not.toHaveBeenCalled();

        // Reset to development for other tests
        (process.env as any).NODE_ENV = "development";

        return true;
      }),
      { numRuns: 100 },
    );
  });

  it("should handle errors created by createError function", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        fc.option(fc.dictionary(fc.string({ minLength: 1 }), fc.anything()), {
          nil: undefined,
        }),
        (message, code, context) => {
          consoleErrorSpy.mockClear();

          // Create error using createError utility
          const error = createError(message, code, context);

          // Log the error
          logError(error);

          // Verify all fields are logged
          const loggedError = consoleErrorSpy.mock.calls[0][1] as Record<
            string,
            unknown
          >;

          expect(loggedError.message).toBe(message);
          expect(loggedError.code).toBe(code);
          expect(loggedError.timestamp).toBeDefined();
          expect(loggedError.context).toEqual(context);

          return true;
        },
      ),
      { numRuns: 100 },
    );
  });
});
