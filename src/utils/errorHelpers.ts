import type { ValidationError, AppError } from "@/types/validation";

/**
 * Create a standardized error object
 * @param message - Human-readable error message
 * @param code - Machine-readable error code
 * @param context - Additional context information for debugging
 * @returns Structured error object with timestamp
 */
export function createError(
  message: string,
  code: string,
  context?: Record<string, unknown>,
): AppError {
  return {
    message,
    code,
    context,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Handle API errors with logging and context
 * Logs the error with context information for debugging
 * @param error - Error object from API call
 * @param context - Context string describing where the error occurred
 */
export function handleApiError(error: unknown, context: string): void {
  let appError: AppError;

  if (error instanceof Error) {
    appError = createError(error.message, "API_ERROR", {
      context,
      originalError: error.name,
    });
  } else if (typeof error === "object" && error !== null) {
    const errorObj = error as Record<string, unknown>;
    appError = createError(
      String(errorObj.message || "Unknown API error"),
      "API_ERROR",
      {
        context,
        ...errorObj,
      },
    );
  } else {
    appError = createError("Unknown API error", "API_ERROR", {
      context,
      error: String(error),
    });
  }

  logError(appError);
}

/**
 * Format error for user-friendly display
 * Removes technical details and stack traces, returns clean message
 * @param error - Error object to format
 * @returns User-friendly error message without technical details
 */
export function formatErrorMessage(error: unknown): string {
  // Handle ValidationError
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "code" in error
  ) {
    const validationError = error as ValidationError;
    return validationError.message;
  }

  // Handle AppError
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  ) {
    const appError = error as AppError;
    return appError.message;
  }

  // Handle standard Error
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  // Fallback for unknown error types
  return "An unexpected error occurred. Please try again.";
}

/**
 * Log error with context information
 * In development, logs to console with full details
 * In production, would send to error tracking service
 * @param error - AppError object to log
 */
export function logError(error: AppError): void {
  // In development, log to console
  if (process.env.NODE_ENV === "development") {
    console.error("[Error]", {
      message: error.message,
      code: error.code,
      timestamp: error.timestamp,
      context: error.context,
    });
  }

  // In production, this would send to error tracking service
  // Example: Sentry.captureException(error);
}
