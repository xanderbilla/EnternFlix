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

  // Extract release year from the API - use actual value even if it's 0001
  const releaseYear = data ? getReleaseYear(data as any) : "Unknown";

  // Check contentType first, then fall back to other indicators
  const isTV = data ? getContentType(data as any) === "TV" : false;
  const numberOfSeasons = data?.numberOfSeasons || 1;

  // Get data from API
  const casts = data?.casts || [];
  const genres = data?.genres || [];
  const tags = data?.tags || [];
  const moodTags = data?.moodTags || [];

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
            runtime={data?.runtime}
            contentRating={data?.contentRating}
            movieData={data as any}
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
          />
        )}

        {/* About Section - Full Width at Bottom */}
        <DialogAboutSection
          title={data?.title ?? ""}
          casts={casts}
          genres={genres}
          tags={tags}
          moodTags={moodTags}
          productionCompanies={
            data?.studios || data?.production_companies || []
          }
          contentRating={data?.contentRating}
          releaseDate={data?.releaseDate || data?.firstAirDate}
          auditDate={data?.audit?.createdAt}
          isTV={!!isTV}
          originCountry={data?.originCountry}
          originalLanguage={data?.originalLanguage}
          onExploreClick={onExploreClick}
          movieData={data as any}
        />
      </div>
    </div>
  );
};

export default DialogBanner;
