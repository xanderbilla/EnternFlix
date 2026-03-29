import { useTrending } from "@/hooks/api/useMovies";

export const HOOK_MAP: Record<string, () => ReturnType<typeof useTrending>> = {
  trending: useTrending,
};
