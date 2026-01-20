"use client";

import { useCallback, memo } from "react";
import Icon from "@/components/Icon/Icon";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/utils/movieHelpers";
import { useRandomContent, useCategoryContent } from "@/hooks/api/useMovies";

interface BannerProps {
  // For category banners
  title?: string;
  description?: string;
  category?: string;
  // For home banner
  variant?: "home" | "category";
}

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  category,
  variant = "home",
}) => {
  const router = useRouter();

  // Use hooks for data fetching
  const {
    data: homeMovie,
    isLoading: homeLoading,
    error: homeError,
  } = useRandomContent();

  const {
    data: categoryMovie,
    isLoading: categoryLoading,
    error: categoryError,
  } = useCategoryContent(category || "trending");

  // Determine which data to use
  const isLoading = variant === "home" ? homeLoading : categoryLoading;
  const error = variant === "home" ? homeError : categoryError;
  const movie = variant === "home" ? homeMovie : categoryMovie;

  const truncate = useCallback((string: string | undefined, n: number) => {
    if (!string) return "";
    return string.length > n ? string.slice(0, n - 1) + "..." : string;
  }, []);

  // Don't show anything while loading
  if (isLoading) {
    return null;
  }

  // Handle error or no content
  if (error || !movie?.backdrop_path) {
    return null;
  }

  const movieTitle =
    movie.title ?? movie.name ?? movie.original_name ?? "Untitled";
  const displayTitle = variant === "category" ? title : movieTitle;
  const displayDescription =
    variant === "category" ? description : truncate(movie.overview, 200);
  const backdropUrl = getImageUrl(movie.backdrop_path, "original");

  return (
    <div className="relative h-[85vh] md:h-[90vh] lg:h-[95vh]">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('${backdropUrl}')` }}
      />
      {/* Enhanced gradient overlay - from image to transparent at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

      <div className="absolute bottom-1/3 md:bottom-1/3 lg:bottom-2/5 left-0 right-0 px-4 md:px-16">
        <h1
          className={`font-bold text-white mb-6 leading-tight tracking-tight ${
            variant === "category"
              ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          }`}
        >
          {displayTitle}
        </h1>
        <p
          className={`text-white/90 max-w-3xl leading-relaxed ${
            variant === "category"
              ? "text-lg sm:text-xl md:text-2xl"
              : "text-base sm:text-lg md:text-xl mb-8"
          }`}
        >
          {displayDescription}
        </p>

        {variant === "home" && (
          <div className="flex flex-row items-center gap-3">
            <Button
              variant="banner-play"
              className="py-2 md:py-3 px-4 md:px-6 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center"
            >
              <Icon name="playFill" className="mr-1" /> Play
            </Button>
            <Button
              variant="banner-info"
              className="py-2 md:py-3 px-4 md:px-6 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center gap-1"
              onClick={() => router.push(`/title/${movie.id}`)}
            >
              <Icon name="info" className="mr-1" /> More Info
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Banner);
