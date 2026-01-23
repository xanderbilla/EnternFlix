import { ReactNode, ButtonHTMLAttributes } from "react";
import { Movie } from "./movie";
import { DialogState } from "@/hooks/ui/useDialogManager";

export interface MovieCardProps {
  data: Movie;
  isFirst?: boolean;
  isLast?: boolean;
  onMovieClick?: (movieId: number) => void;
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

export interface VideoPlayerProps {
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
  movieId: number;
  onMoreInfoClick: () => void;
}

export interface ExploreDialogProps {
  isOpen: boolean;
  title: string;
  movies: Movie[];
  onClose: () => void;
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
  onMovieClick?: (movieId: number) => void;
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

export interface CategoryPageContentProps {
  title: string;
  description: string;
  category: string;
  movieLists: Array<{
    title: string;
    hookName: string;
  }>;
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
  onMovieChange?: (movieId: string) => void; // New prop for handling movie changes
}

export interface ExploreDialogGridProps {
  movies: Movie[];
  onMovieClick: (movieId: number) => void;
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
  onMovieClick: (movieId: number) => void;
  columns?: number;
}

export interface DialogRendererProps {
  dialogState: DialogState;
  hasBackNavigation: boolean;
  onClose: () => void;
  onBack: () => void;
  onMovieClick: (movieId: number) => void;
  onInfoDialogOpen?: (movieId: number) => void;
}
