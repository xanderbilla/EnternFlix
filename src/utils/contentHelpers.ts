import { Movie } from "@/types/movie";
import { TEXT_LIMITS } from "@/constants/common";

export const getContentRating = (data: Movie): string => {
  const year = new Date(
    data?.release_date || data?.first_air_date || "",
  ).getFullYear();
  const isAdult = data?.adult;

  if (isAdult) return "A";
  if (year && year < 2000) return "U/A 18+";
  if (data?.genre_ids?.includes(27) || data?.genre_ids?.includes(53))
    return "U/A 16+";
  if (data?.genre_ids?.includes(28) || data?.genre_ids?.includes(80))
    return "U/A 13+";
  return "U/A 7+";
};

export const getQuality = (data: Movie): string => {
  const popularity = data?.popularity || 0;
  const voteAverage = data?.vote_average || 0;

  if (popularity > 1000 && voteAverage > 8) return "4K";
  if (popularity > 500 && voteAverage > 7) return "FHD";
  if (popularity > 100 && voteAverage > 6) return "HD";
  return "SD";
};

export const truncateText = (
  text: string | undefined,
  maxLength: number = TEXT_LIMITS.DESCRIPTION_MAX,
): string => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "..." : text;
};
