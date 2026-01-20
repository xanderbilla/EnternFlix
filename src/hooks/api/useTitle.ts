import { useQuery } from "@tanstack/react-query";
import axios from "@/helper/axios";

export interface Movie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status: string;
  tagline?: string;
  created_by?: Array<{ id: number; name: string; profile_path: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string }>;
}

export interface TVShow extends Movie {
  number_of_seasons: number;
  seasons?: Array<{
    id: number;
    season_number: number;
    name: string;
    overview: string;
    air_date: string;
    episode_count: number;
    poster_path: string;
  }>;
}

export type MediaType = "movie" | "tv";

export interface TitleData {
  content: Movie | TVShow;
  mediaType: MediaType;
}

const fetchTitleData = async (id: string): Promise<TitleData> => {
  try {
    // Try fetching as a TV show first
    const tvResponse = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_DB_API_KEY}&append_to_response=seasons`,
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
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_DB_API_KEY}`,
      );

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

export const useTitle = (id: string) => {
  return useQuery({
    queryKey: ["title", id],
    queryFn: () => fetchTitleData(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
