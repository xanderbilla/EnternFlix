export const MAX_RETRIES = 2;
export const MAX_BACKOFF_MS = 4000;

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
