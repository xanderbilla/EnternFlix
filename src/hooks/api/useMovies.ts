import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/lib/api/axios";
import customAxios from "@/lib/api/customAxios";
import requests from "@/lib/api/request";
import { Movie, MoviesResponse, MovieResponse } from "@/types/movie";
import type { PaginatedResponse } from "@/types/api";
import { queryKeys } from "@/lib/query/queryKeys";

function toPaginated<T>(items: T[]): PaginatedResponse<T> {
  return {
    results: items,
    page: 1,
    total_pages: 1,
    total_results: items.length,
  };
}

export const useCustomContent = (type: string = "all") =>
  useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: queryKeys.customContent(type),
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchAllContent(type),
      );
      return toPaginated(data.data);
    },
  });

export const useCustomMovies = () => useCustomContent("movie");

export const useCustomMovie = (id: string, enabled: boolean = true) =>
  useQuery<Movie, Error>({
    queryKey: queryKeys.customMovie(id),
    queryFn: async () => {
      const { data } = await customAxios.get<MovieResponse>(
        requests.fetchMovieById(id),
      );
      return data.data;
    },
    enabled: enabled && !!id,
  });

export const useTrending = () =>
  useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: queryKeys.trending,
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchAllContent("all"),
      );
      return toPaginated(data.data);
    },
  });

export const useSearch = (query: string) =>
  useInfiniteQuery<PaginatedResponse<Movie>, Error>({
    queryKey: queryKeys.search(query),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${requests.searchRequest}${encodeURIComponent(query)}&page=${pageParam}`,
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: !!query && query.length > 2,
  });

export const useRandomContent = () =>
  useQuery<Movie, Error>({
    queryKey: queryKeys.randomContent,
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchAllContent("all"),
      );
      const movies = data.data;
      if (movies.length === 0) throw new Error("No content available");
      return movies[Math.floor(Math.random() * movies.length)];
    },
  });

export const useBanner = (type: string = "all") =>
  useQuery<Movie, Error>({
    queryKey: queryKeys.banner(type),
    queryFn: async () => {
      const { data } = await customAxios.get<MovieResponse>(
        requests.fetchBanner(type),
      );
      return data.data;
    },
  });

export const useDiscoverByAttribute = (
  attributeId: string,
  content: string = "all",
  enabled: boolean = true,
) =>
  useQuery<Movie[], Error>({
    queryKey: queryKeys.discoverByAttribute(attributeId, content),
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchDiscoverByAttribute(attributeId, content),
      );
      return data.data;
    },
    enabled: enabled && !!attributeId,
  });

export const useDiscover = (type: string = "latest", content: string = "all") =>
  useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: queryKeys.discover(type, content),
    queryFn: async () => {
      const { data } = await customAxios.get<MoviesResponse>(
        requests.fetchDiscover(type, content),
      );
      return toPaginated(data.data);
    },
  });
