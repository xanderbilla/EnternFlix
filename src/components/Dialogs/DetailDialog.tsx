"use client";

import type { DetailDialogProps } from "@/types/components";
import BaseDialog from "@/components/UI/BaseDialog";
import { DynamicDialogHeader as DialogHeader } from "@/utils/dynamicImports";
import MovieGrid from "@/components/UI/MovieGrid";

export default function DetailDialog({
  isOpen,
  title,
  movies,
  onClose,
  onBack,
  onMovieClick,
  zIndex = 10000,
}: DetailDialogProps) {
  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      zIndex={zIndex}
      className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-[1400px] h-[90vh] sm:h-[85vh] md:h-[80vh]"
    >
      {({ handleClose, handleBack }) => (
        <>
          <DialogHeader
            title={title}
            onClose={handleClose}
            onBack={handleBack}
            showBackButton={!!onBack}
            variant="default"
          />
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
