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
  backdrop_path: string; // Made non-null for title pages (always expected)
  poster_path: string; // Made non-null for title pages (always expected)
  title?: string;
  name?: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  first_air_date?: string;
  release_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  genres?: Array<{ id: string | number; name: string }>;
  casts?: Array<{ id: string | number; name: string; cover_picture?: string }>;
  tags?: Array<{ id: string | number; name: string }>;
  mood_tags?: Array<{ id: string | number; name: string }>;
  content_type?: "MOVIE" | "TV" | "PERSON";
  runtime?: number;
  status?: string;
  tagline?: string;
  vote_average?: number;
  content_rating?: "18_PLUS" | "21_PLUS";
  created_by?: Creator[];
  production_companies?: Array<{
    id: string | number;
    name: string;
    cover_picture?: string;
    logo_path?: string;
  }>;
  audit?: {
    created_at: string;
    is_deleted: boolean;
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
  content_rating?: "18_PLUS" | "21_PLUS";
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
  content_rating?: "18_PLUS" | "21_PLUS";
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
