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

export type AssetType = "TRAILER" | "TEASER" | "CLIP" | "PROMO" | "BTS";

export interface Asset {
  asset: AssetType;
  key: string[];
}

export interface Movie {
  id: string | number;
  title?: string;
  overview?: string;
  backdropPath: string | null;
  posterPath: string | null;
  releaseDate?: string;
  firstAirDate?: string;
  contentRating?: "18_PLUS" | "21_PLUS";
  originalLanguage?: string;
  genres?: Genre[];
  casts?: Cast[];
  tags?: Tag[];
  contentType?: "MOVIE" | "TV" | "PERSON";
  originCountry?: string[];
  moodTags?: Tag[];
  assets?: Asset[];

  // TV Show specific
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  lastAirDate?: string;

  // Movie specific
  runtime?: number;

  // Extended details
  status?: string;
  tagline?: string;
  studios?: Studio[];

  // Audit info
  audit?: Audit;
}

// Person type for cast/crew details
export interface Person {
  id: string | number;
  contentType: "PERSON";
  name: string;
  roles: string[];
  stageName?: string;
  bio?: string;
  birthDate?: string;
  birthPlace?: string;
  nationality?: string;
  gender?: string;
  height?: number;
  verified: boolean;
  active: boolean;
  debutYear?: number;
  careerStatus?: string;
  profilePath?: string;
  backdropPath?: string;
  measurements?: {
    bust?: number;
    waist?: number;
    hips?: number;
    unit?: string;
    bodyType?: string;
    eyeColor?: string;
    hairColor?: string;
  };
  tags?: Tag[];
  categories?: Tag[];
  specialties?: Tag[];
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

export interface PersonResponse {
  status: number;
  message: string;
  data: Person;
}
