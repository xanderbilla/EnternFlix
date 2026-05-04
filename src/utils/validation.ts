import { ValidationResult, ValidationError } from "@/types/validation";

export function validateContentId(id: string): ValidationResult<string> {
  const errors: ValidationError[] = [];

  if (!id || id.trim() === "") {
    errors.push({
      field: "contentId",
      message: "Content ID is required",
      code: "REQUIRED",
    });
  }

  if (id && id.length < 3) {
    errors.push({
      field: "contentId",
      message: "Content ID must be at least 3 characters",
      code: "MIN_LENGTH",
    });
  }

  return {
    isValid: errors.length === 0,
    data: errors.length === 0 ? id : undefined,
    errors,
  };
}

export function validateContentType(
  type: string,
): ValidationResult<"movie" | "tv"> {
  const errors: ValidationError[] = [];
  const validTypes = ["movie", "tv"];

  if (!validTypes.includes(type)) {
    errors.push({
      field: "contentType",
      message: `Content type must be one of: ${validTypes.join(", ")}`,
      code: "INVALID_TYPE",
    });
  }

  return {
    isValid: errors.length === 0,
    data: errors.length === 0 ? (type as "movie" | "tv") : undefined,
    errors,
  };
}

export function validateUrl(url: string): ValidationResult<string> {
  const errors: ValidationError[] = [];

  try {
    new URL(url);
  } catch {
    errors.push({
      field: "url",
      message: "Invalid URL format",
      code: "INVALID_URL",
    });
  }

  return {
    isValid: errors.length === 0,
    data: errors.length === 0 ? url : undefined,
    errors,
  };
}

export function validateSearchQuery(query: string): ValidationResult<string> {
  const errors: ValidationError[] = [];

  if (query && query.length > 100) {
    errors.push({
      field: "query",
      message: "Search query must be less than 100 characters",
      code: "MAX_LENGTH",
    });
  }

  return {
    isValid: errors.length === 0,
    data: errors.length === 0 ? query : undefined,
    errors,
  };
}
