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
  trending: () => useCustomContent("all"),
  latestRelease: () => useDiscover("latest", "all"),
  allMovies: useCustomMovies,
  recentlyAdded: useCustomMovies,
  latestMovies: () => useDiscover("latest", "movie"),
  popularMovies: () => useDiscover("popular", "movie"),
  trendingMovies: () => useDiscover("trending", "movie"),
  allContent: () => useCustomContent("all"), // All content types
};
