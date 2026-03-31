export interface Genre {
  id: string | number;
  name: string;
}

export interface Cast {
  id: string | number;
  name: string;
  coverPicture?: string;
}

export interface Tag {
  id: string | number;
  name: string;
}

export interface Studio {
  id: string | number;
  name: string;
  coverPicture?: string;
}

export interface Audit {
  createdAt: string;
  version: number;
  isDeleted: boolean;
}

export interface Movie {
  id: string | number;
  title?: string;
  overview: string;
  backdropPath: string | null;
  posterPath: string | null;
  releaseDate?: string;
  firstAirDate?: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult?: boolean;
  contentRating?: "18_PLUS" | "21_PLUS";
  originalLanguage: string;
  genres?: Genre[];
  casts?: Cast[];
  tags?: Tag[];
  contentType?: "MOVIE" | "TV" | "PERSON";
  originCountry?: string[];
  moodTags?: Tag[];

  // TV Show specific
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  lastAirDate?: string;

  // Movie specific
  runtime?: number;

  // Extended details
  status?: string;
  tagline?: string;
  createdBy?: Array<{ id: number; name: string; profilePath: string }>;
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
