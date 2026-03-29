import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/helper/axios";
import customAxios from "@/helper/customAxios";
import requests from "@/helper/request";
import {
  Movie,
  CustomMoviesResponse,
  CustomMovieResponse,
  convertCustomMovieToMovie,
} from "@/types/movie";
import { queryKeys } from "@/constants/queryKeys";

interface ApiResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

// Generic hook for fetching movies/TV shows
const useMovieData = (
  queryKey: string[],
  endpoint: string,
  enabled: boolean = true,
) => {
  return useQuery<ApiResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await axios.get(endpoint);
      return response.data;
    },
    enabled,
  });
};

// Custom API hooks
export const useCustomMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ["custom", "movies"],
    queryFn: async () => {
      const response = await customAxios.get<CustomMoviesResponse>(
        requests.fetchAllMovies,
      );
      // Convert custom movies to Movie format
      return response.data.data.map(convertCustomMovieToMovie);
    },
    retry: 2,
  });
};

export const useCustomMovie = (id: string, enabled: boolean = true) => {
  return useQuery<Movie, Error>({
    queryKey: ["custom", "movie", id],
    queryFn: async () => {
      const response = await customAxios.get<CustomMovieResponse>(
        requests.fetchMovieById(id),
      );
      return convertCustomMovieToMovie(response.data.data);
    },
    enabled: enabled && !!id,
    retry: 2,
  });
};

// Use custom API for trending (homepage)
export const useTrending = () => {
  return useQuery<ApiResponse, Error>({
    queryKey: [...queryKeys.trending],
    queryFn: async () => {
      const response = await customAxios.get<CustomMoviesResponse>(
        requests.fetchAllMovies,
      );
      const movies = response.data.data.map(convertCustomMovieToMovie);
      // Format as TMDB-style response
      return {
        results: movies,
        page: 1,
        total_pages: 1,
        total_results: movies.length,
      };
    },
    retry: 2,
  });
};

// Search hook with infinite scroll support (keep using TMDB)
export const useSearch = (query: string) => {
  return useInfiniteQuery<ApiResponse, Error>({
    queryKey: ["search", query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${requests.searchRequest}${encodeURIComponent(query)}&page=${pageParam}`,
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !!query && query.length > 2,
  });
};

// Random content hook for banners (use custom API)
export const useRandomContent = () => {
  return useQuery<Movie, Error>({
    queryKey: ["random", "content"],
    queryFn: async () => {
      const response = await customAxios.get<CustomMoviesResponse>(
        requests.fetchAllMovies,
      );
      const movies = response.data.data.map(convertCustomMovieToMovie);

      if (movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        return movies[randomIndex];
      }
      throw new Error("No content available");
    },
    retry: 2,
  });
};
