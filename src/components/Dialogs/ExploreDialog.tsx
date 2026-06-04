"use client";

import type { ExploreDialogProps } from "@/types/components";
import { useRef, useEffect, useMemo } from "react";
import BaseDialog from "@/components/UI/BaseDialog";
import { DynamicDialogHeader as DialogHeader } from "@/utils/dynamicImports";
import MovieGrid from "@/components/UI/MovieGrid";
import { useInfiniteDiscover } from "@/hooks/api/useMovies";
import type { Movie } from "@/types/movie";
import { siteConfig } from "@/config/site";

interface DiscoverPageData {
  items: Movie[];
  nextCursor?: string;
  count: number;
}

export default function ExploreDialog({
  isOpen,
  title,
  movies: initialMovies,
  onClose,
  onMovieClick,
  zIndex = 9999,
  discoverType,
  discoverContent = "all",
  isPaginationEnabled = false,
}: ExploreDialogProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const paginationLockRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalTitle = document.title;

    if (title) {
      document.title = `${title} | ${siteConfig.name}`;
    }

    return () => {
      document.title = originalTitle;
    };
  }, [isOpen, title]);

  // Use infinite query for paginated results if enabled
  const {
    data: paginatedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isPaginationLoading,
  } = useInfiniteDiscover(
    discoverType || "latest",
    discoverContent,
    isPaginationEnabled && isOpen,
  );

  // Flatten paginated data into a single array
  const allMovies = useMemo(() => {
    if (!isPaginationEnabled) {
      return initialMovies;
    }

    // Safely extract pages - handle undefined paginatedData
    if (
      !paginatedData ||
      typeof paginatedData !== "object" ||
      !("pages" in paginatedData)
    ) {
      return initialMovies || [];
    }

    const pages = paginatedData.pages;
    if (!Array.isArray(pages) || pages.length === 0) {
      return initialMovies || [];
    }

    return pages.flatMap((page) => {
      if (!page || typeof page !== "object" || !("items" in page)) {
        return [];
      }
      const itemsArray = (page as DiscoverPageData).items;
      return Array.isArray(itemsArray) ? itemsArray : [];
    });
  }, [paginatedData, initialMovies, isPaginationEnabled]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const element = loadMoreRef.current;
    if (
      !element ||
      !isPaginationEnabled ||
      !hasNextPage ||
      isFetchingNextPage ||
      isPaginationLoading
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !paginationLockRef.current
        ) {
          paginationLockRef.current = true;
          fetchNextPage().finally(() => {
            paginationLockRef.current = false;
          });
        }
      },
      {
        rootMargin: "0px 0px 240px 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isPaginationEnabled,
    isPaginationLoading,
  ]);

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      zIndex={zIndex}
      ariaLabel={`${title} collection`}
      className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[75vw] max-w-[1200px] min-h-[90vh]"
    >
      {({ handleClose }) => (
        <div className="relative flex flex-col">
          <DialogHeader title={title} onClose={handleClose} variant="default" />
          <div>
            <MovieGrid
              movies={allMovies}
              onMovieClick={onMovieClick}
              columns={4}
              disableHover={true}
              disableAnimation={true}
            />
            {isPaginationEnabled && hasNextPage && (
              <div ref={loadMoreRef} className="h-px" aria-hidden="true" />
            )}
          </div>
        </div>
      )}
    </BaseDialog>
  );
}
