import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const customApiUrl =
  process.env.NEXT_PUBLIC_CUSTOM_API_URL || "http://localhost:8080/v1";

const customInstance = axios.create({
  baseURL: customApiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
customInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    if (process.env.NODE_ENV === "development") {
      console.error("Custom API Request error:", error);
    }
    return Promise.reject(error);
  },
);

// Response interceptor
customInstance.interceptors.response.use(
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return customInstance(originalRequest);
      }
    }

    if (error.response && process.env.NODE_ENV === "development") {
      console.error(
        "Custom API error:",
        error.response.status,
        error.response.data,
      );
    }

    return Promise.reject(error);
  },
);

export default customInstance;
