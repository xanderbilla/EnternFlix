import { useTrending, useCustomMovies } from "@/hooks/api/useMovies";

export const HOOK_MAP: Record<
  string,
  () => ReturnType<typeof useTrending> | ReturnType<typeof useCustomMovies>
> = {
  trending: useTrending,
  allMovies: useCustomMovies,
};
