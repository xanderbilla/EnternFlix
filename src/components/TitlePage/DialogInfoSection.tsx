"use client";

import { memo } from "react";
import {
  truncateText,
  getContentRating,
  getQuality,
} from "@/utils/contentHelpers";
import { DialogInfoSectionProps } from "@/types/title";
import { getDuration } from "@/utils/movieHelpers";

function DialogInfoSection({
  releaseYear,
  isTV,
  numberOfSeasons,
  overview,
  runtime,
  contentRating,
  movieData,
}: DialogInfoSectionProps) {
  const rating = movieData
    ? getContentRating(movieData)
    : contentRating === "18_PLUS"
      ? "A 18+"
      : contentRating === "21_PLUS"
        ? "A 21+"
        : "U/A 16+";

  const quality = movieData ? getQuality(movieData) : "HD";

  const duration = movieData ? getDuration(movieData) : "2h 30m";

  return (
    <div>
      {/* Year, Duration/Seasons, Rating */}
      <div className="flex items-center text-white/50">
        <span className="text-base">{releaseYear}</span>
        {isTV ? (
          <span className="text-base ml-2">
            {numberOfSeasons} Season{numberOfSeasons > 1 ? "s" : ""}
          </span>
        ) : (
          <span className="text-base ml-2">{duration}</span>
        )}
        <span className="border border-white/50 p-0.5 text-xs ml-2">
          {quality}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center text-white/80 mb-6">
        <span className="border border-white/40 px-2 py-0.5 text-xs">
          {rating}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/80 text-sm leading-relaxed">
        {truncateText(overview || "", 200)}
      </p>
    </div>
  );
}

export default memo(DialogInfoSection);
