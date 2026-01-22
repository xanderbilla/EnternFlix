"use client";

import { memo } from "react";
import Icon from "@/components/Icon/Icon";
import Button from "@/components/Button/Button";
import { BannerContentProps } from "@/types/components";

export default function BannerContent({
  title,
  description,
  movieId,
  onMoreInfoClick,
}: BannerContentProps) {
  return (
    <div className="absolute bottom-1/3 md:bottom-1/3 lg:bottom-2/5 left-0 right-0 px-4 md:px-16">
      <h1 className="font-bold text-white mb-6 leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {title}
      </h1>
      <p className="text-white/90 max-w-3xl leading-relaxed text-base sm:text-lg md:text-xl mb-8">
        {description}
      </p>

      <div className="flex flex-row items-center gap-3 mt-6">
        <Button
          variant="banner-play"
          className="py-2 md:py-3 px-4 md:px-6 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center"
        >
          <Icon name="playFill" className="mr-1" /> Play
        </Button>
        <Button
          variant="banner-info"
          className="py-2 md:py-3 px-4 md:px-6 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center gap-1"
          onClick={onMoreInfoClick}
        >
          <Icon name="info" className="mr-1" /> More Info
        </Button>
      </div>
    </div>
  );
}
