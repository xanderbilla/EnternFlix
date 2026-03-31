export interface Season {
  id: number;
  season_number: number;
  name: string;
  overview: string;
  air_date: string;
  episode_count: number;
  poster_path: string;
}

export interface TabSeason {
  id: number;
  title: string;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  still_path: string | null;
  runtime: number;
  vote_average: number;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string;
}

export interface Creator {
  id: number;
  name: string;
  profile_path: string;
}

// TitleData should not redefine Movie fields - use composition instead
// This is a transitional type that will be removed in future refactoring
export interface TitleData {
  id: number | string;
  backdropPath: string; // Made non-null for title pages (always expected)
  posterPath: string; // Made non-null for title pages (always expected)
  title?: string;
  name?: string;
  originalName?: string;
  originalTitle?: string;
  overview: string;
  firstAirDate?: string;
  releaseDate?: string;
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  genres?: Array<{ id: string | number; name: string }>;
  casts?: Array<{ id: string | number; name: string; coverPicture?: string }>;
  tags?: Array<{ id: string | number; name: string }>;
  moodTags?: Array<{ id: string | number; name: string }>;
  contentType?: "MOVIE" | "TV" | "PERSON";
  runtime?: number;
  status?: string;
  tagline?: string;
  voteAverage?: number;
  contentRating?: "18_PLUS" | "21_PLUS";
  createdBy?: Creator[];
  production_companies?: Array<{
    id: string | number;
    name: string;
    coverPicture?: string;
    logo_path?: string;
  }>;
  audit?: {
    createdAt: string;
    isDeleted: boolean;
  };
}

export interface DialogBannerProps {
  data: TitleData | null;
  mediaType: "movie" | "tv";
  onClose: () => void;
  onExploreClick?: (query: string, title: string, isCast?: boolean) => void;
}

export interface DialogSeasonSelectorProps {
  selectedSeason: number;
  numberOfSeasons: number;
  onSeasonChange: (season: number) => void;
}

export interface DialogEpisodesListProps {
  episodes: DialogEpisode[];
  selectedSeason: number;
  numberOfSeasons: number;
  onSeasonChange: (season: number) => void;
}

export interface DialogEpisode {
  id: number;
  title: string;
  duration: string;
  description: string;
}

export interface DialogAboutSectionProps {
  title: string;
  casts: Array<{ id: string | number; name: string }>;
  genres: Array<{ id: string | number; name: string }>;
  tags: Array<{ id: string | number; name: string }>;
  moodTags: Array<{ id: string | number; name: string }>;
  productionCompanies: Array<{ id: string | number; name: string }>;
  contentRating?: "18_PLUS" | "21_PLUS";
  releaseDate?: string;
  auditDate?: string;
  isTV: boolean;
  onExploreClick?: (query: string, title: string, isCast?: boolean) => void;
  movieData?: import("./movie").Movie;
}

export interface DialogInfoSectionProps {
  releaseYear: string;
  isTV: boolean;
  numberOfSeasons: number;
  overview: string;
  runtime?: number;
  contentRating?: "18_PLUS" | "21_PLUS";
  movieData?: import("./movie").Movie;
}

export interface VideoControlsProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export interface DialogActionButtonsProps {
  title: string;
  onPlayClick?: () => void;
  onAddToListClick?: () => void;
  onLikeClick?: () => void;
}

export interface TitleVideoPlayerProps {
  showVideo: boolean;
  videoLoaded?: boolean;
  isMuted: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  data: TitleData;
  onVideoEnded: () => void;
  onVideoLoaded?: () => void;
}

export interface DialogVideoSectionProps {
  data: TitleData | null;
  onClose: () => void;
}
