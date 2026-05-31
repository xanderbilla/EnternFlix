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

export interface AssetKey {
  id: string;
  value: string;
}

export interface Asset {
  type: AssetType;
  keys: AssetKey[];
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
  stats?: {
    totalViews?: number;
    totalLikes?: number;
    averageRating?: number;
  };

  audit?: Audit;
}

export interface Person {
  id: string;
  contentType: "PERSON";
  name: string;
  legalName?: string;
  roles: string[];
  stageName?: string;
  bio?: string;
  birthDate?: string;
  birthPlace?: string;
  nationality?: string;
  gender?: string;
  height?: number;
  weight?: number;
  verified: boolean;
  active: boolean;
  debutYear?: number;
  careerStatus?: string;
  profilePath?: string;
  backdropPath?: string;
  aliases?: string[];
  measurements?: {
    bust?: number;
    waist?: number;
    hips?: number;
    unit?: string;
    bodyType?: string;
    eyeColor?: string;
    hairColor?: string;
  };
  career?: {
    startYear?: number;
    previousProfession?: string;
    knownFor?: string[];
  };
  socialPresence?: Array<{
    platformId: string;
    platform: string;
    username: string;
    verified: boolean;
    available: boolean;
  }>;
  stats?: {
    totalProductions?: number | null;
    totalViews?: number | null;
    subscriberCount?: number | null;
    followersCount?: number | null;
    averageRating?: number | null;
  };
  sourceMetadata?: {
    confidenceScore?: number;
    sources?: string[];
    notes?: string;
  };
  tags?: Tag[];
  categories?: Tag[];
  specialties?: Tag[];
}

export interface SearchWarning {
  scope: string;
  code: string;
  message: string;
}

export interface SearchPersonResult {
  id: string;
  contentType: "PERSON";
  name: string;
  stageName?: string;
  profilePath?: string;
  backdropPath?: string;
}

export interface SearchContentBucket {
  results: Movie[];
  count: number;
  page: number;
  pageSize: number;
}

export interface SearchPeopleBucket {
  results: SearchPersonResult[];
  count: number;
  page: number;
  pageSize: number;
}

export interface SearchResponseData {
  content: SearchContentBucket;
  people: SearchPeopleBucket;
  warnings?: SearchWarning[];
}

export interface ContentAttribute {
  id: string;
  name: string;
  attributeType: string[];
  contentType: "MOVIE" | "TV" | "ALL";
  active: boolean;
}

export type MoviesResponse = import("@/types/api").ApiResponse<
  import("@/types/api").PagedData<Movie>
>;
export type MovieResponse = import("@/types/api").ApiResponse<Movie>;
export type PersonResponse = import("@/types/api").ApiResponse<Person>;
export type SearchResponse =
  import("@/types/api").ApiResponse<SearchResponseData>;
export type AttributesResponse = import("@/types/api").ApiResponse<
  import("@/types/api").PagedData<ContentAttribute>
>;
