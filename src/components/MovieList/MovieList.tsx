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
      <div className="px-4 md:px-12 mt-4 space-y-4 relative">
        <div className="flex flex-col gap-3">
          <MovieListHeader
            title={title}
            showExploreButton={showExploreButton}
            onExploreClick={handleExploreClick}
            onTitleHover={{
              onEnter: handleTitleHoverEnter,
              onLeave: handleTitleHoverLeave,
            }}
          />
          <div
            className="relative overflow-visible"
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
          >
            <ScrollButton
              direction="left"
              onClick={() => scroll("left")}
              show={(showButtons || window.innerWidth <= 768) && showLeftButton}
            />

            <MovieGrid movies={movies} scrollRef={scrollRef} />

            <ScrollButton
              direction="right"
              onClick={() => scroll("right")}
              show={
                (showButtons || window.innerWidth <= 768) && showRightButton
              }
            />
          </div>
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
