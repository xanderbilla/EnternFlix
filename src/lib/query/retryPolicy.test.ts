import { describe, it, expect } from "vitest";
import {
  shouldRetryQuery,
  retryDelay,
  MAX_RETRIES,
  MAX_BACKOFF_MS,
} from "./retryPolicy";

function err(status?: number) {
  return status === undefined ? new Error("network") : { response: { status } };
}

describe("shouldRetryQuery", () => {
  it("never retries on 4xx client errors", () => {
    for (const s of [400, 401, 403, 404, 422, 429, 499]) {
      expect(shouldRetryQuery(0, err(s))).toBe(false);
      expect(shouldRetryQuery(1, err(s))).toBe(false);
    }
  });

  it("retries on 5xx server errors up to MAX_RETRIES", () => {
    expect(shouldRetryQuery(0, err(500))).toBe(true);
    expect(shouldRetryQuery(1, err(503))).toBe(true);
    expect(shouldRetryQuery(MAX_RETRIES, err(500))).toBe(false);
  });

  it("retries on network/unknown errors (no response.status)", () => {
    expect(shouldRetryQuery(0, err())).toBe(true);
    expect(shouldRetryQuery(MAX_RETRIES - 1, err())).toBe(true);
    expect(shouldRetryQuery(MAX_RETRIES, err())).toBe(false);
  });

  it("handles null/undefined errors safely", () => {
    expect(shouldRetryQuery(0, null)).toBe(true);
    expect(shouldRetryQuery(0, undefined)).toBe(true);
    expect(shouldRetryQuery(MAX_RETRIES, null)).toBe(false);
  });
});

describe("retryDelay", () => {
  it("uses exponential back-off", () => {
    expect(retryDelay(0)).toBe(1000);
    expect(retryDelay(1)).toBe(2000);
    expect(retryDelay(2)).toBe(4000);
  });

  it("caps at MAX_BACKOFF_MS", () => {
    expect(retryDelay(10)).toBe(MAX_BACKOFF_MS);
    expect(retryDelay(20)).toBe(MAX_BACKOFF_MS);
  });
});
