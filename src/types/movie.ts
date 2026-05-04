export interface Genre {
  id: string;
  name: string;
}

export interface Cast {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Studio {
  id: string;
  name: string;
}

export interface Audit {
  createdAt: string;
  version: number;
  isDeleted: boolean;
}

export type AssetType = "TRAILER" | "TEASER" | "CLIP" | "PROMO" | "BTS";

export interface Asset {
  type: AssetType;
  keys: string[];
}

export interface Movie {
  id: string;
  title?: string;
  overview?: string;
  backdropPath: string | null;
  posterPath: string | null;
  releaseDate?: string;
  firstAirDate?: string;
  adult?: boolean;
  contentRating?: "18_PLUS" | "21_PLUS";
  originalLanguage?: string;
  genres?: Genre[];
  casts?: Cast[];
  tags?: Tag[];
  contentType?: "MOVIE" | "TV" | "PERSON";
  originCountry?: string[];
  moodTags?: Tag[];
  assets?: Asset[];

  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  lastAirDate?: string;

  runtime?: number;

  status?: string;
  tagline?: string;
  studios?: Studio[];

  audit?: Audit;
}

export interface Person {
  id: string;
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

export type MoviesResponse = import("@/types/api").ApiResponse<Movie[]>;
export type MovieResponse = import("@/types/api").ApiResponse<Movie>;
export type PersonResponse = import("@/types/api").ApiResponse<Person>;
