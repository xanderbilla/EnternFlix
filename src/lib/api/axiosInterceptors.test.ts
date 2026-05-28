import { describe, it, expect, vi, beforeEach } from "vitest";
import axios, { AxiosError, type AxiosInstance } from "axios";

type InterceptorHandler<T> = {
  fulfilled: (value: T) => T | Promise<T>;
  rejected: (error: unknown) => unknown;
};

function responseHandlers(
  instance: AxiosInstance,
): InterceptorHandler<unknown>[] {
  return (
    instance.interceptors.response as unknown as {
      handlers: InterceptorHandler<unknown>[];
    }
  ).handlers;
}

function requestHandlers(
  instance: AxiosInstance,
): InterceptorHandler<unknown>[] {
  return (
    instance.interceptors.request as unknown as {
      handlers: InterceptorHandler<unknown>[];
    }
  ).handlers;
}

const { loggerMock } = vi.hoisted(() => ({
  loggerMock: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

vi.mock("@/lib/logger/logger", () => ({
  logger: loggerMock,
}));

import {
  configureRequestInterceptor,
  configureResponseInterceptor,
} from "./axiosInterceptors";

function makeError(status?: number, url = "/x"): AxiosError {
  const err = new Error("boom") as AxiosError;
  err.isAxiosError = true;
  err.config = { url } as AxiosError["config"];
  if (status !== undefined) {
    err.response = {
      status,
      statusText: "",
      data: {},
      headers: {},
      config: err.config!,
    };
  }
  return err;
}

describe("axios interceptors", () => {
  beforeEach(() => {
    Object.values(loggerMock).forEach((fn) => fn.mockClear());
  });

  describe("response interceptor", () => {
    it("passes through 2xx responses unchanged", async () => {
      const instance = axios.create();
      configureResponseInterceptor(instance, "TEST");
      const fulfilled = responseHandlers(instance)[0].fulfilled;

      const ok = { status: 200, data: { ok: true }, config: {} };
      expect(fulfilled(ok)).toBe(ok);
      expect(loggerMock.error).not.toHaveBeenCalled();
      expect(loggerMock.warn).not.toHaveBeenCalled();
    });

    it("logs an error for 5xx server errors", async () => {
      const instance = axios.create();
      configureResponseInterceptor(instance, "API");
      const rejected = responseHandlers(instance)[0].rejected;

      await expect(rejected(makeError(503, "/boom"))).rejects.toBeDefined();
      expect(loggerMock.error).toHaveBeenCalledWith(
        "[API] server error",
        503,
        "/boom",
        expect.any(String),
      );
    });

    it("logs a warning for 401/403 auth errors", async () => {
      const instance = axios.create();
      configureResponseInterceptor(instance, "API");
      const rejected = responseHandlers(instance)[0].rejected;

      await expect(rejected(makeError(401, "/me"))).rejects.toBeDefined();
      await expect(rejected(makeError(403, "/me"))).rejects.toBeDefined();
      expect(loggerMock.warn).toHaveBeenCalledTimes(2);
    });

    it("logs a warning for 429 rate limits", async () => {
      const instance = axios.create();
      configureResponseInterceptor(instance, "API");
      const rejected = responseHandlers(instance)[0].rejected;

      await expect(rejected(makeError(429, "/r"))).rejects.toBeDefined();
      expect(loggerMock.warn).toHaveBeenCalledWith("[API] rate limited", "/r");
    });

    it("does not log for 4xx client errors other than auth/rate-limit", async () => {
      const instance = axios.create();
      configureResponseInterceptor(instance, "API");
      const rejected = responseHandlers(instance)[0].rejected;

      await expect(rejected(makeError(404, "/x"))).rejects.toBeDefined();
      await expect(rejected(makeError(400, "/x"))).rejects.toBeDefined();
      expect(loggerMock.error).not.toHaveBeenCalled();
      expect(loggerMock.warn).not.toHaveBeenCalled();
    });

    it("re-throws the original error so React Query can decide retry policy", async () => {
      const instance = axios.create();
      configureResponseInterceptor(instance, "API");
      const rejected = responseHandlers(instance)[0].rejected;

      const original = makeError(500, "/x");
      await expect(rejected(original)).rejects.toBe(original);
    });
  });

  describe("request interceptor", () => {
    it("passes config through unchanged on success", () => {
      const instance = axios.create();
      configureRequestInterceptor(instance);
      const fulfilled = requestHandlers(instance)[0].fulfilled;

      const cfg = { url: "/x", headers: {} } as unknown;
      expect(fulfilled(cfg)).toBe(cfg);
    });

    it("logs and rethrows on request error", async () => {
      const instance = axios.create();
      configureRequestInterceptor(instance);
      const rejected = requestHandlers(instance)[0].rejected;

      const err = makeError();
      err.message = "network down";
      await expect(rejected(err)).rejects.toBe(err);
      expect(loggerMock.error).toHaveBeenCalledWith(
        "[axios] request error",
        "network down",
      );
    });
  });
});
