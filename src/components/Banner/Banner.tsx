"use client";

import { useCallback, memo, useState, lazy, Suspense } from "react";
import { usePathname } from "next/navigation";
import { getImageUrl } from "@/utils/movieHelpers";
import { truncateText } from "@/utils/contentHelpers";
import { useRandomContent, useCategoryContent } from "@/hooks/api/useMovies";
import { BannerProps } from "@/types/components";
import BannerContent from "./BannerContent";
import FavoritesBanner from "./FavoritesBanner";
import SearchBanner from "./SearchBanner";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

const Banner = ({ category, variant = "home" }: BannerProps) => {
  const pathname = usePathname();
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    movieId: "",
  });

  const isFavoritesPage = pathname.includes("/favorites");
  const isSearchPage = pathname.includes("/search");

  const { data: homeMovie, error: homeError } = useRandomContent();
  const { data: categoryMovie, error: categoryError } = useCategoryContent(
    category || "trending",
  );

  const error = variant === "home" ? homeError : categoryError;
  const movie = variant === "home" ? homeMovie : categoryMovie;

  const handleMoreInfo = useCallback(() => {
    if (movie?.id) {
      setDialogState({ isOpen: true, movieId: movie.id.toString() });
    }
  }, [movie?.id]);

  const handleMovieChange = useCallback((newMovieId: string) => {
    setDialogState((prev) => ({ ...prev, movieId: newMovieId }));
  }, []);

  if (isFavoritesPage) {
    return <FavoritesBanner movie={movie ?? null} />;
  }

  if (isSearchPage) {
    return <SearchBanner movie={movie ?? null} />;
  }

  if (error || !movie?.backdrop_path) {
    return null;
  }

  const movieTitle =
    movie.title ?? movie.name ?? movie.original_name ?? "Untitled";
  const movieDescription = truncateText(movie.overview, 200);
  const backdropUrl = getImageUrl(movie.backdrop_path, "original");

  return (
    <div className="relative h-[85vh] md:h-[90vh] lg:h-[95vh]">
      {/* Backdrop Image - No Video */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('${backdropUrl}')` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

      <BannerContent
        title={movieTitle}
        description={movieDescription}
        movieId={movie.id}
        onMoreInfoClick={handleMoreInfo}
      />

      {/* Title Dialog */}
      {dialogState.isOpen && (
        <Suspense fallback={null}>
          <TitleDialog
            isOpen={dialogState.isOpen}
            titleId={dialogState.movieId}
            onClose={() => setDialogState({ isOpen: false, movieId: "" })}
            onMovieChange={handleMovieChange}
          />
        </Suspense>
      )}
    </div>
  );
};

export default memo(Banner);
