export const CACHE_TIMES = {
  STALE_TIME: 15 * 60 * 1000,
  GC_TIME: 60 * 60 * 1000,
} as const;

export const STALE_TIMES = {
  STATIC: Infinity,
  CONTENT: 10 * 60 * 1000,
  REALTIME: 0,
} as const;

export const TEXT_LIMITS = {
  TITLE_MAX: 25,
  DESCRIPTION_MAX: 200,
  SHORT_DESCRIPTION: 100,
  SEARCH_QUERY_MAX: 80,
} as const;

export const PROXY_CACHE = {
  MAX_AGE_S: 60,
  STALE_WHILE_REVALIDATE_S: 300,
  UPSTREAM_TIMEOUT_MS: 8_000,
} as const;

export const HTTP = {
  /** Emit a warning log when a request exceeds this duration. */
  SLOW_REQUEST_THRESHOLD_MS: 500,
} as const;

export const UI = {
  /** Scroll distance (px) at which the navbar transitions to solid background. */
  NAVBAR_SCROLL_OFFSET_PX: 66,
} as const;
