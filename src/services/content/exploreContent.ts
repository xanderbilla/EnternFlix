import customAxios from "@/lib/api/customAxios";
import requests from "@/lib/api/request";
import { Movie, MoviesResponse } from "@/types/movie";

export interface DiscoverHookParams {
  type: string;
  content: string;
}

export const DISCOVER_HOOK_PARAMS: Record<string, DiscoverHookParams> = {
  trending: { type: "recent", content: "all" },
  latestRelease: { type: "latest", content: "all" },
  recentlyAdded: { type: "recent", content: "movie" },
  allTvShows: { type: "recent", content: "tv" },
  recentlyAddedTvShows: { type: "recent", content: "tv" },
  latestMovies: { type: "latest", content: "movie" },
  latestTvShows: { type: "latest", content: "tv" },
  popularMovies: { type: "popular", content: "movie" },
  popularTvShows: { type: "popular", content: "tv" },
  trendingMovies: { type: "trending", content: "movie" },
  trendingTvShows: { type: "trending", content: "tv" },
};

const CONTENT_HOOK_TYPES: Record<string, string> = {
  allMovies: "movie",
  allContent: "all",
};

export function getDiscoverNavigation(hookName: string):
  | {
      pagePath: string;
      queryType?: "movie" | "tv";
    }
  | undefined {
  const discoverParams = DISCOVER_HOOK_PARAMS[hookName];
  if (!discoverParams) {
    return undefined;
  }

  return {
    pagePath:
      discoverParams.type === "latest" ? "/browse/latest" : "/browse/recent",
    queryType:
      discoverParams.content === "movie" || discoverParams.content === "tv"
        ? discoverParams.content
        : undefined,
  };
}

export async function fetchFreshExploreMovies(
  hookName: string,
  fallbackMovies: Movie[],
): Promise<Movie[]> {
  const discoverParams = DISCOVER_HOOK_PARAMS[hookName];
  if (discoverParams) {
    const { data } = await customAxios.get<MoviesResponse>(
      requests.fetchDiscover(discoverParams.type, discoverParams.content),
    );
    return data.data?.items ?? [];
  }

  const contentType = CONTENT_HOOK_TYPES[hookName];
  if (contentType) {
    const { data } = await customAxios.get<MoviesResponse>(
      requests.fetchAllContent(contentType),
    );
    return data.data?.items ?? [];
  }

  return fallbackMovies;
}
