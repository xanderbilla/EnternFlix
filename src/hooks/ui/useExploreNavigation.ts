import { useCallback } from "react";
import type { Movie } from "@/types/movie";
import type { TitleData } from "@/hooks/api/useTitle";
import type { DialogType } from "@/hooks/ui/useDialogManager";
import { getImageUrl } from "@/utils/movieHelpers";

interface UseExploreNavigationProps {
  data?: TitleData;
  trendingData?: { results?: Movie[] };
  openCastDialog: (
    title: string,
    movies: Movie[],
    backdropUrl?: string,
    zIndex?: number,
    parentDialog?: DialogType,
  ) => void;
  openDetailDialog: (
    title: string,
    movies: Movie[],
    zIndex?: number,
    parentDialog?: DialogType,
  ) => void;
}

/**
 * Custom hook to handle explore navigation logic
 * Manages data source selection and dialog opening for explore actions
 *
 * @param props - Configuration including data sources and dialog handlers
 * @returns Explore click handler
 */
export function useExploreNavigation({
  data,
  trendingData,
  openCastDialog,
  openDetailDialog,
}: UseExploreNavigationProps) {
  const handleExploreClick = useCallback(
    (query: string, title: string, isCast: boolean = false) => {
      // Use different data sources based on context
      let moviesToShow: Movie[] = [];

      if (isCast) {
        // For cast dialogs, use trending content
        moviesToShow = trendingData?.results?.slice(0, 20) || [];
      } else {
        // For genre/detail dialogs, use trending content
        moviesToShow = trendingData?.results?.slice(0, 20) || [];
      }

      // Fallback if no data is available
      if (moviesToShow.length === 0) {
        moviesToShow = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          title: `${query} Content ${i + 1}`,
          backdrop_path: "/sample-backdrop.jpg",
          poster_path: "/sample-poster.jpg",
          overview: `Content related to ${query}`,
          release_date: "2023-01-01",
          vote_average: 7.5,
          vote_count: 1000,
          popularity: 100.5,
          original_language: "en",
          genre_ids: [28, 12],
        }));
      }

      const backdropUrl = data
        ? getImageUrl((data as TitleData).content?.backdrop_path, "original") ||
          undefined
        : undefined;

      if (isCast) {
        openCastDialog(title, moviesToShow, backdropUrl, 10000, "info");
      } else {
        openDetailDialog(title, moviesToShow, 10000, "info");
      }
    },
    [data, trendingData, openCastDialog, openDetailDialog],
  );

  return {
    handleExploreClick,
  };
}
