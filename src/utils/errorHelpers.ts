import type { ValidationError, AppError } from "@/types/validation";
import { logger } from "@/lib/logger/logger";

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

export function handleApiError(error: unknown, context: string): AppError {
  let appError: AppError;

  if (error instanceof Error) {
    appError = createError(error.message, "API_ERROR", {
      context,
      originalError: error.name,
    });
  } else if (typeof error === "object" && error !== null) {
    const errorObj = error as Record<string, unknown>;
    appError = createError(
      String(errorObj.message ?? "Unknown API error"),
      "API_ERROR",
      { context, ...errorObj },
    );
  } else {
    appError = createError("Unknown API error", "API_ERROR", {
      context,
      error: String(error),
    });
  }

  logError(appError);
  return appError;
}

export function formatErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "code" in error
  ) {
    const validationError = error as ValidationError;
    return validationError.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  ) {
    return (error as AppError).message;
  }

  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  return "An unexpected error occurred. Please try again.";
}

export function isNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes("network") ||
    msg.includes("fetch") ||
    msg.includes("timeout") ||
    msg.includes("econnaborted")
  );
}

export function getUserFriendlyErrorMessage(error: unknown): string {
  if (isNetworkError(error)) {
    return "Network error. Please check your connection and try again.";
  }
  return formatErrorMessage(error);
}

export function logError(error: AppError): void {
  logger.error("[Error]", {
    message: error.message,
    code: error.code,
    timestamp: error.timestamp,
    context: error.context,
  });
}
