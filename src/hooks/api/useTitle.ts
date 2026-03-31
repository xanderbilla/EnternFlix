import { useQuery } from "@tanstack/react-query";
import axios from "@/helper/axios";
import customAxios from "@/helper/customAxios";
import requests from "@/helper/request";
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

const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const fetchTitleData = async (id: string): Promise<TitleData> => {
  // Try custom API first (if ID looks like UUID or is long)
  if (id.includes("-") || id.length > 10) {
    try {
      const response = await customAxios.get<MovieResponse>(
        requests.fetchMovieById(id),
      );
      const movie = response.data.data;
      return {
        content: movie,
        mediaType: "movie",
      };
    } catch (error) {
      console.log("Custom API failed, falling back to TMDB", error);
    }
  }

  // Fallback to TMDB API
  try {
    // Try fetching as a TV show first
    const tvResponse = await axios.get(
      `tv/${id}?api_key=${key}&append_to_response=seasons`,
    );

    if (tvResponse.data) {
      return {
        content: tvResponse.data,
        mediaType: "tv",
      };
    }
  } catch (error) {
    // If TV show fetch fails, try as a movie
    try {
      const movieResponse = await axios.get(`movie/${id}?api_key=${key}`);

      if (movieResponse.data) {
        return {
          content: movieResponse.data,
          mediaType: "movie",
        };
      }
    } catch (movieError) {
      throw new Error("Content not found");
    }
  }

  throw new Error("Content not found");
};

export const useTitle = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["title", id],
    queryFn: () => fetchTitleData(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes,
  });
};
