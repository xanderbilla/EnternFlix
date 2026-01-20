"use client";

import Image from "next/image";
import React, { useCallback, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { MovieCardProps } from "@/types/movie";
import {
  getContentType,
  getTruncatedTitle,
  getGenres,
  getDuration,
  getReleaseYear,
  getImageUrl,
} from "@/utils/movieHelpers";
import MovieCardHoverOverlay from "./MovieCardHoverOverlay";
import MovieCardActionButtons from "./MovieCardActionButtons";
import MovieCardMetadata from "./MovieCardMetadata";

const MovieCard: React.FC<MovieCardProps> = ({ data, isFirst, isLast }) => {
  const router = useRouter();

  const getPositionClass = useCallback(() => {
    if (isFirst) return "left-0";
    if (isLast) return "right-0";
    return "left-1/2 -translate-x-1/2";
  }, [isFirst, isLast]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent, action: () => void) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        action();
      }
    },
    [],
  );

  const navigateToTitle = useCallback(
    () => router.push(`/title/${data?.id}`),
    [router, data?.id],
  );

  // Memoize utility function results
  const truncatedTitle = useMemo(() => getTruncatedTitle(data), [data]);
  const contentType = useMemo(() => getContentType(data), [data]);
  const genres = useMemo(() => getGenres(data), [data]);
  const duration = useMemo(() => getDuration(data), [data]);
  const releaseYear = useMemo(() => getReleaseYear(data), [data]);
  const posterUrl = useMemo(
    () => getImageUrl(data?.poster_path),
    [data?.poster_path],
  );
  const backdropUrl = useMemo(
    () => getImageUrl(data?.backdrop_path),
    [data?.backdrop_path],
  );

  return (
    <div className="group/item relative w-full aspect-[2/3]">
      <button
        className="w-full h-full border-0 p-0 cursor-pointer block rounded-md overflow-hidden"
        onClick={navigateToTitle}
        onKeyDown={(e) => handleKeyPress(e, navigateToTitle)}
        aria-label={`View details for ${
          data?.title || data?.name || "this title"
        }`}
      >
        {posterUrl ? (
          <Image
            className="object-contain transition duration-300 shadow-xl w-full h-full rounded-md
            md:group-hover/item:opacity-0 delay-300"
            layout="fill"
            src={posterUrl}
            alt={
              data?.title || data?.name || data?.original_name || "Movie poster"
            }
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm md:text-base">
            Image not available
          </div>
        )}
      </button>

      <MovieCardHoverOverlay
        backdropUrl={backdropUrl}
        positionClass={getPositionClass()}
        data={data}
        navigateToTitle={navigateToTitle}
        handleKeyPress={handleKeyPress}
      >
        <MovieCardActionButtons
          onPlayClick={() => {}}
          onAddClick={() => {}}
          onLikeClick={() => {}}
          onInfoClick={navigateToTitle}
          handleKeyPress={handleKeyPress}
        />
        <MovieCardMetadata
          truncatedTitle={truncatedTitle}
          releaseYear={releaseYear}
          contentType={contentType}
          duration={duration}
          genres={genres}
          onTitleClick={navigateToTitle}
          handleKeyPress={handleKeyPress}
        />
      </MovieCardHoverOverlay>
    </div>
  );
};

export default memo(MovieCard);
