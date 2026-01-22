import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/helper/axios";
import requests from "@/helper/request";
import { Movie } from "@/types/movie";
import { queryKeys } from "@/constants/queryKeys";
import { CACHE_TIMES } from "@/constants/common";

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

// Export for backward compatibility
export const useMoviesByEndpoint = useMovieData;

// Trending content hooks
export const useTrending = () =>
  useMovieData([...queryKeys.trending], requests.fetchTrending);

export const useTrendingMovies = () =>
  useMovieData([...queryKeys.trendingMovies], requests.fetchMoviesTrending);

export const useTrendingTV = () =>
  useMovieData([...queryKeys.trendingTV], requests.fetchTVTrending);

// Movie hooks
export const usePopularMovies = () =>
  useMovieData([...queryKeys.movies.popular], requests.fetchMoviesPopular);

export const useTopRatedMovies = () =>
  useMovieData([...queryKeys.movies.topRated], requests.fetchMoviesTopRated);

export const useUpcomingMovies = () =>
  useMovieData([...queryKeys.movies.upcoming], requests.fetchMoviesUpcoming);

export const useActionMovies = () =>
  useMovieData([...queryKeys.movies.action], requests.fetchMoviesAction);

export const useComedyMovies = () =>
  useMovieData([...queryKeys.movies.comedy], requests.fetchMoviesComedy);

export const useHorrorMovies = () =>
  useMovieData([...queryKeys.movies.horror], requests.fetchMoviesHorror);

export const useRomanceMovies = () =>
  useMovieData([...queryKeys.movies.romance], requests.fetchMoviesRomance);

export const useThrillerMovies = () =>
  useMovieData([...queryKeys.movies.thriller], requests.fetchMoviesThriller);

// TV Show hooks
export const usePopularTV = () =>
  useMovieData([...queryKeys.tv.popular], requests.fetchTVPopular);

export const useTopRatedTV = () =>
  useMovieData([...queryKeys.tv.topRated], requests.fetchTVTopRated);

export const useActionTV = () =>
  useMovieData([...queryKeys.tv.action], requests.fetchTVAction);

export const useComedyTV = () =>
  useMovieData([...queryKeys.tv.comedy], requests.fetchTVComedy);

export const useDramaTV = () =>
  useMovieData([...queryKeys.tv.drama], requests.fetchTVDrama);

export const useCrimeTV = () =>
  useMovieData([...queryKeys.tv.crime], requests.fetchTVCrime);

export const useNetflixOriginals = () =>
  useMovieData([...queryKeys.netflixOriginals], requests.fetchNetflixOriginals);

// Anime hooks
export const useTrendingAnime = () =>
  useMovieData([...queryKeys.anime.trending], requests.fetchAnimeTrending);

export const usePopularAnime = () =>
  useMovieData([...queryKeys.anime.popular], requests.fetchAnimePopular);

export const useTopRatedAnime = () =>
  useMovieData([...queryKeys.anime.topRated], requests.fetchAnimeTopRated);

export const useActionAnime = () =>
  useMovieData([...queryKeys.anime.action], requests.fetchAnimeAction);

export const useAnimeTV = () =>
  useMovieData([...queryKeys.anime.tv], requests.fetchAnimeTV);

export const useAnimeMovies = () =>
  useMovieData([...queryKeys.anime.movies], requests.fetchAnimeMovies);

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
    retry: 2,
  });
};
