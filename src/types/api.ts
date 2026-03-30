/**
 * API Response Type Definitions
 *
 * This module contains all API-related type definitions for standardized
 * API communication throughout the application.
 */

/**
 * Standard API response wrapper
 * @template T - The type of data in the response payload
 */
export interface ApiResponse<T> {
  /** HTTP status code */
  status: number;
  /** Response message describing the result */
  message: string;
  /** Response data payload */
  data: T;
}

/**
 * Paginated API response for list endpoints
 * @template T - The type of items in the results array
 */
export interface PaginatedResponse<T> {
  /** Array of result items */
  results: T[];
  /** Current page number */
  page: number;
  /** Total number of pages available */
  total_pages: number;
  /** Total number of results across all pages */
  total_results: number;
}

/**
 * API error response structure
 */
export interface ApiError {
  /** Error message describing what went wrong */
  message: string;
  /** Machine-readable error code */
  code: string;
  /** HTTP status code */
  status: number;
  /** API endpoint that generated the error */
  endpoint: string;
  /** Additional error context */
  context?: Record<string, unknown>;
  /** Timestamp when the error occurred */
  timestamp: string;
}
