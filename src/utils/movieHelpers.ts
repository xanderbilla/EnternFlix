import { Movie } from "@/types/movie";
import { TEXT_LIMITS } from "@/constants/common";

// Type alias for internal use
type MovieData = Movie;

export const getContentType = (data: MovieData): string => {
  // Check if it has TV-specific properties
  if (
    data?.first_air_date ||
    data?.number_of_seasons ||
    data?.number_of_episodes
  ) {
    return "TV Show";
  }
  // Check if it has movie-specific properties
  if (data?.release_date || data?.runtime) {
    return "Movie";
  }
  // Fallback to media_type if available
  if (data?.media_type === "tv") {
    return "TV Show";
  }
  if (data?.media_type === "movie") {
    return "Movie";
  }
  if (data?.media_type === "person") {
    return "Person";
  }
  // Default fallback
  return "Movie";
};

export const getTruncatedTitle = (
  data: MovieData,
  maxLength: number = TEXT_LIMITS.TITLE_MAX,
): string => {
  const title = data?.title || data?.name || data?.original_name;
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
  // Fallback genres based on content type
  const contentType = getContentType(data);
  if (contentType === "TV Show") {
    return "Drama";
  }
  return "Action";
};

export const getDuration = (data: MovieData): string => {
  const contentType = getContentType(data);
  if (contentType === "TV Show") {
    if (data?.number_of_seasons) {
      return `${data.number_of_seasons} Season${data.number_of_seasons > 1 ? "s" : ""}`;
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
  const date = data?.first_air_date || data?.release_date;
  if (!date) return "Unknown";
  return date.slice(0, 4);
};

export const getImageUrl = (
  path: string | null,
  size: string = "w500",
): string => {
  if (!path) return "";

  // Check if it's a custom API image (doesn't start with /)
  if (!path.startsWith("/")) {
    const customImageBaseUrl =
      process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL ||
      "https://bi8s.s3.us-east-1.amazonaws.com/";
    return `${customImageBaseUrl}${path}`;
  }

  // TMDB image
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
