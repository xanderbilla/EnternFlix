"use client";

import { useCallback, memo, useState, lazy, Suspense } from "react";
import { usePathname } from "next/navigation";
import { getImageUrl } from "@/utils/movieHelpers";
import { truncateText } from "@/utils/contentHelpers";
import { useRandomContent } from "@/hooks/api/useMovies";
import { DynamicBannerContent as BannerContent } from "@/utils/dynamicImports";
import FavoritesBanner from "./FavoritesBanner";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

const Banner = () => {
  const pathname = usePathname();
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    movieId: "",
  });

  const isFavoritesPage = pathname.includes("/favorites");

  // Only use random content for home variant
  const { data: movie, error } = useRandomContent();

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

  if (error || !movie?.backdrop_path) {
    return null;
  }

  const movieTitle =
    movie.title ?? "Untitled";
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
