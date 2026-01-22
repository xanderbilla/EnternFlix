"use client";

import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { ExploreDialogProps } from "@/types/components";
import { useVideo } from "@/contexts/VideoContext";
import ExploreDialogHeader from "./ExploreDialogHeader";
import ExploreDialogGrid from "./ExploreDialogGrid";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

export default function ExploreDialog({
  isOpen,
  title,
  movies,
  onClose,
  zIndex = 9999,
  showBackButton = false,
  backdropUrl,
  isCastDialog = false,
}: ExploreDialogProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [showTitleDialog, setShowTitleDialog] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { pauseBanner, resumeBanner } = useVideo();

  const handleClose = useCallback(() => {
    setIsEntering(false);
    setIsClosing(true);
    // Only resume banner if TitleDialog is not open (TitleDialog will handle its own video context)
    if (!showTitleDialog) {
      resumeBanner();
    }
    setTimeout(() => {
      onClose();
    }, 400);
  }, [showTitleDialog, resumeBanner, onClose]);

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId.toString());
    setIsTransitioning(true);

    // Start closing animation
    setIsEntering(false);
    setIsClosing(true);

    // After animation starts, show TitleDialog
    setTimeout(() => {
      setShowTitleDialog(true);
    }, 200);
  };

  useEffect(() => {
    if (isOpen && !isTransitioning) {
      setIsClosing(false);
      // Only pause banner if TitleDialog is not open
      if (!showTitleDialog) {
        pauseBanner();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsEntering(true);
        });
      });
    }

    return () => {
      // Only resume banner if we were the ones who paused it
      if (isOpen && !showTitleDialog && !isTransitioning) {
        resumeBanner();
      }
    };
  }, [isOpen, isTransitioning, showTitleDialog, pauseBanner, resumeBanner]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && !showTitleDialog) {
        handleClose();
      }
    };

    if (isOpen && !showTitleDialog) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, showTitleDialog, handleClose]);

  const handleMovieChange = useCallback((newMovieId: string) => {
    setSelectedMovieId(newMovieId);
  }, []);

  const handleTitleDialogClose = () => {
    setShowTitleDialog(false);
    setSelectedMovieId("");
    setIsTransitioning(false);
    // Close the ExploreDialog as well when TitleDialog closes
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {!showTitleDialog && (
        <div
          className={`fixed inset-0 bg-black/50 overflow-y-auto no-scrollbar transition-all duration-[400ms] ease-in-out ${
            isEntering && !isClosing ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex }}
          onClick={handleClose}
        >
          <div className="min-h-full flex items-center justify-center pt-8">
            <div
              className={`bg-zinc-900 rounded-lg shadow-2xl w-full max-w-[80vw] overflow-hidden transition-all duration-[400ms] ease-in-out origin-center ${
                isEntering && !isClosing
                  ? "scale-100 opacity-100"
                  : "scale-90 opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExploreDialogHeader
                title={title}
                onClose={handleClose}
                showBackButton={showBackButton}
                backdropUrl={backdropUrl}
                isCastDialog={isCastDialog}
              />
              <ExploreDialogGrid
                movies={movies}
                onMovieClick={handleMovieClick}
              />
            </div>
          </div>
        </div>
      )}

      {showTitleDialog && (
        <Suspense fallback={null}>
          <TitleDialog
            isOpen={showTitleDialog}
            titleId={selectedMovieId}
            onClose={handleTitleDialogClose}
            onMovieChange={handleMovieChange}
          />
        </Suspense>
      )}
    </>
  );
}
