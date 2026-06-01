"use client";

import { useCallback, memo, useState } from "react";
import DialogSeasonSelector from "./DialogSeasonSelector";
import EpisodeItem from "./EpisodeItem";
import { DialogEpisodesListProps, DialogEpisode } from "@/types/title";

const INITIAL_EPISODES_COUNT = 8;

function DialogEpisodesList({
  episodes,
  selectedSeason,
  numberOfSeasons,
  onSeasonChange,
  contentId,
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
        contentId={contentId}
      />
    ),
    [displayedEpisodes.length, showAllEpisodes, contentId],
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
                    contentId={contentId}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Show More/Less Button */}
        {hasMoreEpisodes && (
          <div className="relative my-2 py-2">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/20" />
            <div className="flex items-center justify-center">
              <button
                onClick={handleToggleEpisodes}
                className="relative z-10 flex items-center justify-center w-10 h-10 text-white/80 hover:text-white border border-white/40 hover:border-white rounded-full bg-zinc-900 transition-all duration-300 ease-in-out hover:bg-zinc-800 hover:scale-105 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                aria-label={
                  showAllEpisodes ? "Show fewer episodes" : "Show more episodes"
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-300 ease-in-out ${
                    showAllEpisodes ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m12 15.586 7.293-7.293 1.414 1.414-8 8a1 1 0 0 1-1.414 0l-8-8 1.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(DialogEpisodesList);
