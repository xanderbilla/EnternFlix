"use client";

import type { CastDialogProps } from "@/types/components";
import BaseDialog from "@/components/UI/BaseDialog";
import { DynamicDialogHeader as DialogHeader } from "@/utils/dynamicImports";
import MovieGrid from "@/components/UI/MovieGrid";
import CastInfo from "./CastInfo";

export default function CastDialog({
  isOpen,
  castName,
  movies,
  onClose,
  onBack,
  onMovieClick,
  backdropUrl,
  zIndex = 10000,
}: CastDialogProps) {
  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      zIndex={zIndex}
      className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[75vw] max-w-[1200px]"
    >
      {({ handleClose, handleBack }) => (
        <div className="relative">
          <DialogHeader
            title={castName}
            onClose={handleClose}
            onBack={handleBack}
            showBackButton={!!onBack}
            backdropUrl={backdropUrl}
            variant="cast"
            subtitle="Movies & TV Shows"
          />
          <CastInfo
            castName={castName}
            movies={movies}
            onMovieClick={onMovieClick}
          />
        </div>
      )}
    </BaseDialog>
  );
}
