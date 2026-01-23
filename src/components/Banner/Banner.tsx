"use client";

import {
  useCallback,
  memo,
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
} from "react";
import { usePathname } from "next/navigation";
import { getImageUrl } from "@/utils/movieHelpers";
import { getContentRating, truncateText } from "@/utils/contentHelpers";
import { useRandomContent, useCategoryContent } from "@/hooks/api/useMovies";
import { useVideo } from "@/contexts/VideoContext";
import { BannerProps } from "@/types/components";
import { SAMPLE_VIDEO_URL } from "@/constants/video";
import BannerVideo from "./BannerVideo";
import BannerControls from "./BannerControls";
import BannerContent from "./BannerContent";
import FavoritesBanner from "./FavoritesBanner";
import SearchBanner from "./SearchBanner";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

const Banner = ({ category, variant = "home" }: BannerProps) => {
  const pathname = usePathname();
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    movieId: "",
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { shouldPauseBanner } = useVideo();

  const isFavoritesPage = pathname.includes("/favorites");
  const isSearchPage = pathname.includes("/search");

  const { data: homeMovie, error: homeError } = useRandomContent();
  const { data: categoryMovie, error: categoryError } = useCategoryContent(
    category || "trending",
  );

  const error = variant === "home" ? homeError : categoryError;
  const movie = variant === "home" ? homeMovie : categoryMovie;

  useEffect(() => {
    if (!isFavoritesPage && movie?.backdrop_path) {
      // Reset video loaded state when movie changes
      setVideoLoaded(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setShowVideo(true);
        setVideoEnded(false);
      }, 3000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [movie, isFavoritesPage]);

  const handleVideoEnded = useCallback(() => {
    setVideoEnded(true);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const reloadVideo = useCallback(() => {
    setVideoEnded(false);
    setVideoLoaded(false);
    setShowVideo(true);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const handleMoreInfo = useCallback(() => {
    if (movie?.id) {
      setDialogState({ isOpen: true, movieId: movie.id.toString() });
    }
  }, [movie?.id]);

  const handleMovieChange = useCallback((newMovieId: string) => {
    setDialogState((prev) => ({ ...prev, movieId: newMovieId }));
  }, []);

  if (isFavoritesPage) {
    return <FavoritesBanner movie={movie ?? null} />;
  }

  if (isSearchPage) {
    return <SearchBanner movie={movie ?? null} />;
  }

  if (error || !movie?.backdrop_path) {
    return null;
  }

  const movieTitle =
    movie.title ?? movie.name ?? movie.original_name ?? "Untitled";
  const movieDescription = truncateText(movie.overview, 200);
  const backdropUrl = getImageUrl(movie.backdrop_path, "original");

  return (
    <div className="relative h-[85vh] md:h-[90vh] lg:h-[95vh]">
      <BannerVideo
        sampleVideoUrl={SAMPLE_VIDEO_URL}
        isMuted={isMuted}
        showVideo={showVideo}
        videoEnded={videoEnded}
        shouldPauseBanner={shouldPauseBanner}
        onVideoEnded={handleVideoEnded}
        onVideoLoaded={handleVideoLoaded}
      />

      {/* Show backdrop until video is loaded, fade out during playback, fade back in when ended */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
          showVideo && videoLoaded && !videoEnded ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url('${backdropUrl}')` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

      <BannerControls
        showVideo={showVideo}
        videoEnded={videoEnded}
        isMuted={isMuted}
        contentRating={getContentRating(movie)}
        onToggleMute={toggleMute}
        onReloadVideo={reloadVideo}
      />

      <BannerContent
        title={movieTitle}
        description={movieDescription}
        movieId={movie.id}
        onMoreInfoClick={handleMoreInfo}
      />

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
    </div>
  );
};

export default memo(Banner);
