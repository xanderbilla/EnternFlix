import axios from "axios";
import { config } from "@/lib/env/env";
import {
  configureRequestInterceptor,
  configureResponseInterceptor,
} from "./axiosInterceptors";

const instance = axios.create({
  baseURL: config.tmdb.baseUrl,
  timeout: config.http.timeoutMs,
  headers: { "Content-Type": "application/json" },
});

configureRequestInterceptor(instance);
configureResponseInterceptor(instance, "TMDB");

export default instance;
