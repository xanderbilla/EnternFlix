"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import ActionButton from "@/components/Button/ActionButton";
import { useTrending } from "@/hooks/api/useMovies";
import { getImageUrl } from "@/utils/movieHelpers";

interface NotFoundContentProps {
  mode?: "not-found" | "error";
  onRetry?: () => void;
}

export default function NotFoundContent({
  mode = "not-found",
  onRetry,
}: NotFoundContentProps) {
  const router = useRouter();
  const { data: trendingData } = useTrending();

  // Pick a backdrop once per trending payload so it stays stable across renders.
  // Random selection is intentional UX (different backdrop on each visit) and is
  // safely confined to a useMemo keyed on the data identity.
  const backdrop = useMemo<string | null>(() => {
    const results = trendingData?.results;
    if (!results?.length) return null;
    // Intentional UX randomness: pick a random backdrop per trending payload.
    // Confined inside useMemo keyed on `trendingData` so it is stable across
    // re-renders and only changes when the data identity changes.
    // eslint-disable-next-line react-hooks/purity
    const index = Math.floor(Math.random() * results.length);
    return results[index].backdropPath ?? null;
  }, [trendingData]);

  const isErrorMode = mode === "error";
  const titleText = isErrorMode
    ? "Something Went Wrong"
    : "Content Not Available";
  const statusBadge = isErrorMode ? "Error" : "Not Found";
  const descriptionText = isErrorMode
    ? "Something unexpected happened. Please try again, or discover thousands of movies, TV shows, and anime in our collection."
    : "The page you're looking for doesn't exist or has been moved. Discover thousands of movies, TV shows, and anime in our collection.";

  return (
    <div className="relative h-screen w-full">
      {/* Backdrop Image */}
      {backdrop ? (
        <Image
          className="w-full h-full object-cover brightness-[60%]"
          src={getImageUrl(backdrop, "original")}
          alt="Not Found Background"
          width={1920}
          height={1080}
          priority
        />
      ) : (
        <div className="w-full h-full bg-zinc-900" />
      )}

      {/* Gradient Overlays */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t z-0 from-zinc-900 to-transparent" />
      <div className="absolute top-0 left-0 w-full lg:w-3/4 xl:w-2/3 h-full bg-gradient-to-r from-black to-transparent">
        {/* Content */}
        <div className="absolute top-[35%] md:top-[25%] ml-4 md:ml-16">
          {/* Subtitle */}
          <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl h-full w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] font-bold drop-shadow-xl mb-3 sm:mb-4">
            {titleText}
          </h2>

          {/* Meta Info */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 font-light text-zinc-400 text-xs sm:text-sm md:text-base lg:text-lg mt-2 md:mt-4 drop-shadow-xl">
            <p>Error</p>
            <p className="border border-zinc-400 px-1 md:px-2">{statusBadge}</p>
          </div>

          {/* Description */}
          <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg mt-3 md:mt-6 w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%] drop-shadow-xl">
            {descriptionText}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center mt-4 md:mt-6 gap-2 sm:gap-3">
            {isErrorMode && onRetry && (
              <ActionButton
                variant="primary"
                icon="retry"
                label="Try Again"
                onClick={onRetry}
                className="py-1.5 sm:py-2 md:py-2.5 lg:py-3 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base lg:text-lg w-auto"
              />
            )}

            <ActionButton
              variant="primary"
              icon="home"
              label="Go Home"
              onClick={() => router.push("/browse")}
              className="py-1.5 sm:py-2 md:py-2.5 lg:py-3 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base lg:text-lg w-auto"
            />

            <ActionButton
              variant="secondary"
              icon="search"
              label="Search Content"
              onClick={() => router.push("/search")}
              className="py-1.5 sm:py-2 md:py-2.5 lg:py-3 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base lg:text-lg w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
