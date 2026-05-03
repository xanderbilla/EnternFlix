/**
 * React Query retry policy.
 *
 * Centralised so it can be unit-tested independently of the provider:
 *  - 4xx responses are never retried (client errors are deterministic).
 *  - All other failures (network errors, 5xx, timeouts) retry up to MAX_RETRIES
 *    with exponential back-off capped at MAX_BACKOFF_MS.
 *
 * Retries are owned exclusively by React Query — Axios does not retry.
 */

export const MAX_RETRIES = 2;
export const MAX_BACKOFF_MS = 8000;

type MaybeAxiosLikeError = {
  response?: { status?: number };
};

export function shouldRetryQuery(
  failureCount: number,
  error: unknown,
): boolean {
  const status = (error as MaybeAxiosLikeError | null | undefined)?.response
    ?.status;
  if (typeof status === "number" && status >= 400 && status < 500) {
    return false;
  }
  return failureCount < MAX_RETRIES;
}

export function retryDelay(attemptIndex: number): number {
  return Math.min(1000 * 2 ** attemptIndex, MAX_BACKOFF_MS);
}
