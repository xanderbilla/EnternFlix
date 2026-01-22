"use client";

import Image from "next/image";
import { memo } from "react";
import { Movie } from "@/types/movie";
import { ExploreDialogGridProps } from "@/types/components";
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
import MovieCardHoverOverlay from "@/components/MovieCard/MovieCardHoverOverlay";
import MovieCardActionButtons from "@/components/MovieCard/MovieCardActionButtons";
import MovieCardMetadata from "@/components/MovieCard/MovieCardMetadata";

function ExploreDialogGrid({ movies, onMovieClick }: ExploreDialogGridProps) {
  const handleKeyPress = useKeyboardHandler();

  return (
    <div className="px-16 pb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-24">
        {movies.map((movie, index) => {
          const backdropUrl = getImageUrl(movie?.backdrop_path, "w780");
          const positionClass = getCardPositionClass(index, 4);

          return (
            <div
              key={`${movie.id}-${index}`}
              className="group/item relative w-full aspect-video"
            >
              <button
                className="w-full h-full border-0 p-0 cursor-pointer block rounded-sm overflow-hidden"
                onClick={() => onMovieClick(movie.id)}
                aria-label={`View details for ${movie?.title || movie?.name || "this title"}`}
              >
                {backdropUrl ? (
                  <Image
                    className="object-cover transition duration-300 shadow-xl w-full h-full rounded-sm md:group-hover/item:opacity-0 delay-300"
                    src={backdropUrl}
                    alt={
                      movie?.title ||
                      movie?.name ||
                      movie?.original_name ||
                      "Movie backdrop"
                    }
                    width={780}
                    height={439}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/img/default-slate.png";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-800 rounded-sm">
                    Image not available
                  </div>
                )}
              </button>

              <MovieCardHoverOverlay
                backdropUrl={backdropUrl}
                positionClass={positionClass}
                data={movie}
                navigateToTitle={() => onMovieClick(movie.id)}
                handleKeyPress={handleKeyPress}
              >
                <MovieCardActionButtons
                  onPlayClick={() => {}}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(ExploreDialogGrid);
