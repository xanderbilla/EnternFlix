"use client";

import { Cast, Genre, Tag } from "@/types/movie";

interface DialogMetadataSectionProps {
  casts: Cast[];
  genres: Genre[];
  moodTags: Tag[];
  isTV: boolean;
  onExploreClick?: (query: string, title: string, isCast: boolean) => void;
  onScrollToAbout: () => void;
}

const DialogMetadataSection: React.FC<DialogMetadataSectionProps> = ({
  casts,
  genres,
  moodTags,
  isTV,
  onExploreClick,
  onScrollToAbout,
}) => {
  return (
    <div className="space-y-3">
      {/* Cast */}
      {casts.length > 0 && (
        <div className="text-sm">
          <span className="text-gray-400">Cast: </span>
          <span className="text-white/80">
            {casts.slice(0, 3).map((cast, index) => (
              <span key={cast.id}>
                <button
                  onClick={() => onExploreClick?.(cast.name, cast.name, true)}
                  className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                >
                  {cast.name}
                </button>
                {index < Math.min(casts.length, 3) - 1 && ", "}
              </span>
            ))}
            {casts.length > 3 && (
              <>
                ,{" "}
                <button
                  onClick={onScrollToAbout}
                  className="text-white/80 hover:underline hover:underline-offset-2 cursor-pointer italic"
                >
                  more
                </button>
              </>
            )}
          </span>
        </div>
      )}

      {/* Genres */}
      {genres.length > 0 && (
        <div className="text-sm">
          <span className="text-gray-400">Genres: </span>
          <span className="text-white/80">
            {genres.slice(0, 3).map((genre, index) => (
              <span key={genre.id}>
                <button
                  onClick={() =>
                    onExploreClick?.(
                      genre.name,
                      `${genre.name} Movies & Shows`,
                      false,
                    )
                  }
                  className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                >
                  {genre.name}
                </button>
                {index < Math.min(genres.length, 3) - 1 && ", "}
              </span>
            ))}
            {genres.length > 3 && (
              <>
                ,{" "}
                <button
                  onClick={onScrollToAbout}
                  className="text-white/80 hover:underline hover:underline-offset-2 cursor-pointer italic"
                >
                  more
                </button>
              </>
            )}
          </span>
        </div>
      )}

      {/* This Movie/Show Is (Mood Tags) */}
      {moodTags.length > 0 && (
        <div className="text-sm">
          <span className="text-gray-400">
            This {isTV ? "Show" : "Movie"} Is:{" "}
          </span>
          <span className="text-white/80">
            {moodTags.map((tag, index) => (
              <span key={tag.id}>
                <button
                  onClick={() =>
                    onExploreClick?.(tag.name, `${tag.name} Content`, false)
                  }
                  className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                >
                  {tag.name}
                </button>
                {index < moodTags.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export default DialogMetadataSection;
