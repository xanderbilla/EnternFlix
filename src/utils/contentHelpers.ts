import { Movie } from "@/types/movie";
import { TEXT_LIMITS } from "@/constants/common";

/**
 * Get content rating based on movie data
 * Determines age-appropriate rating using content_rating field or fallback logic
 * @param data - Movie object containing rating and metadata
 * @returns Content rating string (A, A 18+, A 21+, U/A 7+, U/A 13+, U/A 16+, U/A 18+)
 */
export const getContentRating = (data: Movie): string => {
  // Use the content_rating field from API if available
  if (data?.content_rating) {
    // Convert "18_PLUS" to "A 18+" and "21_PLUS" to "A 21+"
    if (data.content_rating === "18_PLUS") return "A 18+";
    if (data.content_rating === "21_PLUS") return "A 21+";
  }

  // Fallback logic for TMDB data
  const year = new Date(
    data?.release_date || data?.first_air_date || "",
  ).getFullYear();
  const isAdult = data?.adult;

  if (isAdult) return "A";
  if (year && year < 2000) return "U/A 18+";

  // Check genres array instead of genre_ids
  const genreIds = data?.genres?.map((g) => g.id) || [];
  if (genreIds.includes(27) || genreIds.includes(53)) return "U/A 16+";
  if (genreIds.includes(28) || genreIds.includes(80)) return "U/A 13+";
  return "U/A 7+";
};

/**
 * Determine video quality based on popularity and rating
 * Uses popularity and vote average to estimate available video quality
 * @param data - Movie object containing popularity and vote_average
 * @returns Quality string (4K, FHD, HD, SD)
 */
export const getQuality = (data: Movie): string => {
  const popularity = data?.popularity || 0;
  const voteAverage = data?.vote_average || 0;

  if (popularity > 1000 && voteAverage > 8) return "4K";
  if (popularity > 500 && voteAverage > 7) return "FHD";
  if (popularity > 100 && voteAverage > 6) return "HD";
  return "SD";
};

/**
 * Truncate text to specified length with ellipsis
 * Adds "..." to the end if text exceeds maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation (default: TEXT_LIMITS.DESCRIPTION_MAX)
 * @returns Truncated text with ellipsis or original text if within limit
 */
export const truncateText = (
  text: string | undefined,
  maxLength: number = TEXT_LIMITS.DESCRIPTION_MAX,
): string => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "..." : text;
};
