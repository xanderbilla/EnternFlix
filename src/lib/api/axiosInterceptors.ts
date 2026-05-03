import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { logger } from "@/lib/logger/logger";

export function configureRequestInterceptor(instance: AxiosInstance): void {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
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
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;
      if (status && status >= 500) {
        logger.error(`[${apiName}] server error`, status, error.config?.url);
      } else if (status === 401 || status === 403) {
        logger.warn(`[${apiName}] auth error`, status, error.config?.url);
      } else if (status === 429) {
        logger.warn(`[${apiName}] rate limited`, error.config?.url);
      }
      return Promise.reject(error);
    },
  );
}
