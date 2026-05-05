import { describe, expect, it } from "vitest";
import { validateApiResponse } from "./validationHelpers";

describe("validateApiResponse", () => {
  it("returns valid result for complete ApiResponse shape", () => {
    const response = {
      success: true,
      status: 200,
      code: "OK",
      message: "success",
      data: { id: "1" },
      path: "/v1/content",
      request_id: "req-1",
      timestamp: new Date().toISOString(),
    };

    const result = validateApiResponse(response, (data) => ({
      isValid: true,
      data: data as { id: string },
      errors: [],
    }));

    expect(result.isValid).toBe(true);
    expect(result.data?.success).toBe(true);
    expect(result.data?.code).toBe("OK");
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
    expect(result.errors.some((e) => e.field === "code")).toBe(true);
  });
});
