"use client";

import { memo } from "react";
import { truncateText } from "@/utils/contentHelpers";
import { DialogInfoSectionProps } from "@/types/title";

function DialogInfoSection({
  releaseYear,
  isTV,
  numberOfSeasons,
  overview,
}: DialogInfoSectionProps) {
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
          <span className="text-base ml-2">2h 30m</span>
        )}
        <span className="border border-white/50 p-0.5 text-xs ml-2">HD</span>
      </div>

      {/* Rating and Content Warning */}
      <div className="flex items-center text-white/80 mb-6">
        <span className="border border-white/40 px-2 py-0.5 text-xs">
          U/A 16+
        </span>
        <span className="text-xs ml-4">suicide</span>
      </div>

      {/* Description */}
      <p className="text-white/80 text-sm leading-relaxed">
        {truncateText(overview || "", 200)}
      </p>
    </div>
  );
}

export default memo(DialogInfoSection);
