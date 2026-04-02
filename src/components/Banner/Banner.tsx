"use client";

import { useCallback, memo, lazy, Suspense } from "react";
import { usePathname } from "next/navigation";
import { getImageUrl } from "@/utils/movieHelpers";
import { truncateText } from "@/utils/contentHelpers";
import { useBanner } from "@/hooks/api/useMovies";
import { DynamicBannerContent as BannerContent } from "@/utils/dynamicImports";
import { DynamicDialogRenderer as DialogRenderer } from "@/utils/dynamicImports";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import FavoritesBanner from "./FavoritesBanner";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

const Banner = () => {
  const pathname = usePathname();
  const {
    dialogState,
    dialogStack,
    hasBackNavigation,
    openInfoDialog,
    openCastDialog,
    openDiscoverDialog,
    goBack,
    closeDialog,
  } = useDialogManager();

  const isFavoritesPage = pathname.includes("/favorites");

  // Use banner endpoint for home page
  const { data: movie, error } = useBanner();

  const handleMoreInfo = useCallback(() => {
    if (movie?.id) {
      openInfoDialog(movie.id.toString(), 9999);
    }
  }, [movie?.id, openInfoDialog]);

  const handleMovieChange = useCallback(
    (newMovieId: string | number) => {
      openInfoDialog(newMovieId.toString(), 9999);
    },
    [openInfoDialog],
  );

  if (isFavoritesPage) {
    return <FavoritesBanner movie={movie ?? null} />;
  }

  if (error || !movie?.backdropPath) {
    return null;
  }

  const movieTitle = movie.title ?? "Untitled";
  const movieDescription = truncateText(movie.overview, 200);
  const backdropUrl = getImageUrl(movie.backdropPath, "original");

  return (
    <div className="relative h-[85vh] md:h-[92vh] lg:h-[100vh]">
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

      {/* Dialog Renderer for all dialogs */}
      <DialogRenderer
        dialogStack={dialogStack}
        hasBackNavigation={hasBackNavigation}
        onClose={closeDialog}
        onBack={goBack}
        onMovieClick={handleMovieChange}
        onInfoDialogOpen={handleMovieChange}
        onOpenCastDialog={openCastDialog}
        onOpenDiscoverDialog={openDiscoverDialog}
      />
    </div>
  );
};

export default memo(Banner);
