import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/helper/axios";
import requests from "@/helper/request";
import { Movie } from "@/types/movie";
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

// Only keep hooks that are actually used
export const useTrending = () =>
  useMovieData([...queryKeys.trending], requests.fetchTrending);

// Search hook with infinite scroll support
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

// Random content hook for banners
export const useRandomContent = () => {
  return useQuery<Movie, Error>({
    queryKey: ["random", "content"],
    queryFn: async () => {
      const sources = [
        requests.fetchMoviesPopular,
        requests.fetchTVPopular,
        requests.fetchAnimePopular,
        requests.fetchMoviesTrending,
        requests.fetchTVTrending,
        requests.fetchMoviesTopRated,
        requests.fetchTVTopRated,
      ];

      const randomSourceIndex = Math.floor(Math.random() * sources.length);
      const selectedSource = sources[randomSourceIndex];

      const response = await axios.get(selectedSource);
      const results: Movie[] = response.data.results;

      if (results.length > 0) {
        const randomIndex = Math.floor(Math.random() * results.length);
        return results[randomIndex];
      }
      throw new Error("No content available");
    },
    retry: 2,
  });
};
