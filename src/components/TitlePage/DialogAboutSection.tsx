"use client";

import { DialogAboutSectionProps } from "@/types/title";
import { getContentRating } from "@/utils/contentHelpers";
import type { Movie } from "@/types/movie";

export default function DialogAboutSection({
  title,
  casts,
  genres,
  tags,
  moodTags,
  productionCompanies,
  contentRating,
  releaseDate,
  auditDate,
  isTV,
  onExploreClick,
  movieData,
}: DialogAboutSectionProps) {
  // Use centralized content rating utility if movieData is available
  const rating = movieData
    ? getContentRating(movieData)
    : contentRating === "18_PLUS"
      ? "A 18+"
      : contentRating === "21_PLUS"
        ? "A 21+"
        : "U/A 16+";

  // Format release date to "March 05, 2026"
  const formatReleaseDate = (date?: string) => {
    if (!date) return null;

    const dateObj = new Date(date);
    // Check if date is valid
    if (isNaN(dateObj.getTime())) return null;

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    return dateObj.toLocaleDateString("en-US", options);
  };

  // Use release_date from API directly
  const formattedDate = releaseDate ? formatReleaseDate(releaseDate) : null;

  return (
    <div id="about-section" className="mt-12">
      <h2 className="text-white/80 text-xl mb-6">
        About <span className="font-medium text-2xl">{title}</span>
      </h2>

      <div className="space-y-2">
        {/* Release Date */}
        {formattedDate && (
          <div className="text-sm">
            <span className="text-gray-400">Release Date: </span>
            <span className="text-white/80">{formattedDate}</span>
          </div>
        )}

        {/* Production Companies */}
        {productionCompanies && productionCompanies.length > 0 && (
          <div className="text-sm">
            <span className="text-gray-400">Studio: </span>
            <span className="text-white/80">
              {productionCompanies.slice(0, 2).map((company, index) => (
                <span key={company.id}>
                  <button
                    onClick={() =>
                      onExploreClick?.(company.name, company.name, false)
                    }
                    className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                  >
                    {company.name}
                  </button>
                  {index < Math.min(productionCompanies.length, 2) - 1 && ", "}
                </span>
              ))}
            </span>
          </div>
        )}

        {/* Cast */}
        {casts && casts.length > 0 && (
          <div className="text-sm">
            <span className="text-gray-400">Cast: </span>
            <span className="text-white/80">
              {casts.map((cast, index) => (
                <span key={cast.id}>
                  <button
                    onClick={() => onExploreClick?.(cast.name, cast.name, true)}
                    className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                  >
                    {cast.name}
                  </button>
                  {index < casts.length - 1 && ", "}
                </span>
              ))}
            </span>
          </div>
        )}

        {/* Genres */}
        {genres && genres.length > 0 && (
          <div className="text-sm">
            <span className="text-gray-400">Genres: </span>
            <span className="text-white/80">
              {genres.map((genre, index) => (
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
                  {index < genres.length - 1 && ", "}
                </span>
              ))}
            </span>
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="text-sm">
            <span className="text-gray-400">Tags: </span>
            <span className="text-white/80">
              {tags.map((tag, index) => (
                <span key={tag.id}>
                  <button
                    onClick={() =>
                      onExploreClick?.(tag.name, `${tag.name} Content`, false)
                    }
                    className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                  >
                    {tag.name}
                  </button>
                  {index < tags.length - 1 && ", "}
                </span>
              ))}
            </span>
          </div>
        )}

        {/* Mood Tags */}
        {moodTags && moodTags.length > 0 && (
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

        {/* Maturity Rating */}
        <div className="text-sm">
          <span className="text-gray-400">Maturity Rating: </span>
          <div className="inline-flex items-center gap-2 mt-1">
            <span className="border border-white/40 px-2 text-xs text-white/80">
              {rating}
            </span>
          </div>
          <p className="text-white/90 text-xs mt-2 leading-relaxed">
            {contentRating === "21_PLUS"
              ? "Suitable for persons aged 21 and above"
              : contentRating === "18_PLUS"
                ? "Suitable for persons aged 18 and above"
                : "Suitable for persons aged 16 and above and under parental guidance for people under age of 16"}
          </p>
        </div>
      </div>
    </div>
  );
}
