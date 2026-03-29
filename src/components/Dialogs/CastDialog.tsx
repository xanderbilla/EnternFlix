"use client";

import { Movie } from "@/types/movie";
import BaseDialog from "@/components/UI/BaseDialog";
import { DynamicDialogHeader as DialogHeader } from "@/utils/dynamicImports";
import MovieGrid from "@/components/UI/MovieGrid";

export interface CastDialogProps {
  isOpen: boolean;
  castName: string;
  movies: Movie[];
  onClose: () => void;
  onBack?: () => void;
  onMovieClick: (movieId: number | string) => void;
  backdropUrl?: string;
  zIndex?: number;
}

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
      className="w-full max-w-4xl"
    >
      {({ handleClose, handleBack }) => (
        <>
          <DialogHeader
            title={castName}
            onClose={handleClose}
            onBack={handleBack}
            showBackButton={!!onBack}
            backdropUrl={backdropUrl}
            variant="cast"
            subtitle="Movies & TV Shows"
          />
          <MovieGrid movies={movies} onMovieClick={onMovieClick} columns={4} />
        </>
      )}
    </BaseDialog>
  );
}
