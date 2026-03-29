"use client";

import { Movie } from "@/types/movie";
import BaseDialog from "@/components/UI/BaseDialog";
import { DynamicDialogHeader as DialogHeader } from "@/utils/dynamicImports";
import MovieGrid from "@/components/UI/MovieGrid";

export interface ExploreDialogProps {
  isOpen: boolean;
  title: string;
  movies: Movie[];
  onClose: () => void;
  onMovieClick: (movieId: number | string) => void;
  zIndex?: number;
}

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
      className="w-full max-w-[80vw]"
    >
      {({ handleClose }) => (
        <>
          <DialogHeader title={title} onClose={handleClose} variant="default" />
          <MovieGrid movies={movies} onMovieClick={onMovieClick} columns={4} />
        </>
      )}
    </BaseDialog>
  );
}
