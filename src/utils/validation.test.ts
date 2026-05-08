import { describe, it, expect } from "vitest";
import {
  validateContentId,
  validateContentType,
  validateUrl,
  validateSearchQuery,
} from "./validation";

describe("validation", () => {
  describe("validateContentId", () => {
    it("accepts ids of at least 3 characters", () => {
      const result = validateContentId("abc");
      expect(result.isValid).toBe(true);
      expect(result.data).toBe("abc");
      expect(result.errors).toHaveLength(0);
    });

    it("rejects empty ids", () => {
      const result = validateContentId("   ");
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe("REQUIRED");
    });

    it("rejects too-short ids", () => {
      const result = validateContentId("ab");
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe("MIN_LENGTH");
    });
  });

  describe("validateContentType", () => {
    it("accepts movie or tv", () => {
      expect(validateContentType("movie").isValid).toBe(true);
      expect(validateContentType("tv").isValid).toBe(true);
    });

    it("rejects unknown content types", () => {
      const result = validateContentType("podcast");
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe("INVALID_TYPE");
    });
  });

  describe("validateUrl", () => {
    it("accepts well-formed urls", () => {
      expect(validateUrl("https://example.com").isValid).toBe(true);
    });

    it("rejects malformed urls", () => {
      const result = validateUrl("not a url");
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe("INVALID_URL");
    });
  });

  describe("validateSearchQuery", () => {
    it("accepts queries within length", () => {
      expect(validateSearchQuery("hello").isValid).toBe(true);
      expect(validateSearchQuery("").isValid).toBe(true);
    });

    it("rejects queries longer than 100 chars", () => {
      const result = validateSearchQuery("a".repeat(101));
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe("MAX_LENGTH");
    });
  });
});
