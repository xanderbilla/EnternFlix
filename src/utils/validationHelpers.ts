import type { Movie } from "@/types/movie";
import type { ValidationResult, ValidationError } from "@/types/validation";
import type { ApiResponse } from "@/types/api";

/**
 * Validate movie data structure
 * Checks that the data contains required fields and has correct types
 * @param data - Unknown data to validate as Movie
 * @returns Validation result with typed data or errors
 */
export function validateMovie(data: unknown): ValidationResult<Movie> {
  const errors: ValidationError[] = [];

  // Check if data is an object
  if (!data || typeof data !== "object") {
    errors.push({
      field: "data",
      message: "Movie data must be an object",
      code: "INVALID_TYPE",
    });
    return { isValid: false, errors };
  }

  const movie = data as Record<string, unknown>;

  // Validate required fields
  if (!movie.id && movie.id !== 0) {
    errors.push({
      field: "id",
      message: "Movie ID is required",
      code: "MISSING_FIELD",
    });
  }

  if (typeof movie.overview !== "string") {
    errors.push({
      field: "overview",
      message: "Movie overview must be a string",
      code: "INVALID_TYPE",
    });
  }

  if (movie.backdrop_path !== null && typeof movie.backdrop_path !== "string") {
    errors.push({
      field: "backdrop_path",
      message: "Backdrop path must be a string or null",
      code: "INVALID_TYPE",
    });
  }

  if (movie.poster_path !== null && typeof movie.poster_path !== "string") {
    errors.push({
      field: "poster_path",
      message: "Poster path must be a string or null",
      code: "INVALID_TYPE",
    });
  }

  if (typeof movie.vote_average !== "number") {
    errors.push({
      field: "vote_average",
      message: "Vote average must be a number",
      code: "INVALID_TYPE",
    });
  }

  if (typeof movie.vote_count !== "number") {
    errors.push({
      field: "vote_count",
      message: "Vote count must be a number",
      code: "INVALID_TYPE",
    });
  }

  if (typeof movie.popularity !== "number") {
    errors.push({
      field: "popularity",
      message: "Popularity must be a number",
      code: "INVALID_TYPE",
    });
  }

  if (typeof movie.original_language !== "string") {
    errors.push({
      field: "original_language",
      message: "Original language must be a string",
      code: "INVALID_TYPE",
    });
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    data: movie as unknown as Movie,
    errors: [],
  };
}

/**
 * Validate API response format
 * Checks that the response has the expected structure and validates the data payload
 * @param response - API response to validate
 * @param dataValidator - Function to validate the data payload
 * @returns Validation result with typed response or errors
 */
export function validateApiResponse<T>(
  response: unknown,
  dataValidator: (data: unknown) => ValidationResult<T>,
): ValidationResult<ApiResponse<T>> {
  const errors: ValidationError[] = [];

  // Check if response is an object
  if (!response || typeof response !== "object") {
    errors.push({
      field: "response",
      message: "API response must be an object",
      code: "INVALID_TYPE",
    });
    return { isValid: false, errors };
  }

  const apiResponse = response as Record<string, unknown>;

  // Validate response structure
  if (typeof apiResponse.status !== "number") {
    errors.push({
      field: "status",
      message: "Response status must be a number",
      code: "INVALID_TYPE",
    });
  }

  if (typeof apiResponse.message !== "string") {
    errors.push({
      field: "message",
      message: "Response message must be a string",
      code: "INVALID_TYPE",
    });
  }

  if (!("data" in apiResponse)) {
    errors.push({
      field: "data",
      message: "Response must contain data field",
      code: "MISSING_FIELD",
    });
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Validate the data payload
  const dataValidation = dataValidator(apiResponse.data);
  if (!dataValidation.isValid) {
    return {
      isValid: false,
      errors: dataValidation.errors.map((error) => ({
        ...error,
        field: `data.${error.field}`,
      })),
    };
  }

  return {
    isValid: true,
    data: {
      status: apiResponse.status as number,
      message: apiResponse.message as string,
      data: dataValidation.data!,
    },
    errors: [],
  };
}

/**
 * Type guard for Movie type
 * Checks if the provided data is a valid Movie object
 * @param data - Data to check
 * @returns True if data is a valid Movie
 */
export function isMovie(data: unknown): data is Movie {
  const result = validateMovie(data);
  return result.isValid;
}

/**
 * Type guard for non-empty string
 * Checks if the value is a string with at least one character
 * @param value - Value to check
 * @returns True if value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}
