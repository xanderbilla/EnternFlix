import { describe, expect, it } from "vitest";
import { validateApiResponse } from "./validationHelpers";

describe("validateApiResponse", () => {
  it("returns valid result for complete ApiResponse shape", () => {
    const response = {
      success: true,
      status: 200,
      message: "success",
      data: { id: "1" },
      path: "/c/content",
      requestId: "req-1",
      error: null,
      timestamp: new Date().toISOString(),
    };

    const result = validateApiResponse(response, (data) => ({
      isValid: true,
      data: data as { id: string },
      errors: [],
    }));

    expect(result.isValid).toBe(true);
    expect(result.data?.success).toBe(true);
    expect(result.data?.requestId).toBe("req-1");
  });

  it("returns error when required ApiResponse fields are missing", () => {
    const response = {
      status: 200,
      message: "success",
      data: { id: "1" },
    };

    const result = validateApiResponse(response, (data) => ({
      isValid: true,
      data: data as { id: string },
      errors: [],
    }));

    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.field === "success")).toBe(true);
    expect(result.errors.some((e) => e.field === "error")).toBe(true);
  });

  it("accepts null data envelopes", () => {
    const response = {
      success: true,
      status: 200,
      message: "ok",
      data: null,
      error: null,
      timestamp: new Date().toISOString(),
    };

    const result = validateApiResponse(response, () => ({
      isValid: false,
      data: undefined,
      errors: [{ field: "data", message: "not used", code: "X" }],
    }));

    expect(result.isValid).toBe(true);
    expect(result.data?.data).toBeNull();
  });
});
