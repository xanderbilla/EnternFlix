import axios from "axios";
import {
  configureRequestInterceptor,
  configureResponseInterceptor,
} from "./axiosInterceptors";

const customApiUrl = process.env.NEXT_PUBLIC_CUSTOM_API_URL;

const customInstance = axios.create({
  baseURL: customApiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Configure interceptors using shared utilities
configureRequestInterceptor(customInstance, false);
configureResponseInterceptor(customInstance, "Custom API");

export default customInstance;
