/* eslint-disable react-hooks/rules-of-hooks -- map of hook callers; consumers invoke values as hooks */
import {
  useTrending,
  useCustomMovies,
  useCustomContent,
  useDiscover,
} from "@/hooks/api/useMovies";

export const HOOK_MAP: Record<
  string,
  () =>
    | ReturnType<typeof useTrending>
    | ReturnType<typeof useCustomMovies>
    | ReturnType<typeof useCustomContent>
    | ReturnType<typeof useDiscover>
> = {
  trending: () => useDiscover("recent", "all"),
  latestRelease: () => useDiscover("latest", "all"),
  allMovies: useCustomMovies,
  recentlyAdded: () => useDiscover("recent", "movie"),
  allTvShows: () => useDiscover("recent", "tv"),
  recentlyAddedTvShows: () => useDiscover("recent", "tv"),
  latestMovies: () => useDiscover("latest", "movie"),
  latestTvShows: () => useDiscover("latest", "tv"),
  popularMovies: () => useDiscover("popular", "movie"),
  popularTvShows: () => useDiscover("popular", "tv"),
  trendingMovies: () => useDiscover("trending", "movie"),
  trendingTvShows: () => useDiscover("trending", "tv"),
  allContent: () => useCustomContent("all"), // All content types
};
