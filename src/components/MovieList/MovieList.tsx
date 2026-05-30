"use client";

import { useEffect, useState, useMemo, useCallback, useRef, memo } from "react";
import { MovieListProps } from "@/types/components";
import { HOOK_MAP } from "@/constants/hookMap";
import { Movie } from "@/types/movie";
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
import { useRouter } from "next/navigation";
import MovieListSkeleton from "@/components/MovieList/MovieListSkeleton";
import {
  fetchFreshExploreMovies,
  getDiscoverNavigation,
} from "@/services/content/exploreContent";

const MovieList: React.FC<MovieListProps> = ({ hookName, title }) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [showExploreButton, setShowExploreButton] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);

  const useHook = HOOK_MAP[hookName];
  const { data: response, error, isLoading } = useHook?.() || {};
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
  const listMovies = useMemo(() => movies.slice(0, 20), [movies]);

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

  const shouldShowInteractiveScroll =
    shouldShowScrollButtons && (showButtons || isCompactViewport);

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

  const handleExploreClick = useCallback(async () => {
    try {
      const freshMovies = await fetchFreshExploreMovies(hookName, movies);
      const discoverNavigation = getDiscoverNavigation(hookName);

      if (discoverNavigation) {
        const { pagePath, queryType } = discoverNavigation;
        router.push(queryType ? `${pagePath}?type=${queryType}` : pagePath);
      } else {
        // Disable pagination for non-discover lists (backward compatibility)
        openExploreDialog(title, freshMovies.length > 0 ? freshMovies : movies);
      }
    } catch {
      openExploreDialog(title, movies);
    }
  }, [openExploreDialog, title, movies, hookName, router]);

  const handleMovieClick = useCallback(
    (movieId: number | string) => {
      openInfoDialog(movieId.toString(), 10000);
    },
    [openInfoDialog],
  );

  useEffect(() => {
    const syncViewport = () => {
      setIsCompactViewport(window.innerWidth <= 768);
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => {
      window.removeEventListener("resize", syncViewport);
    };
  }, []);

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

  if (isLoading) {
    return <MovieListSkeleton title={title} />;
  }

  if (error) {
    return null;
  }

  if (!movies || movies.length === 0) {
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
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          role="region"
          aria-label={`${title} carousel`}
        >
          {/* Left gradient overlay */}
          {!dialogState.isOpen &&
            shouldShowInteractiveScroll &&
            showLeftButton && (
              <button
                type="button"
                className="absolute left-0 top-0 bottom-0 w-32 z-[58] bg-gradient-to-r from-black/60 via-black/30 to-transparent cursor-pointer"
                onClick={() => scroll("left")}
                aria-label="Scroll list left"
              />
            )}

          <ScrollButton
            direction="left"
            onClick={() => scroll("left")}
            show={
              !dialogState.isOpen &&
              shouldShowInteractiveScroll &&
              showLeftButton
            }
          />

          <MovieListRow
            movies={listMovies}
            scrollRef={scrollRef}
            onMovieClick={handleMovieClick}
          />

          <ScrollButton
            direction="right"
            onClick={() => scroll("right")}
            show={
              !dialogState.isOpen &&
              shouldShowInteractiveScroll &&
              showRightButton
            }
          />

          {/* Right gradient overlay */}
          {!dialogState.isOpen &&
            shouldShowInteractiveScroll &&
            showRightButton && (
              <button
                type="button"
                className="absolute right-0 top-0 bottom-0 w-32 z-[58] bg-gradient-to-l from-black/60 via-black/30 to-transparent cursor-pointer"
                onClick={() => scroll("right")}
                aria-label="Scroll list right"
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
