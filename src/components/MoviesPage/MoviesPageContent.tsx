"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import PageLayout from "@/components/Layout/PageLayout";
import { DynamicMovieList } from "@/utils/dynamicImports";
import { MovieListItem } from "@/types/components";
import {
  useBanner,
  useDiscover,
  useDiscoverByAttribute,
  useGenresAttributes,
} from "@/hooks/api/useMovies";
import { getImageUrl } from "@/utils/movieHelpers";
import { useDropdown } from "@/hooks/ui/useDropdown";
import MovieGrid from "@/components/UI/MovieGrid";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import { useNavbar } from "@/hooks/ui/useNavbar";
import { DynamicDialogRenderer as DialogRenderer } from "@/utils/dynamicImports";

type SelectedGenre = {
  id: string;
  name: string;
} | null;

interface MoviesPageContentProps {
  movieLists: MovieListItem[];
  contentType?: "movie" | "tv";
  heroTitle?: string;
  heroDescription?: string;
}

export default function MoviesPageContent({
  movieLists,
  contentType = "movie",
  heroTitle = "Experience Cinema at Home",
  heroDescription = "Watch the latest blockbusters and timeless classics from the comfort of your home.",
}: MoviesPageContentProps) {
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const router = useRouter();

  const { data: bannerMovie } = useBanner(contentType);
  const { data: recentContent } = useDiscover("recent", contentType);
  const { data: latestContent } = useDiscover("latest", contentType);
  const {
    data: genres,
    isLoading: isGenresLoading,
    isError: isGenresError,
  } = useGenresAttributes(contentType);
  const {
    dialogStack,
    hasBackNavigation,
    openInfoDialog,
    openCastDialog,
    openDiscoverDialog,
    goBack,
    closeDialog,
  } = useDialogManager();
  const { showBackground } = useNavbar();

  // Kick off browser image decode while other data is loading.
  useEffect(() => {
    if (!bannerMovie?.backdropPath) return;
    const url = getImageUrl(bannerMovie.backdropPath, "original");
    if (!url) return;
    const img = document.createElement("img");
    img.src = url;
  }, [bannerMovie?.backdropPath]);

  const { dropdownRef } = useDropdown(isGenresOpen, () =>
    setIsGenresOpen(false),
  );
  const showHeroBanner = true;

  const hasListContent =
    (recentContent?.results?.length ?? 0) > 0 ||
    (latestContent?.results?.length ?? 0) > 0;
  const isContentReady = showHeroBanner || hasListContent;

  const genreOptions = useMemo(() => genres ?? [], [genres]);
  const selectedGenreLabel = "Genres";

  const isPageLoading = !bannerMovie || !recentContent || !latestContent;

  const backdropUrl = bannerMovie?.backdropPath
    ? getImageUrl(bannerMovie.backdropPath, "original")
    : null;

  const pageTitle = contentType === "tv" ? "TV Shows" : "Movies";

  const handleMovieClick = (movieId: number | string) => {
    openInfoDialog(movieId.toString(), 10000);
  };

  const basePageHref = contentType === "tv" ? "/tv-shows" : "/movies";

  return (
    <PageLayout
      showBanner={false}
      isContentReady={isContentReady}
      reserveTopPaddingWhenNoBanner={false}
    >
      {/* Banner Section */}
      {showHeroBanner && (
        <div className="relative h-[50vh] sm:h-[58vh] md:h-[65vh] -mt-24">
          {backdropUrl ? (
            <>
              <Image
                src={backdropUrl}
                alt={heroTitle}
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
            </>
          )}
          {/* Sticky: always sits just below the fixed navbar while the banner is in view */}
          <div
            className="sticky top-16 md:top-[72px] z-20 px-3 sm:px-6 md:px-16 pt-2 pb-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 md:gap-4"
            ref={dropdownRef}
          >
            <h1 className="text-white text-2xl md:text-4xl font-semibold leading-none">
              {pageTitle}
            </h1>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsGenresOpen((current) => !current)}
                className="flex items-center gap-2 border border-white/70 bg-black/65 px-2.5 py-1.5 text-white font-medium text-[13px] md:text-sm leading-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                aria-label="Select genre"
              >
                <span>{selectedGenreLabel}</span>
                <span className="inline-block h-0 w-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-current" />
              </button>

              {isGenresOpen && (
                <div className="absolute left-0 top-full -mt-px w-[min(90vw,560px)] max-h-80 overflow-y-auto rounded-[2px] border border-zinc-700 bg-black/95 p-2.5 shadow-xl z-30">
                  {isGenresLoading ? (
                    <div className="px-2 py-1 text-zinc-400 text-[12px] md:text-[13px]">
                      Loading genres...
                    </div>
                  ) : isGenresError ? (
                    <div className="px-2 py-1 text-red-300 text-[12px] md:text-[13px]">
                      Failed to load genres
                    </div>
                  ) : genreOptions.length === 0 ? (
                    <div className="px-2 py-1 text-zinc-400 text-[12px] md:text-[13px]">
                      No genres
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-x-3 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsGenresOpen(false);
                          router.push(basePageHref);
                        }}
                        className="text-left px-2 py-0.5 text-[12px] md:text-[13px] leading-5 text-white/85 hover:text-white hover:underline hover:underline-offset-4 transition-colors focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                      >
                        All Genres
                      </button>
                      {genreOptions.map((genre) => (
                        <button
                          key={genre.id}
                          type="button"
                          onClick={() => {
                            setIsGenresOpen(false);
                            router.push(
                              `/browse/genre/${genre.id}?type=${contentType}`,
                            );
                          }}
                          className="text-left px-2 py-0.5 text-[12px] md:text-[13px] leading-5 text-white/90 hover:text-white hover:underline hover:underline-offset-4 transition-colors focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                        >
                          {genre.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-0 right-0 z-20 px-4 sm:px-6 md:px-16">
            <h1 className="font-bold text-white mb-2 leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {heroTitle}
            </h1>
            <p className="text-white/90 max-w-3xl leading-relaxed text-base sm:text-lg md:text-xl">
              {heroDescription}
            </p>
          </div>
        </div>
      )}

      {/* Movie Lists Section */}
      <div
        className={`relative z-10 space-y-6 ${isPageLoading ? "-mt-32 md:-mt-40 lg:-mt-48" : "-mt-32 md:-mt-40 lg:-mt-48"}`}
      >
        {/* Configured Movie Lists */}
        {movieLists.map((list) => (
          <DynamicMovieList
            key={list.hookName}
            title={list.title}
            hookName={list.hookName}
          />
        ))}
      </div>

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
