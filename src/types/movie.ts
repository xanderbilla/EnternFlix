export interface Movie {
  id: number | string; // Allow both number (TMDB) and string (custom API UUID)
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

  // Custom API specific
  customId?: string; // Store original UUID for API calls
}

// Custom API types
export interface CustomMovie {
  id: string;
  title: string;
  description: string;
  poster: string;
  cover: string;
  performer: string;
  year: number;
}

export interface CustomMoviesResponse {
  status: number;
  message: string;
  data: CustomMovie[];
}

export interface CustomMovieResponse {
  status: number;
  message: string;
  data: CustomMovie;
}

// Helper function to convert CustomMovie to Movie format
export function convertCustomMovieToMovie(customMovie: CustomMovie): Movie {
  return {
    id: customMovie.id, // Keep UUID as string
    customId: customMovie.id, // Store for API calls
    title: customMovie.title,
    overview: customMovie.description,
    backdrop_path: customMovie.cover, // Use cover for backdrop (banner/background)
    poster_path: customMovie.poster, // Use poster for poster (card images)
    release_date: `${customMovie.year}-01-01`,
    vote_average: 8.5, // Hardcoded
    vote_count: 2500, // Hardcoded
    popularity: 150,
    original_language: "en",
    genre_ids: [28, 12, 878], // Hardcoded: Action, Adventure, Sci-Fi
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
    ],
    media_type: "movie",
    runtime: 169, // Hardcoded: 2h 49m
    status: "Released", // Hardcoded
    tagline: "An epic journey beyond imagination", // Hardcoded
    original_title: customMovie.title,
  };
}
