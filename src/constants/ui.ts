// Static data for navbar
export const NAVBAR_ITEMS = [
  { label: "Trending", path: "/trending" },
  { label: "Anime", path: "/anime" },
  { label: "TV Shows", path: "/tv-shows" },
  { label: "Movies", path: "/movies" },
  { label: "Favorites", path: "/favorites" },
] as const;

// Image sizes
export const IMAGE_SIZES = {
  avatar: { width: 48, height: 48 },
  profile: { width: 100, height: 100 },
  company: { width: 96, height: 48 },
  poster: { width: 280, height: 420 },
} as const;

// Timing constants
export const TIMING = {
  videoAutoPlayDelay: 1000,
  hoverDelay: 300,
  searchDebounce: 500,
} as const;
