import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/api/axios";
import customAxios from "@/lib/api/customAxios";
import requests from "@/lib/api/request";
import { config } from "@/lib/env/env";
import { queryKeys } from "@/lib/query/queryKeys";
import { logger } from "@/lib/logger/logger";
import { Movie, MovieResponse } from "@/types/movie";

export interface TVShow extends Movie {
  numberOfSeasons: number;
  seasons?: Array<{
    id: number;
    season_number: number;
    name: string;
    overview: string;
    air_date: string;
    episode_count: number;
    posterPath: string;
  }>;
}

export type MediaType = "movie" | "tv";

export interface TitleData {
  content: Movie | TVShow;
  mediaType: MediaType;
}

const key = config.tmdb.apiKey;

function looksLikeCustomId(id: string): boolean {
  return id.includes("-") || id.length > 10;
}

async function fetchFromCustom(id: string): Promise<TitleData | null> {
  try {
    const response = await customAxios.get<MovieResponse>(
      requests.fetchMovieById(id),
    );
    return { content: response.data.data, mediaType: "movie" };
  } catch (error) {
    logger.debug("[useTitle] custom API miss, falling back to TMDB", id, error);
    return null;
  }
}

async function fetchFromTmdb(id: string): Promise<TitleData> {
  try {
    const tv = await axios.get(
      `tv/${id}?api_key=${key}&append_to_response=seasons`,
    );
    if (tv.data) return { content: tv.data, mediaType: "tv" };
  } catch {
    // try movie next
  }

  const movie = await axios.get(`movie/${id}?api_key=${key}`);
  if (movie.data) return { content: movie.data, mediaType: "movie" };

  throw new Error("Content not found");
}

async function fetchTitleData(id: string): Promise<TitleData> {
  if (looksLikeCustomId(id)) {
    const fromCustom = await fetchFromCustom(id);
    if (fromCustom) return fromCustom;
  }
  return fetchFromTmdb(id);
}

export const useTitle = (id: string, enabled: boolean = true) =>
  useQuery({
    queryKey: queryKeys.title(id),
    queryFn: () => fetchTitleData(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
