"use client";

import { useState } from "react";
import { DialogBannerProps } from "@/types/title";
import DialogVideoSection from "./DialogVideoSection";
import DialogSeasonSelector from "./DialogSeasonSelector";
import DialogEpisodesList from "./DialogEpisodesList";
import DialogInfoSection from "./DialogInfoSection";
import DialogAboutSection from "./DialogAboutSection";
import DialogMetadataSection from "./DialogMetadataSection";
import {
  mockCast,
  mockGenres,
  mockTags,
  mockEpisodes,
} from "@/constants/mockData";
import { getReleaseYear, getContentType } from "@/utils/movieHelpers";

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

  const releaseYear = data ? getReleaseYear(data) : "Unknown";

  const isTV = data ? getContentType(data) === "TV" : false;
  const numberOfSeasons = data?.numberOfSeasons || 1;

  const casts = data?.casts || [];
  const genres = data?.genres || [];
  const tags = data?.tags || [];
  const moodTags = data?.moodTags || [];

  return (
    <div className="bg-zinc-900">
      {/* Banner Section */}
      <DialogVideoSection data={data} onClose={onClose} />

      {/* Information Section */}
      <div className="relative -mt-px px-4 md:px-16 py-8 bg-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <DialogInfoSection
            releaseYear={releaseYear}
            isTV={!!isTV}
            numberOfSeasons={numberOfSeasons}
            overview={data?.overview || ""}
            runtime={data?.runtime}
            contentRating={data?.contentRating}
            movieData={data ?? undefined}
          />

          {/* Right Column - Inline Info */}
          <DialogMetadataSection
            casts={casts}
            genres={genres}
            moodTags={moodTags}
            isTV={!!isTV}
            tagline={data?.tagline}
            onExploreClick={onExploreClick}
            onScrollToAbout={handleScrollToAbout}
          />
        </div>

        {/* Episodes Section - Only for TV Shows */}
        {isTV && (
          <DialogEpisodesList
            episodes={mockEpisodes}
            selectedSeason={selectedSeason}
            numberOfSeasons={numberOfSeasons}
            onSeasonChange={setSelectedSeason}
            contentId={data?.id}
          />
        )}

        {/* About Section - Full Width at Bottom */}
        <DialogAboutSection
          title={data?.title ?? ""}
          casts={casts}
          genres={genres}
          tags={tags}
          moodTags={moodTags}
          productionCompanies={data?.studios || []}
          contentRating={data?.contentRating}
          releaseDate={data?.releaseDate || data?.firstAirDate}
          auditDate={data?.audit?.createdAt}
          isTV={!!isTV}
          originCountry={data?.originCountry}
          originalLanguage={data?.originalLanguage}
          onExploreClick={onExploreClick}
          movieData={data ?? undefined}
        />
      </div>
    </div>
  );
};

export default DialogBanner;
