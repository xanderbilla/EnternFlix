import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

/**
 * Configure request interceptor for axios instance
 * Adds timestamp to prevent caching issues
 * @param instance - Axios instance to configure
 * @param addTimestamp - Whether to add timestamp to requests (default: true)
 */
export function configureRequestInterceptor(
  instance: AxiosInstance,
  addTimestamp: boolean = true,
): void {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add timestamp to prevent caching issues
      if (addTimestamp) {
        if (config.params) {
          config.params._t = Date.now();
        } else {
          config.params = { _t: Date.now() };
        }
      }
      return config;
    },
    (error: AxiosError) => {
      if (process.env.NODE_ENV === "development") {
        console.error("Request error:", error);
      }
      return Promise.reject(error);
    },
  );
}

/**
 * Configure response interceptor for axios instance
 * Handles retry logic for network errors and specific error codes
 * @param instance - Axios instance to configure
 * @param apiName - Name of the API for logging purposes (default: "API")
 */
export function configureResponseInterceptor(
  instance: AxiosInstance,
  apiName: string = "API",
): void {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Retry logic for network errors
      if (
        error.code === "ECONNABORTED" ||
        error.message === "Network Error" ||
        !error.response
      ) {
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          // Wait 1 second before retry
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return instance(originalRequest);
        }
      }

      // Handle specific error codes
      if (error.response) {
        const status = error.response.status;

        switch (status) {
          case 401:
            // Unauthorized - API key issues
            if (process.env.NODE_ENV === "development") {
              console.error(
                `${apiName} Authentication failed. Check your API key.`,
              );
            }
            break;
          case 404:
            // Not found - silently handle
            break;
          case 429:
            // Rate limit - could implement exponential backoff here
            if (process.env.NODE_ENV === "development") {
              console.warn(
                `${apiName} Rate limit exceeded. Slow down requests.`,
              );
            }
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            // Server errors - could retry with exponential backoff
            if (process.env.NODE_ENV === "development") {
              console.error(`${apiName} Server error:`, status);
            }
            break;
        }
      }

      return Promise.reject(error);
    },
  );
}
