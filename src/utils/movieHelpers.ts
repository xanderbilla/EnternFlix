import { Movie } from "@/types/movie";
import { TEXT_LIMITS } from "@/constants/common";

// Type alias for internal use
type MovieData = Movie;

/**
 * Determine content type (MOVIE or TV)
 * Uses contentType field or infers from movie properties
 * @param data - Movie object containing content type indicators
 * @returns Content type string ("Movie" or "TV")
 */
export const getContentType = (data: MovieData): string => {
  // Use contentType from API if available
  if (data?.contentType === "TV") return "TV";
  if (data?.contentType === "MOVIE") return "Movie";

  // Check if it has TV-specific properties
  if (data?.firstAirDate && data.firstAirDate !== "0001-01-01") return "TV";
  if (data?.numberOfSeasons && data.numberOfSeasons > 0) return "TV";

  // Default to Movie
  return "Movie";
};

/**
 * Get truncated title with ellipsis
 * Shortens movie title if it exceeds maximum length
 * @param data - Movie object containing title
 * @param maxLength - Maximum length before truncation (default: TEXT_LIMITS.TITLE_MAX)
 * @returns Truncated title with ellipsis or original title if within limit
 */
export const getTruncatedTitle = (
  data: MovieData,
  maxLength: number = TEXT_LIMITS.TITLE_MAX,
): string => {
  const title = data?.title;
  if (!title) return "";
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};

/**
 * Get comma-separated genre names
 * Returns up to 2 genres from movie data or fallback based on content type
 * @param data - Movie object containing genres array
 * @returns Comma-separated genre names (max 2) or fallback genre
 */
export const getGenres = (data: MovieData): string => {
  if (data?.genres && data.genres.length > 0) {
    return data.genres
      .slice(0, 2)
      .map((genre) => genre.name)
      .join(", ");
  }
  // Fallback genres based on content type
  const contentType = getContentType(data);
  if (contentType === "TV") {
    return "Drama";
  }
  return "Action";
};

/**
 * Get formatted duration or season count
 * Returns runtime for movies (e.g., "2h 15m") or season count for TV shows
 * @param data - Movie object containing runtime or season information
 * @returns Formatted duration string or season count
 */
export const getDuration = (data: MovieData): string => {
  const contentType = getContentType(data);
  if (contentType === "TV") {
    if (data?.numberOfSeasons) {
      return `${data.numberOfSeasons} Season${data.numberOfSeasons > 1 ? "s" : ""}`;
    }
    return "TV Series";
  } else {
    if (data?.runtime) {
      const hours = Math.floor(data.runtime / 60);
      const minutes = data.runtime % 60;
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    }
    return "Movie";
  }
};

/**
 * Extract release year from movie data
 * Returns the year from releaseDate or firstAirDate
 * @param data - Movie object containing release or air date
 * @returns Release year as string or "Unknown" if not available
 */
export const getReleaseYear = (data: MovieData): string => {
  const date = data?.releaseDate || data?.firstAirDate;
  if (!date || date === "0001-01-01") return "Unknown";
  return date.substring(0, 4);
};

/**
 * Generate TMDB image URL with specified size
 * Handles both custom API images and TMDB images with appropriate base URLs
 * @param path - Image path from API (null for no image)
 * @param size - Image size for TMDB images (w500, w780, original)
 * @returns Full image URL or empty string if path is null
 */
export const getImageUrl = (
  path: string | null,
  size: string = "w500",
): string => {
  if (!path) return "";

  // Check if it's a custom API image (doesn't start with /)
  if (!path.startsWith("/")) {
    const customImageBaseUrl = process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL;

    if (!customImageBaseUrl) {
      console.error("NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL is not configured");
      return "";
    }

    // Ensure no double slashes
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const cleanBaseUrl = customImageBaseUrl.endsWith("/")
      ? customImageBaseUrl
      : `${customImageBaseUrl}/`;

    return `${cleanBaseUrl}${cleanPath}`;
  }

  // TMDB image
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
