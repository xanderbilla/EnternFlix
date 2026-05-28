"use client";

import {
  useCallback,
  memo,
  lazy,
  Suspense,
  useState,
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getImageUrl } from "@/utils/movieHelpers";
import { truncateText, getContentRating } from "@/utils/contentHelpers";
import { config } from "@/lib/env/env";
import { useBanner } from "@/hooks/api/useMovies";
import { usePlayback } from "@/hooks/api/usePlayback";
import { DynamicBannerContent as BannerContent } from "@/utils/dynamicImports";
import { DynamicDialogRenderer as DialogRenderer } from "@/utils/dynamicImports";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import FavoritesBanner from "./FavoritesBanner";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

const Banner = () => {
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState(true);
  const [showContentRating, setShowContentRating] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    dialogState,
    dialogStack,
    hasBackNavigation,
    openInfoDialog,
    openCastDialog,
    openDiscoverDialog,
    goBack,
    closeDialog,
  } = useDialogManager();

  const isFavoritesPage = pathname.includes("/favorites");

  const { data: movie, error, isLoading, refetch } = useBanner("all");

  useEffect(() => {
    if (!isLoading && (error || !movie?.backdropPath)) {
      const timer = setTimeout(() => refetch(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, error, movie?.backdropPath, refetch]);

  const contentType = movie?.contentType === "TV" ? "tv" : "movie";
  const { data: playback } = usePlayback(
    contentType as "movie" | "tv",
    movie?.id ? String(movie.id) : "",
    !!movie?.id,
  );

  useEffect(() => {
    if (!movie) return;

    // State reset is intentionally synchronized to upstream movie changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVideoPlaying(false);
    setVideoEnded(false);
    setVideoUrl(null);

    const contentRatingTimer = setTimeout(() => {
      setShowContentRating(true);
    }, 1000);

    const rawVideoPath = playback?.playback?.preview?.video ?? null;
    const videoSrc = rawVideoPath
      ? rawVideoPath.startsWith("http")
        ? rawVideoPath
        : `${config.customApi.imageBaseUrl}${rawVideoPath.startsWith("/") ? rawVideoPath.slice(1) : rawVideoPath}`
      : null;
    if (videoSrc) {
      const videoTimer = setTimeout(() => {
        setVideoUrl(videoSrc);
      }, 3000);

      return () => {
        clearTimeout(contentRatingTimer);
        clearTimeout(videoTimer);
      };
    }

    return () => clearTimeout(contentRatingTimer);
  }, [movie, playback]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // React Compiler cannot preserve these memoizations because `openInfoDialog`
  // is sourced from context (compiler bails on context-derived callables).
  // The manual useCallbacks are intentional — both handlers are forwarded as
  // props to memoised children where referential stability matters.
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const handleMoreInfo = useCallback(() => {
    if (movie?.id) {
      openInfoDialog(movie.id.toString(), 9999);
    }
  }, [movie?.id, openInfoDialog]);

  const handleMovieChange = useCallback(
    (newMovieId: string | number) => {
      openInfoDialog(newMovieId.toString(), 9999);
    },
    [openInfoDialog],
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsVideoPlaying(true);
      setVideoEnded(false);
    }
  }, []);

  const handleVideoEnd = useCallback(() => {
    setIsVideoPlaying(false);
    setVideoEnded(true);
  }, []);

  if (isFavoritesPage) {
    return <FavoritesBanner movie={movie ?? null} />;
  }

  if (isLoading || error || !movie?.backdropPath) {
    return (
      <div
        className="relative h-[70vh] sm:h-[80vh] md:h-[92vh] lg:h-[100vh] bg-zinc-900 animate-pulse"
        aria-hidden="true"
      />
    );
  }

  const movieTitle = movie.title ?? "Untitled";
  const movieDescription = truncateText(movie.overview, 200);
  const backdropUrl = getImageUrl(movie.backdropPath, "original");
  const contentRating = getContentRating(movie);

  return (
    <section
      className="relative h-[70vh] sm:h-[80vh] md:h-[92vh] lg:h-[100vh]"
      role="region"
      aria-label={`Featured banner: ${movieTitle}`}
    >
      {/* Backdrop Image */}
      <Image
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
          isVideoPlaying ? "opacity-0" : "opacity-100"
        }`}
        src={backdropUrl}
        alt={`${movieTitle} backdrop`}
        fill
        priority
        sizes="100vw"
      />

      {/* Video Player */}
      {videoUrl && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            isVideoPlaying ? "opacity-100" : "opacity-0"
          }`}
          src={videoUrl}
          autoPlay
          muted={isMuted}
          playsInline
          disablePictureInPicture
          onCanPlay={() => setIsVideoPlaying(true)}
          onEnded={handleVideoEnd}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

      <BannerContent
        title={movieTitle}
        description={movieDescription}
        movieId={movie.id}
        contentType={movie.contentType || "MOVIE"}
        contentRating={contentRating}
        onMoreInfoClick={handleMoreInfo}
        showDescription={videoEnded}
      />

      {/* Audio Toggle and Content Rating - Bottom Right */}
      <div className="absolute bottom-[30%] md:bottom-[32%] lg:bottom-[35%] right-2 sm:right-4 md:right-8 lg:right-12 flex items-center gap-2 sm:gap-3">
        {/* Volume/Replay Button Container - Same position for both */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11">
          {/* Mute/Unmute Button - Only show when video is playing */}
          {isVideoPlaying && (
            <button
              aria-label={isMuted ? "Turn audio on" : "Turn audio off"}
              className="absolute inset-0 rounded-full border-2 border-white/60 bg-transparent hover:bg-white/10 flex items-center justify-center transition-opacity duration-500"
              type="button"
              onClick={toggleMute}
            >
              {isMuted ? (
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M11 4a1 1 0 0 0-1.7-.7L4.58 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.59l4.7 4.7A1 1 0 0 0 11 20zM5.7 9.7 9 6.42V17.6l-3.3-3.3-.29-.29H2v-4h3.41zm9.6 0 2.29 2.3-2.3 2.3 1.42 1.4L19 13.42l2.3 2.3 1.4-1.42-2.28-2.3 2.3-2.3-1.42-1.4-2.3 2.28-2.3-2.3z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M24 12a14 14 0 0 0-4.1-9.9l-1.415 1.415a12 12 0 0 1 0 16.97L19.9 21.9A14 14 0 0 0 24 12M11 4a1 1 0 0 0-1.707-.707L4.586 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.586l4.707 4.707A1 1 0 0 0 11 20zM5.707 9.707 9 6.414v11.172l-3.293-3.293L5.414 14H2v-4h3.414zM16 12a6 6 0 0 0-1.757-4.243l-1.415 1.415a4 4 0 0 1 0 5.656l1.415 1.415A6 6 0 0 0 16 12m1.07-7.071a10 10 0 0 1 0 14.142l-1.413-1.414a8 8 0 0 0 0-11.314z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          )}

          {/* Replay Button - Only show when video has ended */}
          {videoEnded && videoUrl && (
            <button
              aria-label={`Replay ${movieTitle} preview`}
              className="absolute inset-0 rounded-full border-2 border-white/60 bg-transparent hover:bg-white/10 flex items-center justify-center transition-opacity duration-500"
              type="button"
              onClick={handleReplay}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M20.663 7A10 10 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10h2c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0a11.99 11.99 0 0 1 10 5.365V2h2v6a1 1 0 0 1-1 1h-6V7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Divider and Content Rating - Slide in together after 1 second */}
        <div
          className={`flex items-center gap-2 sm:gap-3 transition-all duration-700 ease-out ${
            showContentRating
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          {/* Vertical Divider */}
          <div className="h-6 sm:h-7 md:h-8 lg:h-9 w-[2px] bg-white/60"></div>

          {/* Content Rating */}
          {contentRating && (
            <span className="text-white text-sm sm:text-base md:text-base lg:text-lg font-normal">
              {contentRating}
            </span>
          )}
        </div>
      </div>

      {/* Dialog Renderer for all dialogs */}
      <DialogRenderer
        dialogStack={dialogStack}
        hasBackNavigation={hasBackNavigation}
        onClose={closeDialog}
        onBack={goBack}
        onMovieClick={handleMovieChange}
        onInfoDialogOpen={handleMovieChange}
        onOpenCastDialog={openCastDialog}
        onOpenDiscoverDialog={openDiscoverDialog}
      />
    </section>
  );
};

export default memo(Banner);
