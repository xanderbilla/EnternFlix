import customAxios from "@/lib/api/customAxios";
import requests from "@/lib/api/request";
import type { Movie, MovieResponse } from "@/types/movie";

export type MediaType = "movie" | "tv";

export interface TitleData {
  content: Movie;
  mediaType: MediaType;
}

/**
 * Fetches a single title. Usable from server components, route handlers,
 * and client hooks (the client wraps it with React Query).
 *
 * Server pages that call this from both `generateMetadata` and the page
 * component should wrap with `React.cache` at the call site to dedupe
 * within a single render pass.
 */
export async function fetchTitleData(id: string): Promise<TitleData> {
  const response = await customAxios.get<MovieResponse>(
    requests.fetchMovieById(id),
  );
  const content = response.data.data;
  if (!content) {
    throw new Error("Content not found");
  }
  const mediaType: MediaType = content.contentType === "TV" ? "tv" : "movie";
  return { content, mediaType };
}
