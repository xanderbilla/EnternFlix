import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  handleApiError,
  getUserFriendlyErrorMessage,
  isNetworkError,
  createError,
} from "./errorHelpers";

vi.mock("@/lib/logger/logger", () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

describe("errorHelpers — handleApiError", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("wraps a standard Error with API_ERROR code and includes context", () => {
    const result = handleApiError(new Error("boom"), "fetchMovies");
    expect(result.code).toBe("API_ERROR");
    expect(result.message).toBe("boom");
    expect(result.context).toMatchObject({ context: "fetchMovies" });
    expect(result.timestamp).toBeTruthy();
  });

  it("wraps an object with message", () => {
    const result = handleApiError({ message: "nope" }, "ctx");
    expect(result.code).toBe("API_ERROR");
    expect(result.message).toBe("nope");
    expect(result.context).toMatchObject({ context: "ctx" });
  });

  it("falls back for unknown primitives", () => {
    const result = handleApiError(42, "x");
    expect(result.code).toBe("API_ERROR");
    expect(result.message).toBe("Unknown API error");
    expect(result.context).toMatchObject({ context: "x", error: "42" });
  });
});

describe("errorHelpers — isNetworkError / getUserFriendlyErrorMessage", () => {
  it("detects network-flavored errors", () => {
    expect(isNetworkError(new Error("network refused"))).toBe(true);
    expect(isNetworkError(new Error("fetch failed"))).toBe(true);
    expect(isNetworkError(new Error("timeout exceeded"))).toBe(true);
    expect(isNetworkError(new Error("ECONNABORTED"))).toBe(true);
    expect(isNetworkError(new Error("validation"))).toBe(false);
    expect(isNetworkError("plain string")).toBe(false);
  });

  it("returns connection guidance for network errors", () => {
    expect(getUserFriendlyErrorMessage(new Error("network down"))).toBe(
      "Network error. Please check your connection and try again.",
    );
  });

  it("falls through to formatErrorMessage for non-network errors", () => {
    expect(getUserFriendlyErrorMessage(new Error("oops"))).toBe("oops");
    expect(getUserFriendlyErrorMessage(undefined)).toBe(
      "An unexpected error occurred. Please try again.",
    );
  });
});

describe("errorHelpers — createError", () => {
  it("includes message, code, context, and ISO timestamp", () => {
    const e = createError("m", "C", { a: 1 });
    expect(e.message).toBe("m");
    expect(e.code).toBe("C");
    expect(e.context).toEqual({ a: 1 });
    expect(() => new Date(e.timestamp)).not.toThrow();
  });
});
