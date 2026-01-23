"use client";

import { useEffect, useState, useMemo, useCallback, useRef, memo } from "react";
import { MovieListProps } from "@/types/components";
import { HOOK_MAP } from "@/constants/hookMap";
import ScrollButton from "./ScrollButton";
import MovieGrid from "./MovieGrid";
import MovieListHeader from "./MovieListHeader";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import DialogRenderer from "@/components/Dialogs/DialogRenderer";
import { useMovieScroll } from "@/hooks/ui/useMovieScroll";
import { useDialogBodyScroll } from "@/hooks/ui/useDialogBodyScroll";

const MovieList: React.FC<MovieListProps> = ({ hookName, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [showExploreButton, setShowExploreButton] = useState(false);

  const useHook = HOOK_MAP[hookName];
  const { data: response, error } = useHook?.() || {};
  const {
    dialogState,
    hasBackNavigation,
    openExploreDialog,
    openInfoDialog,
    goBack,
    closeDialog,
  } = useDialogManager();

  const movies = useMemo(() => response?.results || [], [response?.results]);

  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  const { scroll } = useMovieScroll(scrollRef, checkScrollButtons);

  useDialogBodyScroll(dialogState.isOpen);

  // Reset hover state when dialog opens
  useEffect(() => {
    if (dialogState.isOpen) {
      setShowButtons(false);
      // Also restore body overflow when dialog opens
      document.body.style.overflowX = "hidden";
    }
  }, [dialogState.isOpen]);

  // Handle explore button visibility with smooth transitions
  const handleTitleHoverEnter = useCallback(() => {
    setShowExploreButton(true);
  }, []);

  const handleTitleHoverLeave = useCallback(() => {
    setShowExploreButton(false);
  }, []);

  const handleExploreClick = useCallback(() => {
    openExploreDialog(title, movies);
  }, [openExploreDialog, title, movies]);

  const handleMovieClick = useCallback(
    (movieId: number) => {
      openInfoDialog(movieId.toString(), 10000);
    },
    [openInfoDialog],
  );

  useEffect(() => {
    const handleScroll = () => {
      checkScrollButtons();
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      checkScrollButtons();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [movies, checkScrollButtons]);

  if (!useHook) {
    return null;
  }

  if (error || !movies || movies.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-4 space-y-4 relative overflow-visible">
        <div className="px-4 md:px-12">
          <MovieListHeader
            title={title}
            showExploreButton={showExploreButton}
            onExploreClick={handleExploreClick}
            onTitleHover={{
              onEnter: handleTitleHoverEnter,
              onLeave: handleTitleHoverLeave,
            }}
          />
        </div>
        <div
          className="relative overflow-visible group/movielist"
          onMouseEnter={() => {
            setShowButtons(true);
            // Temporarily allow horizontal overflow for hover overlays
            document.body.style.overflowX = "visible";
          }}
          onMouseLeave={() => {
            setShowButtons(false);
            // Restore horizontal overflow hidden
            document.body.style.overflowX = "hidden";
          }}
        >
          {/* Left gradient overlay */}
          {!dialogState.isOpen &&
            (showButtons || window.innerWidth <= 768) &&
            showLeftButton && (
              <div
                className="absolute left-0 top-0 bottom-0 w-32 z-[58] bg-gradient-to-r from-black/60 via-black/30 to-transparent cursor-pointer"
                onClick={() => scroll("left")}
              />
            )}

          <ScrollButton
            direction="left"
            onClick={() => scroll("left")}
            show={
              !dialogState.isOpen &&
              (showButtons || window.innerWidth <= 768) &&
              showLeftButton
            }
          />

          <MovieGrid
            movies={movies}
            scrollRef={scrollRef}
            onMovieClick={handleMovieClick}
          />

          <ScrollButton
            direction="right"
            onClick={() => scroll("right")}
            show={
              !dialogState.isOpen &&
              (showButtons || window.innerWidth <= 768) &&
              showRightButton
            }
          />

          {/* Right gradient overlay */}
          {!dialogState.isOpen &&
            (showButtons || window.innerWidth <= 768) &&
            showRightButton && (
              <div
                className="absolute right-0 top-0 bottom-0 w-32 z-[58] bg-gradient-to-l from-black/60 via-black/30 to-transparent cursor-pointer"
                onClick={() => scroll("right")}
              />
            )}
        </div>
      </div>

      <DialogRenderer
        dialogState={dialogState}
        hasBackNavigation={hasBackNavigation}
        onClose={closeDialog}
        onBack={goBack}
        onMovieClick={handleMovieClick}
        onInfoDialogOpen={handleMovieClick} // For MovieList, both actions are the same
      />
    </>
  );
};

export default memo(MovieList);
