"use client";

import { memo, useMemo, useState } from "react";
import { getContentRating, getQuality } from "@/utils/contentHelpers";
import { DialogInfoSectionProps } from "@/types/title";
import { getDuration } from "@/utils/movieHelpers";

const OVERVIEW_PREVIEW_LENGTH = 125;
const OVERVIEW_TOGGLE_THRESHOLD = 150;
const OVERVIEW_SECTION_HEIGHT_CLASS = "h-36";

function DialogInfoSection({
  releaseYear,
  isTV,
  numberOfSeasons,
  overview,
  runtime,
  contentRating,
  movieData,
}: DialogInfoSectionProps) {
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

  const rating = movieData
    ? getContentRating(movieData)
    : contentRating === "18_PLUS"
      ? "A 18+"
      : contentRating === "21_PLUS"
        ? "A 21+"
        : "U/A 16+";

  const quality = movieData ? getQuality(movieData) : "HD";

  const duration = movieData ? getDuration(movieData) : "2h 30m";

  const truncatedOverview = useMemo(() => {
    if (!overview) return "";
    if (overview.length <= OVERVIEW_TOGGLE_THRESHOLD) return overview;

    return `${overview.slice(0, OVERVIEW_PREVIEW_LENGTH).trimEnd()}...`;
  }, [overview]);

  const shouldShowOverviewToggle = overview.length > OVERVIEW_TOGGLE_THRESHOLD;

  return (
    <div>
      {/* Year, Duration/Seasons, Rating */}
      <div className="flex items-center text-white/50 text-xs sm:text-sm md:text-base">
        <span>{releaseYear}</span>
        {isTV ? (
          <span className="ml-2">
            {numberOfSeasons} Season{numberOfSeasons > 1 ? "s" : ""}
          </span>
        ) : (
          <span className="ml-2">{duration}</span>
        )}
        <span className="border border-white/50 p-0.5 text-[10px] sm:text-xs ml-2">
          {quality}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center text-white/80 mb-4 sm:mb-6 mt-1 sm:mt-2">
        <span className="border border-white/40 px-2 py-0.5 text-[10px] sm:text-xs">
          {rating}
        </span>
      </div>

      {/* Description */}
      <div>
        <div
          className={
            shouldShowOverviewToggle ? OVERVIEW_SECTION_HEIGHT_CLASS : undefined
          }
        >
          <div
            className={
              shouldShowOverviewToggle
                ? `overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    isOverviewExpanded
                      ? `${OVERVIEW_SECTION_HEIGHT_CLASS} overflow-y-auto no-scrollbar`
                      : "max-h-24"
                  }`
                : undefined
            }
          >
            <p className="text-white/80 text-xs sm:text-sm md:text-[15px] leading-relaxed">
              {isOverviewExpanded ? overview : truncatedOverview}
              {shouldShowOverviewToggle && (
                <>
                  {" "}
                  <button
                    type="button"
                    onClick={() => setIsOverviewExpanded((current) => !current)}
                    className="italic text-white/80 text-xs sm:text-sm md:text-[15px] hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                  >
                    {isOverviewExpanded ? "less" : "more"}
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(DialogInfoSection);
