"use client";

import { useState } from "react";
import { DialogBannerProps } from "@/types/title";
import DialogVideoSection from "./DialogVideoSection";
import DialogSeasonSelector from "./DialogSeasonSelector";
import DialogEpisodesList from "./DialogEpisodesList";
import DialogInfoSection from "./DialogInfoSection";
import DialogAboutSection from "./DialogAboutSection";
import {
  mockCast,
  mockGenres,
  mockTags,
  mockEpisodes,
} from "@/constants/mockData";

const DialogBanner: React.FC<DialogBannerProps> = ({
  data,
  mediaType,
  onClose,
  onExploreClick,
}) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const releaseYear = data?.first_air_date
    ? data.first_air_date.substring(0, 4)
    : data?.release_date
      ? data.release_date.substring(0, 4)
      : "Unknown";

  const isTV = data?.first_air_date || data?.number_of_seasons;
  const numberOfSeasons = data?.number_of_seasons || 1;

  return (
    <div className="bg-zinc-900">
      {/* Banner Section */}
      <DialogVideoSection data={data} onClose={onClose} />

      {/* Information Section */}
      <div className="px-4 md:px-16 py-8 bg-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <DialogInfoSection
            releaseYear={releaseYear}
            isTV={!!isTV}
            numberOfSeasons={numberOfSeasons}
            overview={data?.overview || ""}
          />

          {/* Right Column - Inline Info */}
          <div className="space-y-3">
            {/* Cast */}
            <div className="text-sm">
              <span className="text-gray-400">Cast: </span>
              <span className="text-white/80">
                {mockCast.slice(0, 3).map((cast, index) => (
                  <span key={cast}>
                    <button
                      onClick={() => onExploreClick?.(cast, cast, true)}
                      className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                    >
                      {cast}
                    </button>
                    {index < mockCast.slice(0, 3).length - 1 && ", "}
                  </span>
                ))}
                {mockCast.length > 3 && (
                  <>
                    ,{" "}
                    <button
                      onClick={handleScrollToAbout}
                      className="text-white/80 hover:underline hover:underline-offset-2 cursor-pointer italic"
                    >
                      more
                    </button>
                  </>
                )}
              </span>
            </div>

            {/* Genres */}
            <div className="text-sm">
              <span className="text-gray-400">Genres: </span>
              <span className="text-white/80">
                {mockGenres.slice(0, 3).map((genre, index) => (
                  <span key={genre}>
                    <button
                      onClick={() =>
                        onExploreClick?.(
                          genre,
                          `${genre} Movies & Shows`,
                          false,
                        )
                      }
                      className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                    >
                      {genre}
                    </button>
                    {index < mockGenres.slice(0, 3).length - 1 && ", "}
                  </span>
                ))}
                {mockGenres.length > 3 && (
                  <>
                    ,{" "}
                    <button
                      onClick={handleScrollToAbout}
                      className="text-white/80 hover:underline hover:underline-offset-2 cursor-pointer italic"
                    >
                      more
                    </button>
                  </>
                )}
              </span>
            </div>

            {/* This Movie/Show Is */}
            <div className="text-sm">
              <span className="text-gray-400">
                This {isTV ? "Show" : "Movie"} Is:{" "}
              </span>
              <span className="text-white/80">
                {mockTags.map((tag, index) => (
                  <span key={tag}>
                    <button
                      onClick={() =>
                        onExploreClick?.(tag, `${tag} Content`, false)
                      }
                      className="hover:underline hover:underline-offset-2 cursor-pointer hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                    {index < mockTags.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>

        {/* Episodes Section - Only for TV Shows */}
        {isTV && (
          <DialogEpisodesList
            episodes={mockEpisodes}
            selectedSeason={selectedSeason}
            numberOfSeasons={numberOfSeasons}
            onSeasonChange={setSelectedSeason}
          />
        )}

        {/* About Section - Full Width at Bottom */}
        <DialogAboutSection
          title={data?.title ?? data?.name ?? data?.original_name ?? ""}
          mockCast={mockCast}
          mockGenres={mockGenres}
          onExploreClick={onExploreClick}
        />
      </div>
    </div>
  );
};

export default DialogBanner;
