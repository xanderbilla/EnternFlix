import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { logger } from "@/lib/logger/logger";
import { HTTP } from "@/constants/common";

/** Extend config metadata so we can attach a request start timestamp. */
interface TimedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _startMs?: number;
}

export function configureRequestInterceptor(instance: AxiosInstance): void {
  instance.interceptors.request.use(
    (config: TimedAxiosRequestConfig) => {
      config._startMs = Date.now();
      return config;
    },
    (error: AxiosError) => {
      logger.error("[axios] request error", error.message);
      return Promise.reject(error);
    },
  );
}

export function configureResponseInterceptor(
  instance: AxiosInstance,
  apiName: string = "API",
): void {
  instance.interceptors.response.use(
    (response) => {
      const cfg = response.config as TimedAxiosRequestConfig;
      if (cfg._startMs !== undefined) {
        const elapsed = Date.now() - cfg._startMs;
        if (elapsed > HTTP.SLOW_REQUEST_THRESHOLD_MS) {
          logger.warn(
            `[${apiName}] slow request ${elapsed}ms`,
            cfg.method?.toUpperCase(),
            cfg.url,
          );
        }
      }
      return response;
    },
    (error: AxiosError) => {
      const cfg = error.config as TimedAxiosRequestConfig | undefined;
      const elapsed =
        cfg?._startMs !== undefined ? Date.now() - cfg._startMs : null;
      const status = error.response?.status;
      if (status && status >= 500) {
        logger.error(
          `[${apiName}] server error`,
          status,
          cfg?.url,
          elapsed !== null ? `${elapsed}ms` : "",
        );
      } else if (status === 401 || status === 403) {
        logger.warn(`[${apiName}] auth error`, status, cfg?.url);
      } else if (status === 429) {
        logger.warn(`[${apiName}] rate limited`, cfg?.url);
      } else if (!error.response) {
        logger.error(`[${apiName}] network error`, cfg?.url);
      }
      return Promise.reject(error);
    },
  );
}
