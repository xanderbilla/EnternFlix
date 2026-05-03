"use client";

import Image from "next/image";
import { Movie } from "@/types/movie";
import { MovieGridProps } from "@/types/components";
import {
  getImageUrl,
  getTruncatedTitle,
  getGenres,
  getDuration,
  getReleaseYear,
  getContentType,
} from "@/utils/movieHelpers";
import { useKeyboardHandler } from "@/hooks/ui/useKeyboardHandler";
import { getCardPositionClass } from "@/utils/layoutHelpers";
import {
  DynamicMovieCardHoverOverlay as MovieCardHoverOverlay,
  DynamicMovieCardActionButtons as MovieCardActionButtons,
  DynamicMovieCardMetadata as MovieCardMetadata,
} from "@/utils/dynamicImports";
import { useMemo, memo, useState } from "react";

function MovieGrid({
  movies,
  onMovieClick,
  columns = 4,
  disableHover = false,
  disableAnimation = false,
}: MovieGridProps) {
  const handleKeyPress = useKeyboardHandler();

  const gridCols =
    {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
    }[columns] ||
    "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

  const staticStyle = useMemo(
    () => ({ opacity: 1, transform: "scale(1)" }),
    [],
  );

  const MovieCardItem = ({ movie, index }: { movie: Movie; index: number }) => {
    const backdropUrl = getImageUrl(movie?.backdropPath, "w780");
    const positionClass = getCardPositionClass(index, columns);

    const animationStyle = disableAnimation
      ? staticStyle
      : {
          animationDelay: `${index * 50}ms`,
          animationFillMode: "forwards" as const,
        };

    return (
      <div
        className={`group/item relative w-full aspect-video transition-all duration-300 ease-in-out ${
          disableAnimation
            ? "opacity-100"
            : "opacity-0 scale-95 animate-fadeInScale"
        }`}
        style={animationStyle}
      >
        <button
          className="w-full h-full border-0 p-0 cursor-pointer block rounded overflow-hidden relative"
          onClick={() => onMovieClick(movie.id)}
          aria-label={`View details for ${movie?.title || "this title"}`}
        >
          {backdropUrl ? (
            <Image
              className="object-cover transition-opacity duration-500 shadow-xl w-full h-full rounded"
              src={backdropUrl}
              alt={movie?.title || "Movie backdrop"}
              width={780}
              height={439}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-800 rounded">
              Image not available
            </div>
          )}
        </button>

        {!disableHover && (
          <MovieCardHoverOverlay
            backdropUrl={backdropUrl}
            positionClass={positionClass}
            data={movie}
            navigateToTitle={() => onMovieClick(movie.id)}
            handleKeyPress={handleKeyPress}
          >
            <MovieCardActionButtons
              contentId={movie.id?.toString() || ""}
              contentType={movie.contentType || "MOVIE"}
              onAddClick={() => {}}
              onLikeClick={() => {}}
              onInfoClick={() => onMovieClick(movie.id)}
              handleKeyPress={handleKeyPress}
            />
            <MovieCardMetadata
              truncatedTitle={getTruncatedTitle(movie)}
              releaseYear={getReleaseYear(movie)}
              contentType={getContentType(movie)}
              duration={getDuration(movie)}
              genres={getGenres(movie)}
              onTitleClick={() => onMovieClick(movie.id)}
              handleKeyPress={handleKeyPress}
              data={movie}
            />
          </MovieCardHoverOverlay>
        )}
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 pb-16 sm:pb-24 md:pb-32">
      <div
        className={`grid ${gridCols} gap-x-1 gap-y-16 sm:gap-x-2 sm:gap-y-16 md:gap-y-16 lg:gap-y-16`}
      >
        {movies.map((movie, index) => (
          <MovieCardItem
            key={`${movie.id}-${index}`}
            movie={movie}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(MovieGrid);
