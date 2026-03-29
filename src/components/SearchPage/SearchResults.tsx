"use client";

import { Movie } from "@/types/movie";
import MovieGrid from "@/components/UI/MovieGrid";
import { useState, lazy, Suspense } from "react";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

interface SearchResultsProps {
  searchQuery: string;
  debouncedQuery: string;
  searchRes: Movie[];
  hasNextPage: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

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

  const handleMovieClick = (movieId: number) => {
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

      <MovieGrid movies={searchRes} onMovieClick={handleMovieClick} />

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
