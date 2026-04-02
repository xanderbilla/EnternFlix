import { Movie } from "@/types/movie";
import { TEXT_LIMITS } from "@/constants/common";

/**
 * Get content rating based on movie data
 * Determines age-appropriate rating using contentRating field or fallback logic
 * @param data - Movie object containing rating and metadata
 * @returns Content rating string (A, A 18+, A 21+, U/A 7+, U/A 13+, U/A 16+, U/A 18+)
 */
export const getContentRating = (data: Movie): string => {
  // Use the contentRating field from API if available
  if (data?.contentRating) {
    // Convert "18_PLUS" to "A 18+" and "21_PLUS" to "A 21+"
    if (data.contentRating === "18_PLUS") return "A 18+";
    if (data.contentRating === "21_PLUS") return "A 21+";
  }

  // Fallback logic for data without contentRating
  const year = new Date(
    data?.releaseDate || data?.firstAirDate || "",
  ).getFullYear();

  if (year && year < 2000) return "U/A 18+";

  // Check genres array instead of genre_ids
  const genreIds = data?.genres?.map((g) => g.id) || [];
  if (genreIds.includes(27) || genreIds.includes(53)) return "U/A 16+";
  if (genreIds.includes(28) || genreIds.includes(80)) return "U/A 13+";
  return "U/A 7+";
};

/**
 * Determine video quality based on popularity and rating
 * Returns default quality since popularity and voteAverage are not available in new API
 * @param data - Movie object
 * @returns Quality string (HD as default)
 */
export const getQuality = (data: Movie): string => {
  // Default to HD since we don't have popularity/voteAverage in new API
  return "HD";
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
