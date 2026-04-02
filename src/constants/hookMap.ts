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
  trending: () => useCustomContent("all"), // Homepage - recently added all content
  latestRelease: () => useDiscover("latest", "all"), // Latest release - all content
  allMovies: useCustomMovies, // Movies page - only movies
  recentlyAdded: useCustomMovies, // Recently added movies - movie content only
  latestMovies: () => useDiscover("latest", "movie"), // Latest movies
  popularMovies: () => useDiscover("popular", "movie"), // Popular movies
  trendingMovies: () => useDiscover("trending", "movie"), // Trending movies
  allContent: () => useCustomContent("all"), // All content types
};
