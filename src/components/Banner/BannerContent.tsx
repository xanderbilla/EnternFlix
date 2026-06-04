"use client";

import { memo } from "react";
import ActionButton from "@/components/Button/ActionButton";
import { BannerContentProps } from "@/types/components";
import { useTransition } from "@/contexts/TransitionContext";

export default function BannerContent({
  title,
  description,
  movieId,
  contentType,
  contentRating,
  onMoreInfoClick,
  showDescription = false,
}: BannerContentProps) {
  const { navigateWithTransition } = useTransition();

  const handlePlayClick = () => {
    const type = contentType === "TV" ? "tv" : "movie";
    const sourcePath =
      typeof window === "undefined"
        ? "/"
        : `${window.location.pathname}${window.location.search}${window.location.hash}`;
    navigateWithTransition(
      `/watch?id=${movieId}&type=${type}&from=${encodeURIComponent(sourcePath)}`,
    );
  };

  return (
    <div className="absolute bottom-1/3 md:bottom-1/3 lg:bottom-2/5 left-0 right-0 px-4 sm:px-8 md:px-12 lg:px-16">
      {/* Title with dynamic sizing based on description visibility */}
      <h1
        className={`font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight transition-all duration-700 ease-out ${
          showDescription
            ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        }`}
      >
        {title}
      </h1>

      {/* Description - Only show after video ends with animated expansion */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-out ${
          showDescription
            ? "max-h-32 opacity-100 mb-4 sm:mb-6 md:mb-8"
            : "max-h-0 opacity-0 mb-0"
        }`}
      >
        <p className="text-white/90 max-w-md md:max-w-lg lg:max-w-xl leading-relaxed text-base sm:text-lg md:text-xl line-clamp-3">
          {description}
        </p>
      </div>

      <div className="flex flex-row items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
        <ActionButton
          variant="primary"
          icon="play"
          label="Play"
          ariaLabel={`Play ${title}`}
          onClick={handlePlayClick}
          className="text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8"
        />
        <ActionButton
          variant="secondary"
          icon="info"
          label="More Info"
          ariaLabel={`More info about ${title}`}
          onClick={onMoreInfoClick}
          className="text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8"
        />
      </div>
    </div>
  );
}
