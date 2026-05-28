import { QueryClient } from "@tanstack/react-query";
import customAxios from "@/lib/api/customAxios";
import requests from "@/lib/api/request";
import { queryKeys } from "@/lib/query/queryKeys";
import { toPaginated } from "@/lib/query/queryHelpers";
import { STALE_TIMES } from "@/constants/common";
import type { Movie, MoviesResponse, MovieResponse } from "@/types/movie";
import type { PaginatedResponse } from "@/types/api";

async function fetchBannerServer(type: string): Promise<Movie> {
  const { data } = await customAxios.get<MovieResponse>(
    requests.fetchBanner(type),
  );
  if (!data.data) throw new Error("Banner content unavailable");
  return data.data;
}

async function fetchDiscoverServer(
  type: string,
  content: string,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await customAxios.get<MoviesResponse>(
    requests.fetchDiscover(type, content),
  );
  return toPaginated(data.data?.items ?? []);
}

export async function prefetchContentPage(
  queryClient: QueryClient,
  contentType: "all" | "movie" | "tv",
): Promise<void> {
  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: queryKeys.banner(contentType),
      staleTime: STALE_TIMES.CONTENT,
      queryFn: () => fetchBannerServer(contentType),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.discover("recent", contentType),
      staleTime: STALE_TIMES.CONTENT,
      queryFn: () => fetchDiscoverServer("recent", contentType),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.discover("latest", contentType),
      staleTime: STALE_TIMES.CONTENT,
      queryFn: () => fetchDiscoverServer("latest", contentType),
    }),
  ]);
}
