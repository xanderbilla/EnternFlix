export const CACHE_TIMES = {
  STALE_TIME: 15 * 60 * 1000,
  GC_TIME: 60 * 60 * 1000, // 1 hour
} as const;

export const TEXT_LIMITS = {
  TITLE_MAX: 25,
  DESCRIPTION_MAX: 200,
  SHORT_DESCRIPTION: 100,
} as const;

export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;
