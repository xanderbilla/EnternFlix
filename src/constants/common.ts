/**
 * Common application constants
 */

// Cache times for React Query
export const CACHE_TIMES = {
  STALE_TIME: 15 * 60 * 1000, // 15 minutes
  GC_TIME: 60 * 60 * 1000, // 1 hour
} as const;

// Text truncation lengths
export const TEXT_LIMITS = {
  TITLE_MAX: 25,
  DESCRIPTION_MAX: 200,
  SHORT_DESCRIPTION: 100,
} as const;

// Animation durations (ms)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;
