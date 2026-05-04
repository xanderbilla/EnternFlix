import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fc from "fast-check";
import { formatErrorMessage, createError, logError } from "./errorHelpers";
import type { ValidationError, AppError } from "@/types/validation";

describe("Property 3: Error Message User-Friendliness", () => {
  const validationErrorArbitrary = fc.record({
    field: fc.string({ minLength: 1 }),
    message: fc.string({ minLength: 1 }),
    code: fc.string({ minLength: 1 }),
  }) as fc.Arbitrary<ValidationError>;

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

  const standardErrorArbitrary = fc
    .string({ minLength: 1 })
    .map((msg) => new Error(msg));

  const stringErrorArbitrary = fc.string({ minLength: 1 });

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
        const hasStackTrace =
          result.includes("at ") ||
          result.includes("stack:") ||
          result.includes("Stack:") ||
          result.includes("\n    at ") ||
          /at\s+\w+\s+\(/.test(result) ||
          /at\s+[A-Z]/.test(result);
        return !hasStackTrace;
      }),
      { numRuns: 100 },
    );
  });

  it("should not contain technical error codes in formatted messages", () => {
    fc.assert(
      fc.property(anyErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
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
        return result === error.message && result.length > 0;
      }),
      { numRuns: 100 },
    );
  });

  it("should handle AppError objects correctly", () => {
    fc.assert(
      fc.property(appErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
        return result === error.message && result.length > 0;
      }),
      { numRuns: 100 },
    );
  });

  it("should handle standard Error objects correctly", () => {
    fc.assert(
      fc.property(standardErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
        return result === error.message && result.length > 0;
      }),
      { numRuns: 100 },
    );
  });

  it("should handle string errors correctly", () => {
    fc.assert(
      fc.property(stringErrorArbitrary, (error) => {
        const result = formatErrorMessage(error);
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
        return result1 === result2;
      }),
      { numRuns: 100 },
    );
  });
});

describe("Property 4: Error Logging Context", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    (process.env as any).NODE_ENV = "development";
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    (process.env as any).NODE_ENV = originalNodeEnv;
    consoleErrorSpy.mockRestore();
  });

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
        consoleErrorSpy.mockClear();

        logError(error);

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

        const loggedArgs = consoleErrorSpy.mock.calls[0];
        expect(loggedArgs).toBeDefined();
        expect(loggedArgs.length).toBe(2);

        expect(loggedArgs[0]).toBe("[Error]");

        const loggedError = loggedArgs[1] as Record<string, unknown>;
        expect(loggedError).toBeDefined();

        expect(loggedError).toHaveProperty("message");
        expect(loggedError).toHaveProperty("code");
        expect(loggedError).toHaveProperty("timestamp");
        expect(loggedError).toHaveProperty("context");

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

        expect(typeof loggedError.timestamp).toBe("string");

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

          expect(loggedError.context).toEqual(error.context);

          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("should always log errors regardless of environment", () => {
    fc.assert(
      fc.property(appErrorArbitrary, (error) => {
        (process.env as Record<string, string>).NODE_ENV = "production";
        consoleErrorSpy.mockClear();

        logError(error);

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

        (process.env as Record<string, string>).NODE_ENV = "development";

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

          const error = createError(message, code, context);

          logError(error);

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
