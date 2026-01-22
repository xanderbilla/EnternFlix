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

export interface Genre {
  id: number;
  name: string;
}

// TitleData should not redefine Movie fields - use composition instead
// This is a transitional type that will be removed in future refactoring
export interface TitleData {
  id: number;
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
  genres: Genre[];
  runtime?: number;
  status: string;
  tagline?: string;
  vote_average?: number;
  created_by?: Creator[];
  production_companies: ProductionCompany[];
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
  mockCast: string[];
  mockGenres: string[];
  onExploreClick?: (query: string, title: string, isCast?: boolean) => void;
}

export interface DialogInfoSectionProps {
  releaseYear: string;
  isTV: boolean;
  numberOfSeasons: number;
  overview: string;
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

export interface VideoPlayerProps {
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
