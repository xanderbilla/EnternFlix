import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/helper/axios";
import customAxios from "@/helper/customAxios";
import requests from "@/helper/request";
import { Movie, MoviesResponse, MovieResponse } from "@/types/movie";
import type { PaginatedResponse } from "@/types/api";
import { queryKeys } from "@/constants/queryKeys";

// Custom API hooks
export const useCustomMovies = () => {
  return useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: ["custom", "movies"],
    queryFn: async () => {
      const response = await customAxios.get<MoviesResponse>(
        requests.fetchAllMovies,
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

// Use custom API for trending (homepage)
export const useTrending = () => {
  return useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: [...queryKeys.trending],
    queryFn: async () => {
      const response = await customAxios.get<MoviesResponse>(
        requests.fetchAllMovies,
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
        requests.fetchAllMovies,
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

// Banner hook for home page
export const useBanner = () => {
  return useQuery<Movie, Error>({
    queryKey: ["banner"],
    queryFn: async () => {
      const response = await customAxios.get<MovieResponse>(
        requests.fetchBanner,
      );
      return response.data.data;
    },
    retry: 2,
  });
};

// Banner hook for specific page (e.g., MOVIE, TV)
export const useBannerByPage = (page: string) => {
  return useQuery<Movie, Error>({
    queryKey: ["banner", page],
    queryFn: async () => {
      const response = await customAxios.get<MovieResponse>(
        requests.fetchBannerByPage(page),
      );
      return response.data.data;
    },
    enabled: !!page,
    retry: 2,
  });
};

// Discover by attribute hook (tags, genres, categories, specialties, mood tags)
export const useDiscoverByAttribute = (
  attributeId: string,
  enabled: boolean = true,
) => {
  return useQuery<Movie[], Error>({
    queryKey: ["discover", "attribute", attributeId],
    queryFn: async () => {
      const response = await customAxios.get<MoviesResponse>(
        requests.fetchDiscoverByAttribute(attributeId),
      );
      return response.data.data;
    },
    enabled: enabled && !!attributeId,
    retry: 2,
  });
};
