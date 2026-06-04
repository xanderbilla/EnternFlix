"use client";

import { useMemo, memo } from "react";
import { HOOK_MAP } from "@/constants/hookMap";
import MovieGrid from "@/components/UI/MovieGrid";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import { DynamicDialogRenderer as DialogRenderer } from "@/utils/dynamicImports";

interface MovieGridSectionProps {
  title: string;
  hookName: string;
}

function MovieGridSection({ title, hookName }: MovieGridSectionProps) {
  const useHook = HOOK_MAP[hookName];
  const { data: response, isLoading } = useHook?.() || {};
  const {
    dialogStack,
    hasBackNavigation,
    openInfoDialog,
    openCastDialog,
    goBack,
    closeDialog,
  } = useDialogManager();

  const movies = useMemo(() => response?.results || [], [response?.results]);

  const handleMovieClick = (movieId: number | string) => {
    openInfoDialog(movieId.toString(), 10000);
  };

  if (!useHook) return null;

  return (
    <div className="space-y-3">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <h2 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
          {title}
        </h2>
      </div>
      <MovieGrid
        movies={movies}
        onMovieClick={handleMovieClick}
        isLoading={isLoading}
        columns={6}
        eagerLoadCount={6}
      />
      <DialogRenderer
        dialogStack={dialogStack}
        hasBackNavigation={hasBackNavigation}
        onClose={closeDialog}
        onBack={goBack}
        onMovieClick={handleMovieClick}
        onInfoDialogOpen={handleMovieClick}
        onOpenCastDialog={openCastDialog}
      />
    </div>
  );
}

export default memo(MovieGridSection);
