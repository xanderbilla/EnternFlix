"use client";

import { useCallback, memo, useState } from "react";
import DialogSeasonSelector from "./DialogSeasonSelector";
import EpisodeItem from "./EpisodeItem";
import { DialogEpisodesListProps, DialogEpisode } from "@/types/title";
import Icon from "@/components/Icon/Icon";

const INITIAL_EPISODES_COUNT = 8;

function DialogEpisodesList({
  episodes,
  selectedSeason,
  numberOfSeasons,
  onSeasonChange,
}: DialogEpisodesListProps) {
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  const hasMoreEpisodes = episodes.length > INITIAL_EPISODES_COUNT;
  const displayedEpisodes = showAllEpisodes
    ? episodes
    : episodes.slice(0, INITIAL_EPISODES_COUNT);

  const handleToggleEpisodes = useCallback(() => {
    setShowAllEpisodes((prev) => !prev);
  }, []);

  const handleSeasonChange = useCallback(
    (season: number) => {
      setShowAllEpisodes(false);
      onSeasonChange(season);
    },
    [onSeasonChange],
  );

  const renderEpisode = useCallback(
    (episode: DialogEpisode, index: number) => (
      <EpisodeItem
        key={episode.id}
        episode={episode}
        index={index}
        showAllEpisodes={showAllEpisodes}
        hasBorder={index < displayedEpisodes.length - 1}
      />
    ),
    [displayedEpisodes.length, showAllEpisodes],
  );

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white/80 text-2xl font-medium">Episodes</h2>
          <DialogSeasonSelector
            selectedSeason={selectedSeason}
            numberOfSeasons={numberOfSeasons}
            onSeasonChange={handleSeasonChange}
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

        <div className="transition-all duration-500 ease-in-out">
          <div className="space-y-0">
            {episodes.map((episode, index) => {
              const isHidden =
                !showAllEpisodes && index >= INITIAL_EPISODES_COUNT;
              return (
                <div
                  key={episode.id}
                  className={`transition-all duration-500 ease-in-out ${
                    isHidden
                      ? "opacity-0 max-h-0 overflow-hidden transform translate-y-[-10px]"
                      : "opacity-100 max-h-[200px] transform translate-y-0"
                  }`}
                >
                  <EpisodeItem
                    episode={episode}
                    index={index}
                    showAllEpisodes={showAllEpisodes}
                    hasBorder={
                      index <
                      (showAllEpisodes
                        ? episodes.length - 1
                        : Math.min(INITIAL_EPISODES_COUNT, episodes.length) - 1)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Show More/Less Button */}
        {hasMoreEpisodes && (
          <div className="flex items-center justify-center pt-2">
            <button
              onClick={handleToggleEpisodes}
              className="flex items-center justify-center w-10 h-10 text-white/80 hover:text-white border border-white/40 hover:border-white rounded-full transition-all duration-300 ease-in-out hover:bg-white/5 hover:scale-105"
              aria-label={
                showAllEpisodes ? "Show fewer episodes" : "Show more episodes"
              }
            >
              <Icon
                name={showAllEpisodes ? "chevronUp" : "chevronDown"}
                size={20}
                className="transition-all duration-300 ease-in-out transform"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(DialogEpisodesList);
