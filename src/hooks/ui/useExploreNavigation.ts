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

export function useExploreNavigation({
  data,
  trendingData,
  openCastDialog,
  openDetailDialog,
}: UseExploreNavigationProps) {
  const handleExploreClick = useCallback(
    (query: string, title: string, isCast: boolean = false) => {
      let moviesToShow: Movie[] = [];

      if (isCast) {
        moviesToShow = trendingData?.results?.slice(0, 20) || [];
      } else {
        moviesToShow = trendingData?.results?.slice(0, 20) || [];
      }

      if (moviesToShow.length === 0) {
        moviesToShow = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          title: `${query} Content ${i + 1}`,
          backdropPath: "/sample-backdrop.jpg",
          posterPath: "/sample-poster.jpg",
          overview: `Content related to ${query}`,
          releaseDate: "2023-01-01",
          voteAverage: 7.5,
          voteCount: 1000,
          popularity: 100.5,
          originalLanguage: "en",
          genre_ids: [28, 12],
        }));
      }

      const backdropUrl = data
        ? getImageUrl((data as TitleData).content?.backdropPath, "original") ||
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
