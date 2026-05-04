import { useState, useCallback } from "react";

export function useMovieTransition(
  onMovieChange?: (movieId: string) => void,
  closeDialog?: () => void,
) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [internalIsOpen, setInternalIsOpen] = useState(true);

  const transitionToMovie = useCallback(
    (movieId: string) => {
      if (!onMovieChange) {
        closeDialog?.();
        return;
      }

      setIsTransitioning(true);

      setInternalIsOpen(false);

      closeDialog?.();

      setTimeout(() => {
        onMovieChange(movieId);
        setTimeout(() => {
          setInternalIsOpen(true);
          setIsTransitioning(false);
        }, 50);
      }, 500);
    },
    [onMovieChange, closeDialog],
  );

  return {
    isTransitioning,
    internalIsOpen,
    transitionToMovie,
  };
}
