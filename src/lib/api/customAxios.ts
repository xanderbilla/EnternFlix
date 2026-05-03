import axios from "axios";
import { config } from "@/lib/env/env";
import {
  configureRequestInterceptor,
  configureResponseInterceptor,
} from "./axiosInterceptors";

const customInstance = axios.create({
  baseURL: config.customApi.baseUrl,
  timeout: config.http.timeoutMs,
  headers: { "Content-Type": "application/json" },
});

configureRequestInterceptor(customInstance);
configureResponseInterceptor(customInstance, "CustomAPI");

export default customInstance;
