import { Movie } from "@/types/movie";
import { TEXT_LIMITS } from "@/constants/common";

export const getContentRating = (data: Movie): string => {
  if (data?.contentRating) {
    if (data.contentRating === "18_PLUS") return "A 18+";
    if (data.contentRating === "21_PLUS") return "A 21+";
  }

  const year = new Date(
    data?.releaseDate || data?.firstAirDate || "",
  ).getFullYear();

  if (year && year < 2000) return "U/A 18+";

  const genreIds = data?.genres?.map((g) => String(g.id)) || [];
  if (genreIds.includes("27") || genreIds.includes("53")) return "U/A 16+";
  if (genreIds.includes("28") || genreIds.includes("80")) return "U/A 13+";
  return "U/A 7+";
};

export const getQuality = (data: Movie): string => {
  return "HD";
};

export const truncateText = (
  text: string | undefined,
  maxLength: number = TEXT_LIMITS.DESCRIPTION_MAX,
): string => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "..." : text;
};
