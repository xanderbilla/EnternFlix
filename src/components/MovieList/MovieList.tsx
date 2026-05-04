"use client";

import { useEffect, useState, useMemo, useCallback, useRef, memo } from "react";
import { MovieListProps } from "@/types/components";
import { HOOK_MAP } from "@/constants/hookMap";
import {
  DynamicScrollButton as ScrollButton,
  DynamicMovieListRow as MovieListRow,
  DynamicMovieListHeader as MovieListHeader,
  DynamicDialogRenderer as DialogRenderer,
} from "@/utils/dynamicImports";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import { useMovieScroll } from "@/hooks/ui/useMovieScroll";
import { useDialogBodyScroll } from "@/hooks/ui/useDialogBodyScroll";
import { useBodyOverflow } from "@/hooks/ui/useBodyOverflow";
import { useHoverState } from "@/hooks/ui/useHoverState";

const MovieList: React.FC<MovieListProps> = ({ hookName, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [showExploreButton, setShowExploreButton] = useState(false);

  const useHook = HOOK_MAP[hookName];
  const { data: response, error } = useHook?.() || {};
  const {
    dialogState,
    dialogStack,
    hasBackNavigation,
    openExploreDialog,
    openInfoDialog,
    openCastDialog,
    openDiscoverDialog,
    goBack,
    closeDialog,
  } = useDialogManager();

  const movies = useMemo(() => response?.results || [], [response?.results]);

  const { setOverflowVisible, setOverflowHidden } = useBodyOverflow(
    dialogState.isOpen,
  );

  const {
    isHovered: showButtons,
    handleMouseEnter,
    handleMouseLeave,
  } = useHoverState(setOverflowVisible, setOverflowHidden);

  const shouldShowScrollButtons = useMemo(
    () => movies.length > 7,
    [movies.length],
  );

  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  const { scroll } = useMovieScroll(scrollRef, checkScrollButtons);

  useDialogBodyScroll(dialogState.isOpen);

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
    (movieId: number | string) => {
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left gradient overlay */}
          {!dialogState.isOpen &&
            shouldShowScrollButtons &&
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
              shouldShowScrollButtons &&
              (showButtons || window.innerWidth <= 768) &&
              showLeftButton
            }
          />

          <MovieListRow
            movies={movies}
            scrollRef={scrollRef}
            onMovieClick={handleMovieClick}
          />

          <ScrollButton
            direction="right"
            onClick={() => scroll("right")}
            show={
              !dialogState.isOpen &&
              shouldShowScrollButtons &&
              (showButtons || window.innerWidth <= 768) &&
              showRightButton
            }
          />

          {/* Right gradient overlay */}
          {!dialogState.isOpen &&
            shouldShowScrollButtons &&
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
        dialogStack={dialogStack}
        hasBackNavigation={hasBackNavigation}
        onClose={closeDialog}
        onBack={goBack}
        onMovieClick={handleMovieClick}
        onInfoDialogOpen={handleMovieClick}
        onOpenCastDialog={openCastDialog}
        onOpenDiscoverDialog={openDiscoverDialog}
      />
    </>
  );
};

export default memo(MovieList);
