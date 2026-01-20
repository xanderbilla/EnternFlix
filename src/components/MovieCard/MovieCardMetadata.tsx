interface MovieCardMetadataProps {
  truncatedTitle: string;
  releaseYear: string;
  contentType: string;
  duration: string;
  genres: string;
  onTitleClick: () => void;
  handleKeyPress: (event: React.KeyboardEvent, action: () => void) => void;
}

export default function MovieCardMetadata({
  truncatedTitle,
  releaseYear,
  contentType,
  duration,
  genres,
  onTitleClick,
  handleKeyPress,
}: MovieCardMetadataProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        className="text-green-400 font-semibold text-base cursor-pointer flex items-center bg-transparent border-0 p-0 hover:text-green-300"
        onClick={onTitleClick}
        onKeyDown={(e) => handleKeyPress(e, onTitleClick)}
        aria-label={`View details for ${truncatedTitle}`}
      >
        {truncatedTitle}
        <span className="text-white text-sm ml-2">{releaseYear}</span>
      </button>
      <div className="flex flex-row gap-2 items-center">
        <span className="text-white text-xs border border-white/40 px-1.5 py-0.5 rounded">
          U/A 16+
        </span>
        <span className="text-white text-xs">{contentType}</span>
        <span className="text-white text-xs bg-white/20 px-1.5 py-0.5 rounded">
          HD
        </span>
      </div>
      <div className="flex flex-row gap-2 items-center text-white/80 text-xs">
        <span>{duration}</span>
        <span>&#8729;</span>
        <span>{genres}</span>
      </div>
    </div>
  );
}
