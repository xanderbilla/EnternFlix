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

export interface DialogBannerProps {
  data: import("./movie").Movie | null;
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
  contentId?: string;
}

export interface DialogEpisode {
  id: number;
  seasonId?: string;
  episodeId?: string;
  title: string;
  duration: string;
  description: string;
}

export interface DialogAboutSectionProps {
  title: string;
  casts: Array<{ id: string; name: string }>;
  genres: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
  moodTags: Array<{ id: string; name: string }>;
  productionCompanies: Array<{ id: string; name: string }>;
  contentRating?: "18_PLUS" | "21_PLUS";
  releaseDate?: string;
  auditDate?: string;
  isTV: boolean;
  originCountry?: string[];
  originalLanguage?: string;
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
  contentId?: string;
  contentType?: "MOVIE" | "TV" | "PERSON";
  onClose?: () => void;
  onAddToListClick?: () => void;
  onLikeClick?: () => void;
}

export interface TitleVideoPlayerProps {
  showVideo: boolean;
  videoLoaded?: boolean;
  isMuted: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  data: import("./movie").Movie;
  previewVideoPath?: string;
  onVideoEnded: () => void;
  onVideoLoaded?: () => void;
}

export interface DialogVideoSectionProps {
  data: import("./movie").Movie | null;
  onClose: () => void;
}
