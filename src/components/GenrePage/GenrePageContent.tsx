"use client";

import Link from "next/link";
import { useMemo, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/Layout/PageLayout";
import MovieGrid from "@/components/UI/MovieGrid";
import SortDropdown, { type SortOption } from "@/components/UI/SortDropdown";
import {
  useInfiniteDiscoverByAttribute,
  useGenresAttributes,
} from "@/hooks/api/useMovies";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import { DynamicDialogRenderer as DialogRenderer } from "@/utils/dynamicImports";

interface GenrePageContentProps {
  genreId: string;
  contentType?: "movie" | "tv" | "all";
}

type DiscoverSort = "alpha_asc" | "alpha_desc";

const DISCOVER_SORT_OPTIONS: SortOption[] = [
  { value: "alpha_asc", label: "Sort by A - Z" },
  { value: "alpha_desc", label: "Sort by Z - A" },
];

const isDiscoverSort = (value: string | null): value is DiscoverSort =>
  value === "alpha_asc" || value === "alpha_desc";

export default function GenrePageContent({
  genreId,
  contentType = "all",
}: GenrePageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawSort = searchParams.get("sort");
  const selectedSort: DiscoverSort | "" = isDiscoverSort(rawSort)
    ? rawSort
    : "";

  const genreQueryType = contentType === "all" ? "movie" : contentType;
  const { data: genres } = useGenresAttributes(genreQueryType);
  const {
    data: pagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteDiscoverByAttribute(
    genreId,
    contentType,
    !!genreId,
    selectedSort || undefined,
  );
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

  const handleMovieClick = (movieId: number | string) => {
    openInfoDialog(movieId.toString(), 10000);
  };

  const genreName = useMemo(
    () => genres?.find((genre) => genre.id === genreId)?.name ?? "",
    [genres, genreId],
  );

  return (
    <PageLayout showBanner={false} reserveTopPaddingWhenNoBanner={false}>
      <section className="relative z-10 pt-[66px] pb-8 md:pb-12 bg-zinc-900 min-h-screen">
        {genreName && (
          <div className="sticky top-[66px] z-20 flex min-h-[68px] items-center px-4 sm:px-6 md:px-16 py-3 bg-zinc-900 transition duration-500">
            <div className="flex items-center gap-2 text-white/70">
              {contentType !== "all" && (
                <>
                  <Link
                    href={
                      contentType === "tv"
                        ? "/browse/tv-shows"
                        : "/browse/movies"
                    }
                    className="text-zinc-400 text-[13px] md:text-[16px] font-normal leading-none hover:text-zinc-200 transition-colors"
                  >
                    {contentType === "tv" ? "TV Shows" : "Movies"}
                  </Link>
                  <span className="text-zinc-400 text-[13px] md:text-[16px] font-normal leading-none">
                    &gt;
                  </span>
                </>
              )}
              <h1 className="text-white text-lg sm:text-xl md:text-[22px] lg:text-[30px] font-medium leading-none">
                {genreName}
              </h1>
            </div>

            <div className="ml-auto">
              <SortDropdown
                value={selectedSort}
                options={DISCOVER_SORT_OPTIONS}
                onChange={handleSortChange}
                buttonLabel="Sort By Title"
                ariaLabel="Sort genre titles"
                showOptionIcon={false}
              />
            </div>
          </div>
        )}

        <div className="px-4 sm:px-6 md:px-16">
          <MovieGrid
            movies={movies}
            onMovieClick={handleMovieClick}
            columns={6}
            disableAnimation={true}
            fullWidth={true}
          />
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
