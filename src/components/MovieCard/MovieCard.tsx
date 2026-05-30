"use client";

import RemoteImage from "@/components/UI/RemoteImage";
import React, {
  useCallback,
  memo,
  useState,
  lazy,
  Suspense,
  useRef,
  useEffect,
} from "react";
import { MovieCardProps } from "@/types/components";
import { useMovieData } from "@/hooks/ui/useMovieData";
import { useKeyboardHandler } from "@/hooks/ui/useKeyboardHandler";
import { getPositionClass } from "@/utils/layoutHelpers";
import MovieCardHoverOverlay from "./MovieCardHoverOverlay";
import MovieCardActionButtons from "./MovieCardActionButtons";
import MovieCardMetadata from "./MovieCardMetadata";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

const MovieCard: React.FC<MovieCardProps> = ({
  data,
  isFirst,
  isLast,
  onMovieClick,
  index = 0,
}) => {
  const [showTitleDialog, setShowTitleDialog] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(
    data?.id?.toString() || "",
  );
  const [viewportPosition, setViewportPosition] = useState<
    "left" | "right" | "center"
  >("center");
  const cardRef = useRef<HTMLDivElement>(null);

  const movieData = useMovieData(data);
  const handleKeyPress = useKeyboardHandler();

  const checkViewportPosition = useCallback(() => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    const leftThreshold = 350;
    const rightThreshold = viewportWidth - 350;

    if (rect.left <= leftThreshold) {
      setViewportPosition("left");
    } else if (rect.right >= rightThreshold) {
      setViewportPosition("right");
    } else {
      setViewportPosition("center");
    }
  }, []);

  useEffect(() => {
    // Initial viewport-position measurement must run post-mount because it
    // reads DOM rects (`getBoundingClientRect`). Subsequent updates are
    // driven by the scroll listener below; this initial call is the canonical
    // layout-measurement pattern with no event/derivation alternative.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkViewportPosition();

    const handleScroll = () => {
      checkViewportPosition();
    };

    const scrollContainer = cardRef.current?.closest("#movie-list");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [checkViewportPosition]);

  // React Compiler cannot preserve this memoization because `data?.id` is
  // an optional access. Manual useCallback retained — this handler is
  // attached to the card click target which re-mounts heavy children.
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const handleTitleDialog = useCallback(() => {
    if (onMovieClick && data?.id) {
      onMovieClick(data.id);
      return;
    }
    setCurrentMovieId(data?.id?.toString() || "");
    setShowTitleDialog(true);
  }, [data?.id, onMovieClick]);

  const handleMovieChange = useCallback((newMovieId: string) => {
    setCurrentMovieId(newMovieId);
  }, []);

  const getEffectivePositionClass = () => {
    if (viewportPosition === "left") return "left-0 -translate-x-8";
    if (viewportPosition === "right") return "right-0 translate-x-8";
    return getPositionClass(isFirst || false, isLast || false);
  };

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      ref={cardRef}
      className="relative w-full aspect-[2/3] opacity-0 scale-95 animate-fadeInScale transition-all duration-300 ease-in-out"
      style={{ "--card-delay": `${index * 50}ms` } as React.CSSProperties}
    >
      <button
        onClick={handleTitleDialog}
        className={`relative w-full h-full border-0 p-0 cursor-pointer block rounded-md overflow-hidden${imageLoaded ? "" : " bg-zinc-800"}`}
        aria-label={`View details for ${data?.title || "this title"}`}
      >
        <RemoteImage
          className="object-contain transition duration-300 shadow-xl w-full h-full rounded-md
            md:group-hover/item:opacity-0 delay-300"
          fill
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
          src={movieData.posterUrl}
          alt={data?.title || "Movie poster"}
          loading={isFirst ? "eager" : "lazy"}
          priority={isFirst}
          placeholder="empty"
          onLoad={() => setImageLoaded(true)}
          fallbackClassName="w-full h-full flex items-center justify-center text-gray-400 text-sm md:text-base bg-zinc-800 rounded-md"
        />
      </button>

      <MovieCardHoverOverlay
        backdropUrl={movieData.backdropUrl}
        positionClass={getEffectivePositionClass()}
        viewportPosition={viewportPosition}
        data={data}
        navigateToTitle={handleTitleDialog}
        handleKeyPress={handleKeyPress}
      >
        <MovieCardActionButtons
          contentId={data?.id?.toString() || ""}
          title={data?.title || "this title"}
          contentType={data?.contentType || "MOVIE"}
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

      {/* Title Dialog - Only rendered if handling locally */}
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
