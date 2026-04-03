import { ReactNode, ButtonHTMLAttributes } from "react";
import { Movie } from "./movie";
import { DialogState } from "@/hooks/ui/useDialogManager";

export interface MovieCardProps {
  data: Movie;
  isFirst?: boolean;
  isLast?: boolean;
  onMovieClick?: (movieId: number | string) => void;
  index?: number;
}

export interface MovieListProps {
  hookName: string;
  title: string;
}

export interface BannerProps {
  category?: string;
  variant?: "home" | "category";
}

export interface PageLayoutProps {
  children: ReactNode;
  showBanner?: boolean;
  bannerVariant?: "home" | "category";
  bannerTitle?: string;
  bannerDescription?: string;
  bannerCategory?: string;
  gridContent?: ReactNode;
}

export interface CategoryGridProps {
  category: string;
}

export interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "danger"
    | "secondary"
    | "outline"
    | "banner-play"
    | "banner-info"
    | "auth";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export interface MovieCardHoverOverlayProps {
  backdropUrl: string | null;
  positionClass: string;
  viewportPosition?: "left" | "right" | "center";
  data: Movie;
  navigateToTitle: () => void;
  handleKeyPress: (event: React.KeyboardEvent, action: () => void) => void;
  children: ReactNode;
}

export interface MovieCardActionButtonsProps {
  onPlayClick: () => void;
  onAddClick: () => void;
  onLikeClick: () => void;
  onInfoClick: () => void;
  handleKeyPress: (event: React.KeyboardEvent, action: () => void) => void;
}

export interface MovieCardMetadataProps {
  truncatedTitle: string;
  releaseYear: string;
  contentType: string;
  duration: string;
  genres: string;
  onTitleClick: () => void;
  handleKeyPress: (event: React.KeyboardEvent, action: () => void) => void;
  data?: Movie;
}

export interface MovieCardVideoPlayerProps {
  sampleVideoUrl: string;
  isMuted: boolean;
  onEnded: () => void;
  onVideoLoaded?: () => void;
}

export interface VolumeControlProps {
  isMuted: boolean;
  onToggleMute: (e: React.MouseEvent) => void;
}

export interface BannerVideoProps {
  sampleVideoUrl: string;
  isMuted: boolean;
  showVideo: boolean;
  videoEnded: boolean;
  shouldPauseBanner: boolean;
  onVideoEnded: () => void;
  onVideoLoaded?: () => void;
}

export interface BannerControlsProps {
  showVideo: boolean;
  videoEnded: boolean;
  isMuted: boolean;
  contentRating: string;
  onToggleMute: () => void;
  onReloadVideo: () => void;
}

export interface BannerContentProps {
  title: string;
  description: string;
  movieId: number | string;
  contentRating?: string;
  onMoreInfoClick: () => void;
}

export interface ExploreDialogProps {
  isOpen: boolean;
  title: string;
  movies: Movie[];
  onClose: () => void;
  onMovieClick: (movieId: number | string) => void;
  zIndex?: number;
  showBackButton?: boolean;
  backdropUrl?: string;
  isCastDialog?: boolean;
}

export interface MovieListHeaderProps {
  title: string;
  showExploreButton: boolean;
  onExploreClick: () => void;
  onTitleHover?: {
    onEnter: () => void;
    onLeave: () => void;
  };
}

export interface ScrollButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  show: boolean;
}

export interface MovieListScrollGridProps {
  movies: Movie[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onMovieClick?: (movieId: number | string) => void;
}

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  ariaLabel?: string;
}

export interface InputProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  type: string;
  className: string;
}

export interface MobileMenuProps {
  visible: boolean;
  items: readonly { path: string; label: string }[];
}

export interface SearchHeroProps {
  movie: Movie | null;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchResultsProps {
  searchQuery: string;
  debouncedQuery: string;
  searchRes: Movie[];
  hasNextPage: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

export interface MovieListItem {
  title: string;
  hookName: string;
}

export interface CategoryPageContentProps {
  title: string;
  description: string;
  category: string;
  movieLists: MovieListItem[];
}

// Navbar sub-component interfaces
export interface GenresDropdownProps {
  genres: import("./navbar").NavbarGenre[];
  isOpen: boolean;
  onToggle: () => void;
  onGenreClick: (genre: import("./navbar").NavbarGenre) => void;
}

export interface ViewModeToggleProps {
  viewMode: import("./common").ViewMode;
  selectedSort: string;
  showSortDropdown: boolean;
  onViewModeChange: (mode: import("./common").ViewMode) => void;
  onToggleSortDropdown: () => void;
  onSortClick: (option: string) => void;
  sortOptions: string[];
}

// Account component interfaces (moved to types/account.ts)
export interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export interface PageHeaderProps {
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
}

export interface FooterLinkGroupProps {
  title: string;
  links: Array<{
    href: string;
    label: string;
    isEmail?: boolean;
  }>;
}

export interface LazyMovieListProps {
  title: string;
  hookName: string;
}

export interface CircularButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "muted";
  icon: ReactNode;
  "aria-label": string;
}

export interface ImageCardProps {
  imageUrl?: string;
  alt: string;
  name: string;
  shape?: "square" | "circular";
  size?: "sm" | "md" | "lg";
  subtitle?: string;
  onEdit?: () => void;
  className?: string;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export interface TitleDialogProps {
  isOpen: boolean;
  titleId: string;
  onClose: () => void;
  onMovieChange?: (movieId: string) => void;
  onOpenCastDialog?: (
    castId: string,
    castName: string,
    backdropUrl?: string,
    zIndex?: number,
  ) => void;
  onOpenDiscoverDialog?: (
    attributeId: string,
    attributeName: string,
    zIndex?: number,
  ) => void;
}

export interface ExploreDialogGridProps {
  movies: Movie[];
  onMovieClick: (movieId: number | string) => void;
}

export interface ExploreDialogHeaderProps {
  title: string;
  onClose: () => void;
  showBackButton?: boolean;
  backdropUrl?: string;
  isCastDialog?: boolean;
}

export interface SettingRowProps {
  label: string;
  description?: string;
  action?: ReactNode;
  hasBorder?: boolean;
  className?: string;
}

export interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movieId: number | string) => void;
  columns?: number;
  disableHover?: boolean;
  disableAnimation?: boolean;
}

export interface DialogRendererProps {
  dialogStack: DialogState[];
  hasBackNavigation: boolean;
  onClose: () => void;
  onBack: () => void;
  onMovieClick: (movieId: number | string) => void;
  onInfoDialogOpen?: (movieId: number | string) => void;
  onOpenCastDialog?: (
    castId: string,
    castName: string,
    backdropUrl?: string,
    zIndex?: number,
  ) => void;
  onOpenDiscoverDialog?: (
    attributeId: string,
    attributeName: string,
    zIndex?: number,
  ) => void;
}

// Banner component props
export interface FavoritesBannerProps {
  movie: Movie | null;
}

// Title page component props
export interface ShowMoreButtonProps {
  showAll: boolean;
  onClick: () => void;
}

export interface EpisodeItemProps {
  episode: import("./title").DialogEpisode;
  index: number;
  showAllEpisodes: boolean;
  hasBorder: boolean;
}

// Dialog component props
export interface CastDialogProps {
  isOpen: boolean;
  castId: string;
  castName: string;
  onClose: () => void;
  onBack?: () => void;
  onMovieClick: (movieId: number | string) => void;
  backdropUrl?: string;
  zIndex?: number;
}

export interface InfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  zIndex?: number;
}

export interface DiscoverDialogProps {
  isOpen: boolean;
  attributeId: string;
  attributeName: string;
  onClose: () => void;
  onBack?: () => void;
  onMovieClick: (movieId: number | string) => void;
  zIndex?: number;
}

// UI component props
export interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  children:
    | ReactNode
    | ((props: {
        handleClose: () => void;
        handleBack: () => void;
      }) => ReactNode);
  zIndex?: number;
  className?: string;
}

export interface DialogHeaderProps {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  backdropUrl?: string;
  variant?: "default" | "cast" | "info";
  subtitle?: string;
  isLoading?: boolean;
  verified?: boolean;
  gender?: string;
}

export interface CastDialogHeaderProps {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  backdropUrl: string;
  isLoading?: boolean;
  verified?: boolean;
  gender?: string;
}

export interface SimpleDialogHeaderProps {
  title: string;
  onClose: () => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Icon type alias
export type IconName =
  | keyof typeof import("@/constants/iconMap").iconMap
  | keyof typeof import("@/constants/customIcons").customIcons;
