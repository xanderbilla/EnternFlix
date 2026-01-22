export interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult?: boolean;
  video?: boolean;
  original_language: string;
  genre_ids?: number[];
  genres?: Array<{ id: number; name: string }>;
  media_type?: "movie" | "tv" | "person";

  // TV Show specific
  number_of_seasons?: number;
  number_of_episodes?: number;
  origin_country?: string[];

  // Movie specific
  runtime?: number;

  // Extended details (for title pages)
  status?: string;
  tagline?: string;
  created_by?: Array<{ id: number; name: string; profile_path: string }>;
  production_companies?: Array<{ id: number; name: string; logo_path: string }>;
}
