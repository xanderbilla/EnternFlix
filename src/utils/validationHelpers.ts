import type { Movie } from "@/types/movie";
import type { ValidationResult, ValidationError } from "@/types/validation";
import type { ApiResponse } from "@/types/api";

export function validateMovie(data: unknown): ValidationResult<Movie> {
  const errors: ValidationError[] = [];

  if (!data || typeof data !== "object") {
    errors.push({
      field: "data",
      message: "Movie data must be an object",
      code: "INVALID_TYPE",
    });
    return { isValid: false, errors };
  }

  const movie = data as Record<string, unknown>;

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

  if (movie.backdropPath !== null && typeof movie.backdropPath !== "string") {
    errors.push({
      field: "backdropPath",
      message: "Backdrop path must be a string or null",
      code: "INVALID_TYPE",
    });
  }

  if (typeof movie.voteAverage !== "number") {
    errors.push({
      field: "voteAverage",
      message: "Vote average must be a number",
      code: "INVALID_TYPE",
    });
  }

  if (typeof movie.voteCount !== "number") {
    errors.push({
      field: "voteCount",
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

  if (typeof movie.originalLanguage !== "string") {
    errors.push({
      field: "originalLanguage",
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

export function validateApiResponse<T>(
  response: unknown,
  dataValidator: (data: unknown) => ValidationResult<T>,
): ValidationResult<ApiResponse<T>> {
  const errors: ValidationError[] = [];

  if (!response || typeof response !== "object") {
    errors.push({
      field: "response",
      message: "API response must be an object",
      code: "INVALID_TYPE",
    });
    return { isValid: false, errors };
  }

  const apiResponse = response as Record<string, unknown>;

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

  if (typeof apiResponse.success !== "boolean") {
    errors.push({
      field: "success",
      message: "Response success must be a boolean",
      code: "INVALID_TYPE",
    });
  }

  if (typeof apiResponse.timestamp !== "string") {
    errors.push({
      field: "timestamp",
      message: "Response timestamp must be a string",
      code: "INVALID_TYPE",
    });
  }

  if (
    "path" in apiResponse &&
    apiResponse.path !== undefined &&
    typeof apiResponse.path !== "string"
  ) {
    errors.push({
      field: "path",
      message: "Response path must be a string",
      code: "INVALID_TYPE",
    });
  }

  if (
    "requestId" in apiResponse &&
    apiResponse.requestId !== undefined &&
    typeof apiResponse.requestId !== "string"
  ) {
    errors.push({
      field: "requestId",
      message: "Response requestId must be a string",
      code: "INVALID_TYPE",
    });
  }

  if (
    "request_id" in apiResponse &&
    apiResponse.request_id !== undefined &&
    typeof apiResponse.request_id !== "string"
  ) {
    errors.push({
      field: "request_id",
      message: "Response request_id must be a string",
      code: "INVALID_TYPE",
    });
  }

  if (!("error" in apiResponse)) {
    errors.push({
      field: "error",
      message: "Response must contain error field",
      code: "MISSING_FIELD",
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

  if (apiResponse.data === null) {
    return {
      isValid: true,
      data: {
        success: apiResponse.success as boolean,
        status: apiResponse.status as number,
        message: apiResponse.message as string,
        data: null,
        error: (apiResponse.error ?? null) as ApiResponse<T>["error"],
        path:
          (apiResponse.path as string | undefined) ??
          (apiResponse.path as undefined),
        requestId:
          (apiResponse.requestId as string | undefined) ??
          (apiResponse.request_id as string | undefined),
        request_id: apiResponse.request_id as string | undefined,
        timestamp: apiResponse.timestamp as string,
      },
      errors: [],
    };
  }

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
      success: apiResponse.success as boolean,
      status: apiResponse.status as number,
      message: apiResponse.message as string,
      data: dataValidation.data!,
      error: (apiResponse.error ?? null) as ApiResponse<T>["error"],
      path: apiResponse.path as string | undefined,
      requestId:
        (apiResponse.requestId as string | undefined) ??
        (apiResponse.request_id as string | undefined),
      request_id: apiResponse.request_id as string | undefined,
      timestamp: apiResponse.timestamp as string,
    },
    errors: [],
  };
}

export function isMovie(data: unknown): data is Movie {
  const result = validateMovie(data);
  return result.isValid;
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}
