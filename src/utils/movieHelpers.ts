import { Movie } from "@/types/movie";
import { TEXT_LIMITS } from "@/constants/common";
import { config } from "@/lib/env/env";
import { logger } from "@/lib/logger/logger";

type MovieData = Movie;

export const getContentType = (data: MovieData): string => {
  if (data?.contentType === "TV") return "TV";
  if (data?.contentType === "MOVIE") return "Movie";

  if (data?.firstAirDate && data.firstAirDate !== "0001-01-01") return "TV";
  if (data?.numberOfSeasons && data.numberOfSeasons > 0) return "TV";

  return "Movie";
};

export const getTruncatedTitle = (
  data: MovieData,
  maxLength: number = TEXT_LIMITS.TITLE_MAX,
): string => {
  const title = data?.title;
  if (!title) return "";
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};

export const getGenres = (data: MovieData): string => {
  if (data?.genres && data.genres.length > 0) {
    return data.genres
      .slice(0, 2)
      .map((genre) => genre.name)
      .join(", ");
  }
  const contentType = getContentType(data);
  if (contentType === "TV") {
    return "Drama";
  }
  return "Action";
};

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

export const getReleaseYear = (data: MovieData): string => {
  const date = data?.releaseDate || data?.firstAirDate;
  if (!date || date === "0001-01-01") return "Unknown";
  return date.substring(0, 4);
};

export const getImageUrl = (
  path: string | null,
  _size: string = "w500",
): string => {
  if (!path) return "";

  const base = config.customApi.imageBaseUrl;
  if (!base) {
    logger.error("customApi.imageBaseUrl is not configured");
    return "";
  }
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};
