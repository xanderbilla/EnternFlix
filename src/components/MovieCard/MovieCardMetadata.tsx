import { memo } from "react";
import { MovieCardMetadataProps } from "@/types/components";
import { getContentRating, getQuality } from "@/utils/contentHelpers";

export default function MovieCardMetadata({
  truncatedTitle,
  releaseYear,
  contentType,
  duration,
  genres,
  onTitleClick,
  handleKeyPress,
  data,
}: MovieCardMetadataProps) {
  if (!data) return null;

  const rating = getContentRating(data);
  const quality = getQuality(data);

  // Get at most 2 tags from API response
  const displayTags = data.tags?.slice(0, 2) || [];

  return (
    <div className="flex flex-col gap-2 mt-2">
      <button
        className="text-green-400 font-semibold text-base cursor-pointer flex items-center bg-transparent border-0 p-0 hover:text-green-300"
        onClick={onTitleClick}
        onKeyDown={(e) => handleKeyPress(e, onTitleClick)}
        aria-label={`View details for ${truncatedTitle}`}
      >
        {truncatedTitle}
        <span className="text-white text-sm ml-2">{releaseYear}</span>
      </button>

      {/* First row: Rating + Media Type + Quality */}
      <div className="flex flex-row gap-2 items-center">
        <span className="text-white/60 text-xs font-light border-[0.5px] border-white/60 px-1.5 py-0.5 rounded-sm">
          {rating}
        </span>
        <span className="text-white/60 text-xs font-light">{contentType}</span>
        <span className="text-white/60 text-[10px] font-light border-[0.5px] px-[2px] border-white/60">
          {quality}
        </span>
      </div>

      {/* Second row: Tags (at most 2 from API) */}
      {displayTags.length > 0 && (
        <div className="flex flex-row gap-1 items-center text-white text-xs font-light">
          {displayTags.map((tag, index) => (
            <span key={tag.id} className="flex items-center gap-1">
              <span>{tag.name}</span>
              {index < displayTags.length - 1 && (
                <span className="text-white/30">•</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
