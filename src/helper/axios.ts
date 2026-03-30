import axios from "axios";
import {
  configureRequestInterceptor,
  configureResponseInterceptor,
} from "./axiosInterceptors";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Configure interceptors using shared utilities
configureRequestInterceptor(instance, true);
configureResponseInterceptor(instance, "TMDB API");

export default instance;
