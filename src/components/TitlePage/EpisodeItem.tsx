"use client";

import { memo } from "react";
import { DialogEpisode } from "@/types/title";

interface EpisodeItemProps {
  episode: DialogEpisode;
  index: number;
  showAllEpisodes: boolean;
  hasBorder: boolean;
}

export default function EpisodeItem({
  episode,
  index,
  showAllEpisodes,
  hasBorder,
}: EpisodeItemProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 hover:rounded-md transition-all duration-300 ease-out ${
        hasBorder ? "border-b border-white/20" : ""
      }`}
    >
      <div className="text-white/60 text-2xl font-light w-6 text-center">
        {episode.id}
      </div>
      <div className="w-36 h-20 bg-zinc-700 rounded overflow-hidden flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start text-white/80 mb-2">
          <h3 className="text-sm font-medium">{episode.title}</h3>
          <span className="text-xs text-white/60 ml-4 flex-shrink-0">
            {episode.duration}
          </span>
        </div>
        <p className="text-xs text-white/60 line-clamp-2">
          {episode.description}
        </p>
      </div>
    </div>
  );
}
