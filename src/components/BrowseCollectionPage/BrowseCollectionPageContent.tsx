"use client";

import { useMemo, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/Layout/PageLayout";
import MovieGrid from "@/components/UI/MovieGrid";
import SortDropdown, { type SortOption } from "@/components/UI/SortDropdown";
import { useInfiniteDiscover } from "@/hooks/api/useMovies";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import { DynamicDialogRenderer as DialogRenderer } from "@/utils/dynamicImports";

type BrowseMode = "latest" | "recent" | "popular" | "trending";
type ContentType = "movie" | "tv" | "all";
type DiscoverSort = "alpha_asc" | "alpha_desc";

interface BrowseCollectionPageContentProps {
  mode: BrowseMode;
  contentType: ContentType;
}

const DISCOVER_SORT_OPTIONS: SortOption[] = [
  { value: "alpha_asc", label: "Sort by A - Z" },
  { value: "alpha_desc", label: "Sort by Z - A" },
];

const isDiscoverSort = (value: string | null): value is DiscoverSort =>
  value === "alpha_asc" || value === "alpha_desc";

export default function BrowseCollectionPageContent({
  mode,
  contentType,
}: BrowseCollectionPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawSort = searchParams.get("sort");
  const selectedSort: DiscoverSort | "" = isDiscoverSort(rawSort)
    ? rawSort
    : "";

  const {
    data: pagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteDiscover(mode, contentType, true, selectedSort || undefined);

  const {
    dialogStack,
    hasBackNavigation,
    openInfoDialog,
    openCastDialog,
    goBack,
    closeDialog,
  } = useDialogManager();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const movies = useMemo(() => {
    if (!pagesData?.pages) return [];
    return pagesData.pages.flatMap((page) => page.items || []);
  }, [pagesData]);

  const handleSortChange = useCallback(
    (sort: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (sort) {
        params.set("sort", sort);
      } else {
        params.delete("sort");
      }

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams],
  );

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const typeSuffix =
    contentType === "tv"
      ? " TV Shows"
      : contentType === "movie"
        ? " Movies"
        : "";

  const heading =
    mode === "recent"
      ? `Recently Added${typeSuffix}`
      : mode === "latest"
        ? `Latest Release${typeSuffix}`
        : mode === "popular"
          ? `Popular${typeSuffix}`
          : `Trending${typeSuffix}`;

  const handleMovieClick = (movieId: number | string) => {
    openInfoDialog(movieId.toString(), 10000);
  };

  return (
    <PageLayout showBanner={false} reserveTopPaddingWhenNoBanner={false}>
      <section className="relative z-10 pt-16 md:pt-20 pb-8 md:pb-12 bg-zinc-900 min-h-screen">
        <div className="sticky top-[66px] z-20 flex min-h-[68px] items-center px-4 md:px-16 py-3 bg-zinc-900 transition duration-500">
          <div className="flex items-center gap-2 text-white/70">
            <h1 className="text-white text-[22px] md:text-[30px] font-medium leading-none">
              {heading}
            </h1>
          </div>

          <div className="ml-auto">
            <SortDropdown
              value={selectedSort}
              options={DISCOVER_SORT_OPTIONS}
              onChange={handleSortChange}
              buttonLabel="Sort By Title"
              ariaLabel="Sort titles"
              showOptionIcon={false}
            />
          </div>
        </div>

        <div className="px-4 md:px-16">
          <MovieGrid
            movies={movies}
            onMovieClick={handleMovieClick}
            columns={6}
            disableAnimation={true}
            fullWidth={true}
          />
          {/* Infinite scroll trigger */}
          <div ref={loadMoreRef} className="h-px" />
        </div>
      </section>

      <DialogRenderer
        dialogStack={dialogStack}
        hasBackNavigation={hasBackNavigation}
        onClose={closeDialog}
        onBack={goBack}
        onMovieClick={handleMovieClick}
        onInfoDialogOpen={handleMovieClick}
        onOpenCastDialog={openCastDialog}
      />
    </PageLayout>
  );
}
