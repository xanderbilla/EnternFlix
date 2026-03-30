export interface Genre {
  id: string | number;
  name: string;
}

export interface Cast {
  id: string | number;
  name: string;
  cover_picture?: string;
}

export interface Tag {
  id: string | number;
  name: string;
}

export interface Studio {
  id: string | number;
  name: string;
  cover_picture?: string;
}

export interface Audit {
  created_at: string;
  is_deleted: boolean;
}

export interface Movie {
  id: string | number;
  title?: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult?: boolean;
  content_rating?: "18_PLUS" | "21_PLUS";
  original_language: string;
  genres?: Genre[];
  casts?: Cast[];
  tags?: Tag[];
  content_type?: "MOVIE" | "TV" | "PERSON";
  origin_country?: string[];
  mood_tags?: Tag[];

  // TV Show specific
  number_of_seasons?: number;
  number_of_episodes?: number;
  last_air_date?: string;

  // Movie specific
  runtime?: number;

  // Extended details
  status?: string;
  tagline?: string;
  created_by?: Array<{ id: number; name: string; profile_path: string }>;
  studios?: Studio[];

  // Audit info
  audit?: Audit;
}

// API Response types
export interface MoviesResponse {
  status: number;
  message: string;
  data: Movie[];
}

export interface MovieResponse {
  status: number;
  message: string;
  data: Movie;
}
