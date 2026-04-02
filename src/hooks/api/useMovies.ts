import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/helper/axios";
import customAxios from "@/helper/customAxios";
import requests from "@/helper/request";
import { Movie, MoviesResponse, MovieResponse } from "@/types/movie";
import type { PaginatedResponse } from "@/types/api";
import { queryKeys } from "@/constants/queryKeys";

// Custom API hooks - fetch content by type (all, movie, tv)
export const useCustomContent = (type: string = "all") => {
  return useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: ["custom", "content", type],
    queryFn: async () => {
      const response = await customAxios.get<MoviesResponse>(
        requests.fetchAllContent(type),
      );
      const movies = response.data.data;
      // Format as TMDB-style response for compatibility
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

// Backward compatibility - useCustomMovies now uses type="movie"
export const useCustomMovies = () => {
  return useCustomContent("movie");
};

export const useCustomMovie = (id: string, enabled: boolean = true) => {
  return useQuery<Movie, Error>({
    queryKey: ["custom", "movie", id],
    queryFn: async () => {
      const response = await customAxios.get<MovieResponse>(
        requests.fetchMovieById(id),
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
    retry: 2,
  });
};

// Use custom API for trending (homepage) - fetch all content types
export const useTrending = () => {
  return useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: [...queryKeys.trending],
    queryFn: async () => {
      const response = await customAxios.get<MoviesResponse>(
        requests.fetchAllContent("all"),
      );
      const movies = response.data.data;
      // Format as TMDB-style response for compatibility
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
  return useInfiniteQuery<PaginatedResponse<Movie>, Error>({
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
      const response = await customAxios.get<MoviesResponse>(
        requests.fetchAllContent("all"),
      );
      const movies = response.data.data;

      if (movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        return movies[randomIndex];
      }
      throw new Error("No content available");
    },
    retry: 2,
  });
};

// Banner hook for home page (all content types)
export const useBanner = (type: string = "all") => {
  return useQuery<Movie, Error>({
    queryKey: ["banner", type],
    queryFn: async () => {
      const response = await customAxios.get<MovieResponse>(
        requests.fetchBanner(type),
      );
      return response.data.data;
    },
    retry: 2,
  });
};

// Discover by attribute hook (tags, genres, categories, specialties, mood tags)
export const useDiscoverByAttribute = (
  attributeId: string,
  content: string = "all",
  enabled: boolean = true,
) => {
  return useQuery<Movie[], Error>({
    queryKey: ["discover", "attribute", attributeId, content],
    queryFn: async () => {
      const response = await customAxios.get<MoviesResponse>(
        requests.fetchDiscoverByAttribute(attributeId, content),
      );
      return response.data.data;
    },
    enabled: enabled && !!attributeId,
    retry: 2,
  });
};

// Discover content hook (latest, popular, trending)
export const useDiscover = (
  type: string = "latest",
  content: string = "all",
) => {
  return useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: ["discover", type, content],
    queryFn: async () => {
      const response = await customAxios.get<MoviesResponse>(
        requests.fetchDiscover(type, content),
      );
      const movies = response.data.data;
      // Format as TMDB-style response for compatibility
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
