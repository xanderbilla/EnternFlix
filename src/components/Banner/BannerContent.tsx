"use client";

import { memo } from "react";
import ActionButton from "@/components/Button/ActionButton";
import { BannerContentProps } from "@/types/components";

export default function BannerContent({
  title,
  description,
  movieId,
  contentRating,
  onMoreInfoClick,
}: BannerContentProps) {
  return (
    <div className="absolute bottom-1/3 md:bottom-1/3 lg:bottom-2/5 left-0 right-0 px-4 sm:px-8 md:px-12 lg:px-16">
      <h1 className="font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {title}
      </h1>
      <p className="text-white/90 max-w-xl md:max-w-2xl lg:max-w-3xl leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">
        {description}
      </p>

      <div className="flex flex-row items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
        <ActionButton
          variant="primary"
          icon="play"
          label="Play"
          className="text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8"
        />
        <ActionButton
          variant="secondary"
          icon="info"
          label="More Info"
          onClick={onMoreInfoClick}
          className="text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8"
        />
      </div>
    </div>
  );
}
