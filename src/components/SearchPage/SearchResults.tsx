"use client";

import type { SearchResultsProps } from "@/types/components";
import { useState, lazy, Suspense } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

export default function SearchResults({
  searchQuery,
  debouncedQuery,
  searchRes,
  hasNextPage,
  loadMoreRef,
}: SearchResultsProps) {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    movieId: "",
  });

  const handleMovieClick = (movieId: number | string) => {
    setDialogState({ isOpen: true, movieId: movieId.toString() });
  };

  const handleMovieChange = (newMovieId: string) => {
    setDialogState((prev) => ({ ...prev, movieId: newMovieId }));
  };

  if (!debouncedQuery) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p className="text-xl">Start typing to search...</p>
      </div>
    );
  }

  if (searchRes.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p className="text-xl">No results found for "{debouncedQuery}"</p>
        <p className="text-sm mt-2">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-white text-2xl font-semibold">
          Search Results for "{debouncedQuery}"
        </h2>
        <p className="text-gray-400 mt-1">{searchRes.length} results found</p>
      </div>

      {/* Grid of 5 columns with MovieCard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pb-10">
        {searchRes.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="group/item">
            <MovieCard
              data={movie}
              isFirst={index === 0}
              isLast={index === searchRes.length - 1}
              onMovieClick={handleMovieClick}
            />
          </div>
        ))}
      </div>

      {/* Load More Trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      {/* Title Dialog */}
      {dialogState.isOpen && (
        <Suspense fallback={null}>
          <TitleDialog
            isOpen={dialogState.isOpen}
            titleId={dialogState.movieId}
            onClose={() => setDialogState({ isOpen: false, movieId: "" })}
            onMovieChange={handleMovieChange}
          />
        </Suspense>
      )}
    </>
  );
}
