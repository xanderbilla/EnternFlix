import { useState, useCallback } from "react";

/**
 * Custom hook to handle movie transition state and timing
 * Manages the complex state transitions when switching between movies in dialogs
 *
 * @param onMovieChange - Callback to trigger when movie changes
 * @param closeDialog - Callback to close nested dialogs
 * @returns Transition state and handlers
 */
export function useMovieTransition(
  onMovieChange?: (movieId: string) => void,
  closeDialog?: () => void,
) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [internalIsOpen, setInternalIsOpen] = useState(true);

  const transitionToMovie = useCallback(
    (movieId: string) => {
      if (!onMovieChange) {
        // Fallback: just close the nested dialog
        closeDialog?.();
        return;
      }

      // Set transitioning state to prevent main dialog from showing
      setIsTransitioning(true);

      // Close the current dialog to trigger exit animation
      setInternalIsOpen(false);

      // Close all nested dialogs
      closeDialog?.();

      // Wait for dialog close animation to complete (500ms from BaseDialog)
      setTimeout(() => {
        onMovieChange(movieId);
        // Brief delay to ensure state updates, then reopen with enter animation
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
