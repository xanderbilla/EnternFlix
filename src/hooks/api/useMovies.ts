import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/helper/axios";
import requests from "@/helper/request";
import { Movie } from "@/types/movie";

interface ApiResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

// Generic hook for fetching movies/TV shows by endpoint
export const useMoviesByEndpoint = (
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Trending content hooks
export const useTrending = () =>
  useMovieData(["trending"], requests.fetchTrending);

export const useTrendingMovies = () =>
  useMovieData(["trending", "movies"], requests.fetchMoviesTrending);

export const useTrendingTV = () =>
  useMovieData(["trending", "tv"], requests.fetchTVTrending);

// Movie hooks
export const usePopularMovies = () =>
  useMovieData(["movies", "popular"], requests.fetchMoviesPopular);

export const useTopRatedMovies = () =>
  useMovieData(["movies", "topRated"], requests.fetchMoviesTopRated);

export const useUpcomingMovies = () =>
  useMovieData(["movies", "upcoming"], requests.fetchMoviesUpcoming);

export const useActionMovies = () =>
  useMovieData(["movies", "action"], requests.fetchMoviesAction);

export const useComedyMovies = () =>
  useMovieData(["movies", "comedy"], requests.fetchMoviesComedy);

export const useHorrorMovies = () =>
  useMovieData(["movies", "horror"], requests.fetchMoviesHorror);

export const useRomanceMovies = () =>
  useMovieData(["movies", "romance"], requests.fetchMoviesRomance);

export const useThrillerMovies = () =>
  useMovieData(["movies", "thriller"], requests.fetchMoviesThriller);

// TV Show hooks
export const usePopularTV = () =>
  useMovieData(["tv", "popular"], requests.fetchTVPopular);

export const useTopRatedTV = () =>
  useMovieData(["tv", "topRated"], requests.fetchTVTopRated);

export const useActionTV = () =>
  useMovieData(["tv", "action"], requests.fetchTVAction);

export const useComedyTV = () =>
  useMovieData(["tv", "comedy"], requests.fetchTVComedy);

export const useDramaTV = () =>
  useMovieData(["tv", "drama"], requests.fetchTVDrama);

export const useCrimeTV = () =>
  useMovieData(["tv", "crime"], requests.fetchTVCrime);

export const useNetflixOriginals = () =>
  useMovieData(["tv", "netflix"], requests.fetchNetflixOriginals);

// Anime hooks
export const useTrendingAnime = () =>
  useMovieData(["anime", "trending"], requests.fetchAnimeTrending);

export const usePopularAnime = () =>
  useMovieData(["anime", "popular"], requests.fetchAnimePopular);

export const useTopRatedAnime = () =>
  useMovieData(["anime", "topRated"], requests.fetchAnimeTopRated);

export const useActionAnime = () =>
  useMovieData(["anime", "action"], requests.fetchAnimeAction);

export const useAnimeTV = () =>
  useMovieData(["anime", "tv"], requests.fetchAnimeTV);

export const useAnimeMovies = () =>
  useMovieData(["anime", "movies"], requests.fetchAnimeMovies);

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
    enabled: !!query && query.length > 2, // Only search if query is longer than 2 characters
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Random content hook for banners
export const useRandomContent = () => {
  return useQuery<Movie, Error>({
    queryKey: ["random", "content"],
    queryFn: async () => {
      // Define content sources inside the hook
      const sources = [
        requests.fetchMoviesPopular,
        requests.fetchTVPopular,
        requests.fetchAnimePopular,
        requests.fetchMoviesTrending,
        requests.fetchTVTrending,
        requests.fetchMoviesTopRated,
        requests.fetchTVTopRated,
      ];

      // Randomly select a content source
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
    staleTime: 10 * 60 * 1000, // 10 minutes for random content
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
};

// Category-specific random content for banners
export const useCategoryContent = (category: string) => {
  return useQuery<Movie, Error>({
    queryKey: ["category", "content", category],
    queryFn: async () => {
      let fetchUrl = requests.fetchTrending; // default

      switch (category) {
        case "tv-shows":
          fetchUrl = requests.fetchTVPopular;
          break;
        case "movies":
          fetchUrl = requests.fetchMoviesPopular;
          break;
        case "anime":
          fetchUrl = requests.fetchAnimePopular;
          break;
        case "trending":
          fetchUrl = requests.fetchTrending;
          break;
        case "favorites":
          fetchUrl = requests.fetchMoviesTopRated;
          break;
      }

      const response = await axios.get(fetchUrl);
      const results: Movie[] = response.data.results;

      if (results.length > 0) {
        const randomIndex = Math.floor(Math.random() * results.length);
        return results[randomIndex];
      }
      throw new Error("No content available");
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
};
