"use client";

import { useCallback, memo } from "react";
import DialogSeasonSelector from "./DialogSeasonSelector";
import EpisodeItem from "./EpisodeItem";
import { DialogEpisodesListProps, DialogEpisode } from "@/types/title";

function DialogEpisodesList({
  episodes,
  selectedSeason,
  numberOfSeasons,
  onSeasonChange,
}: DialogEpisodesListProps) {
  const renderEpisode = useCallback(
    (episode: DialogEpisode, index: number) => (
      <EpisodeItem
        key={episode.id}
        episode={episode}
        index={index}
        showAllEpisodes={true}
        hasBorder={index < episodes.length - 1}
      />
    ),
    [episodes.length],
  );

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white/80 text-2xl font-medium">Episodes</h2>
          <DialogSeasonSelector
            selectedSeason={selectedSeason}
            numberOfSeasons={numberOfSeasons}
            onSeasonChange={onSeasonChange}
          />
        </div>

        <div className="mb-6">
          <span className="text-white text-base text-white/80 font-medium">
            Season {selectedSeason}:{" "}
          </span>
          <span className="border border-white/40 px-2 py-1 text-xs text-white mr-3">
            U/A 13+
          </span>
          <span className="text-white/70 text-sm">
            violence, threat, mature themes, language, nudity
          </span>
        </div>

        <div className="space-y-0">{episodes.map(renderEpisode)}</div>
      </div>
    </>
  );
}

export default memo(DialogEpisodesList);
