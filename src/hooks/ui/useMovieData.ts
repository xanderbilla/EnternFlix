import { useMemo } from "react";
import { Movie } from "@/types/movie";
import {
  getTruncatedTitle,
  getContentType,
  getGenres,
  getDuration,
  getReleaseYear,
  getImageUrl,
} from "@/utils/movieHelpers";
import { getContentRating, getQuality } from "@/utils/contentHelpers";

/**
 * Custom hook to compute and memoize all movie-related data
 * Consolidates multiple utility function calls into a single memoized object
 *
 * @param data - Movie data from API
 * @returns Memoized object with all computed movie properties
 */
export const useMovieData = (data: Movie | undefined) => {
  return useMemo(() => {
    if (!data) {
      return {
        truncatedTitle: "",
        contentType: "Movie",
        genres: "",
        duration: "",
        releaseYear: "Unknown",
        posterUrl: "",
        backdropUrl: "",
        contentRating: "U/A 7+",
        quality: "HD",
      };
    }

    return {
      truncatedTitle: getTruncatedTitle(data),
      contentType: getContentType(data),
      genres: getGenres(data),
      duration: getDuration(data),
      releaseYear: getReleaseYear(data),
      posterUrl: getImageUrl(data?.posterPath),
      backdropUrl: getImageUrl(data?.backdropPath),
      contentRating: getContentRating(data),
      quality: getQuality(data),
    };
  }, [data]);
};
