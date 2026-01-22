"use client";

import Image from "next/image";
import React, { useCallback, memo, useState, lazy, Suspense } from "react";
import { MovieCardProps } from "@/types/components";
import { useMovieData } from "@/hooks/ui/useMovieData";
import { useKeyboardHandler } from "@/hooks/ui/useKeyboardHandler";
import { getPositionClass } from "@/utils/layoutHelpers";
import MovieCardHoverOverlay from "./MovieCardHoverOverlay";
import MovieCardActionButtons from "./MovieCardActionButtons";
import MovieCardMetadata from "./MovieCardMetadata";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

const MovieCard: React.FC<MovieCardProps> = ({ data, isFirst, isLast }) => {
  const [showTitleDialog, setShowTitleDialog] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(
    data?.id?.toString() || "",
  );

  // Use consolidated hooks
  const movieData = useMovieData(data);
  const handleKeyPress = useKeyboardHandler();

  const handleTitleDialog = useCallback(() => {
    setCurrentMovieId(data?.id?.toString() || "");
    setShowTitleDialog(true);
  }, [data?.id]);

  const handleMovieChange = useCallback((newMovieId: string) => {
    setCurrentMovieId(newMovieId);
  }, []);

  return (
    <div className="relative w-full aspect-[2/3]">
      <button
        onClick={handleTitleDialog}
        className="w-full h-full border-0 p-0 cursor-pointer block rounded-md overflow-hidden"
        aria-label={`View details for ${
          data?.title || data?.name || "this title"
        }`}
      >
        {movieData.posterUrl ? (
          <Image
            className="object-contain transition duration-300 shadow-xl w-full h-full rounded-md
            md:group-hover/item:opacity-0 delay-300"
            fill
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
            src={movieData.posterUrl}
            alt={
              data?.title || data?.name || data?.original_name || "Movie poster"
            }
            loading={isFirst ? "eager" : "lazy"}
            priority={isFirst}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm md:text-base">
            Image not available
          </div>
        )}
      </button>

      <MovieCardHoverOverlay
        backdropUrl={movieData.backdropUrl}
        positionClass={getPositionClass(isFirst || false, isLast || false)}
        data={data}
        navigateToTitle={handleTitleDialog}
        handleKeyPress={handleKeyPress}
      >
        <MovieCardActionButtons
          onPlayClick={() => {}}
          onAddClick={() => {}}
          onLikeClick={() => {}}
          onInfoClick={handleTitleDialog}
          handleKeyPress={handleKeyPress}
        />
        <MovieCardMetadata
          truncatedTitle={movieData.truncatedTitle}
          releaseYear={movieData.releaseYear}
          contentType={movieData.contentType}
          duration={movieData.duration}
          genres={movieData.genres}
          onTitleClick={handleTitleDialog}
          handleKeyPress={handleKeyPress}
          data={data}
        />
      </MovieCardHoverOverlay>

      {/* Title Dialog */}
      {showTitleDialog && (
        <Suspense fallback={null}>
          <TitleDialog
            isOpen={showTitleDialog}
            titleId={currentMovieId}
            onClose={() => setShowTitleDialog(false)}
            onMovieChange={handleMovieChange}
          />
        </Suspense>
      )}
    </div>
  );
};

export default memo(MovieCard);
