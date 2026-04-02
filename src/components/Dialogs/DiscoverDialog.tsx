"use client";

import type { DiscoverDialogProps } from "@/types/components";
import BaseDialog from "@/components/UI/BaseDialog";
import { DynamicDialogHeader as DialogHeader } from "@/utils/dynamicImports";
import MovieGrid from "@/components/UI/MovieGrid";
import { useDiscoverByAttribute } from "@/hooks/api/useMovies";
import { useMemo } from "react";

export default function DiscoverDialog({
  isOpen,
  attributeId,
  attributeName,
  onClose,
  onBack,
  onMovieClick,
  zIndex = 10000,
}: DiscoverDialogProps) {
  const { data: movies } = useDiscoverByAttribute(attributeId, "all", isOpen);

  // Memoize movies array to prevent reference changes
  const displayMovies = useMemo(() => movies || [], [movies]);

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      zIndex={zIndex}
      className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[75vw] max-w-[1200px] min-h-[90vh] max-h-[95vh]"
    >
      {({ handleClose, handleBack }) => (
        <div className="relative">
          <DialogHeader
            title={attributeName}
            onClose={handleClose}
            onBack={handleBack}
            showBackButton={!!onBack}
            variant="default"
          />
          <MovieGrid
            movies={displayMovies}
            onMovieClick={onMovieClick}
            columns={4}
            disableHover={true}
            disableAnimation={true}
          />
        </div>
      )}
    </BaseDialog>
  );
}
