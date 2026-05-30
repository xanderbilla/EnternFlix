"use client";

import type { SearchResultsProps } from "@/types/components";
import Image from "next/image";
import MovieGrid from "@/components/UI/MovieGrid";
import { getImageUrl } from "@/utils/movieHelpers";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import { DynamicDialogRenderer as DialogRenderer } from "@/utils/dynamicImports";

export default function SearchResults({
  debouncedQuery,
  searchRes,
  peopleRes,
  contentCount,
  peopleCount,
  selectedMode = "content",
  hasNextPage,
  loadMoreRef,
  isLoading = false,
  onCardHover,
}: SearchResultsProps & { onCardHover?: () => void }) {
  const {
    dialogStack,
    hasBackNavigation,
    openInfoDialog,
    openCastDialog,
    openDiscoverDialog,
    goBack,
    closeDialog,
  } = useDialogManager();

  const handleMovieClick = (movieId: number | string) => {
    openInfoDialog(movieId.toString(), 10000);
  };

  const handlePersonClick = (castId: string, castName: string) => {
    openCastDialog(castId, castName, undefined, 10001);
  };

  const handleMovieChange = (newMovieId: number | string) => {
    openInfoDialog(newMovieId.toString(), 10000);
  };

  if (!debouncedQuery) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p className="text-xl">Start typing to search...</p>
      </div>
    );
  }

  const showPeople = selectedMode === "people";
  const showContent = selectedMode === "content";

  const activePeopleRes = showPeople ? peopleRes : [];
  const activeSearchRes = showContent ? searchRes : [];

  if (
    !isLoading &&
    activeSearchRes.length === 0 &&
    activePeopleRes.length === 0
  ) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p className="text-xl">
          No results found for &ldquo;{debouncedQuery}&rdquo;
        </p>
        <p className="text-sm mt-2">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <>
      {activePeopleRes.length > 0 && (
        <section className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {activePeopleRes.map((person) => {
              const profileUrl = getImageUrl(
                person.profilePath ?? null,
                "w500",
              );
              const backdropUrl = getImageUrl(
                person.backdropPath ?? null,
                "w780",
              );

              return (
                <article key={person.id} className="rounded-md overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handlePersonClick(person.id, person.name)}
                    onMouseEnter={onCardHover}
                    className="relative w-full aspect-[2/3] bg-zinc-700 block"
                    aria-label={`Open cast details for ${person.name}`}
                  >
                    {profileUrl ? (
                      <Image
                        src={profileUrl}
                        alt="Person image"
                        fill
                        sizes="(max-width: 768px) 40vw, 16vw"
                        className="object-cover"
                      />
                    ) : backdropUrl ? (
                      <Image
                        src={backdropUrl}
                        alt="Person image"
                        fill
                        sizes="(max-width: 768px) 40vw, 16vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-zinc-300 px-3 text-center">
                        No image
                      </div>
                    )}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Static content grid (Explore/Cast dialog style), responsive up to 6 columns */}
      {(activeSearchRes.length > 0 || (isLoading && showContent)) && (
        <section>
          <MovieGrid
            movies={activeSearchRes}
            onMovieClick={handleMovieClick}
            columns={6}
            disableAnimation={true}
            fullWidth={true}
            eagerLoadCount={6}
            onCardHover={onCardHover}
            isLoading={isLoading && activeSearchRes.length === 0}
          />
        </section>
      )}

      {/* Load More Trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="h-px" aria-hidden="true" />
      )}

      <DialogRenderer
        dialogStack={dialogStack}
        hasBackNavigation={hasBackNavigation}
        onClose={closeDialog}
        onBack={goBack}
        onMovieClick={handleMovieClick}
        onInfoDialogOpen={handleMovieChange}
        onOpenCastDialog={openCastDialog}
        onOpenDiscoverDialog={openDiscoverDialog}
      />
    </>
  );
}
