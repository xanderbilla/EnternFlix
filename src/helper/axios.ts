import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add timestamp to prevent caching issues
    if (config.params) {
      config.params._t = Date.now();
    } else {
      config.params = { _t: Date.now() };
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

// Response interceptor
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
            console.error("API Authentication failed. Check your API key.");
          }
          break;
        case 404:
          // Not found - silently handle
          break;
        case 429:
          // Rate limit - could implement exponential backoff here
          if (process.env.NODE_ENV === "development") {
            console.warn("Rate limit exceeded. Slow down requests.");
          }
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors - could retry with exponential backoff
          if (process.env.NODE_ENV === "development") {
            console.error("Server error:", status);
          }
          break;
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
