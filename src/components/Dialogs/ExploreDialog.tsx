"use client";

import type { ExploreDialogProps } from "@/types/components";
import BaseDialog from "@/components/UI/BaseDialog";
import { DynamicDialogHeader as DialogHeader } from "@/utils/dynamicImports";
import MovieGrid from "@/components/UI/MovieGrid";

export default function ExploreDialog({
  isOpen,
  title,
  movies,
  onClose,
  onMovieClick,
  zIndex = 9999,
}: ExploreDialogProps) {
  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      zIndex={zIndex}
      className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-[1400px] h-[90vh] sm:h-[85vh] md:h-[80vh]"
    >
      {({ handleClose }) => (
        <>
          <DialogHeader title={title} onClose={handleClose} variant="default" />
          <MovieGrid
            movies={movies}
            onMovieClick={onMovieClick}
            columns={4}
            disableHover={true}
          />
        </>
      )}
    </BaseDialog>
  );
}
