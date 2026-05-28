import type { PaginatedResponse } from "@/types/api";

/**
 * Wraps a flat item array in the PaginatedResponse envelope.
 * Used by hooks and server prefetch functions that receive non-paginated
 * API responses but need to match the paginated query cache shape.
 */
export function toPaginated<T>(items: T[]): PaginatedResponse<T> {
  return {
    results: items,
    page: 1,
    total_pages: 1,
    total_results: items.length,
  };
}
