import Image from "next/image";
import { BsPlayFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";

type SeasonDetailsProps = {
  seasonData: {
    id: number;
    season_number: number;
    name: string;
    overview: string;
    air_date: string;
    episode_count: number;
    poster_path: string;
  };
  onPlaySeason: () => void;
};

export const SeasonDetails = ({
  seasonData,
  onPlaySeason,
}: SeasonDetailsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8 sm:mb-10 md:mb-12 rounded-xl overflow-visible flex flex-col lg:flex-row items-stretch gap-4 md:gap-6">
      {/* Season Poster */}
      <div className="flex justify-center items-center w-full lg:w-[280px] flex-shrink-0 self-center">
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${seasonData.poster_path}`}
            alt={`Season ${seasonData.season_number} poster`}
            width={280}
            height={420}
            className="rounded-lg shadow-md object-contain w-full h-full"
            style={{
              maxHeight: "420px",
              width: "auto",
              height: "auto",
              background: "#23272f",
            }}
          />
        </div>
      </div>

      {/* Season Info */}
      <div className="flex-1 flex flex-col justify-center bg-zinc-800/60 rounded-xl p-4 sm:p-6 md:p-8 min-w-0 lg:h-[420px]">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 h-full">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {seasonData.name ?? `Season ${seasonData.season_number}`}
              </h2>
              <div className="flex items-center gap-2 text-zinc-400 flex-wrap">
                <span className="text-sm">
                  Season {seasonData.season_number}
                </span>
                <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                <span className="text-sm">
                  {seasonData.episode_count} Episodes
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4 flex-grow">
              <div className="space-y-2">
                <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
                  Genres
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-zinc-700/50 rounded text-sm text-zinc-300">
                    Family
                  </span>
                  <span className="px-2 py-1 bg-zinc-700/50 rounded text-sm text-zinc-300">
                    Animation
                  </span>
                  <span className="px-2 py-1 bg-zinc-700/50 rounded text-sm text-zinc-300">
                    Comedy
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
                    Seasons
                  </h4>
                  <p className="text-sm text-zinc-300">36</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
                    Episodes
                  </h4>
                  <p className="text-sm text-zinc-300">785</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-zinc-400 uppercase tracking-wider">
                    Status
                  </h4>
                  <p className="text-sm text-zinc-300">Returning Series</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="space-y-2 flex-grow">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Overview
              </h3>
              <div
                className={`space-y-4 ${
                  !isExpanded
                    ? "max-h-[calc(420px-12rem)] overflow-hidden"
                    : "max-h-[calc(420px-12rem)] overflow-y-auto"
                } pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
              >
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {seasonData.overview ??
                    `In Season ${seasonData.season_number}, prepare to be swept away into a world where every moment is a revelation. As the story unfolds across ${seasonData.episode_count} meticulously crafted episodes, you'll witness the perfect storm of drama, action, and emotion that has captivated audiences worldwide.`}
                </p>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {`This season pushes boundaries with its bold narrative choices and stunning visual storytelling. From the very first episode, you'll be drawn into a web of intrigue that keeps you guessing until the final moments. The characters you've grown to love face their greatest challenges yet, while new faces emerge to shake up the established order.`}
                </p>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {`What secrets will be revealed? Which alliances will be tested? And how will the choices made in these ${seasonData.episode_count} episodes change everything? The answers await in this unforgettable season that redefines what's possible in storytelling.`}
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={onPlaySeason}
            className="bg-white text-black rounded-md py-1.5 px-4 sm:px-5 font-semibold flex items-center gap-2 hover:bg-neutral-200 transition text-sm"
          >
            <BsPlayFill className="text-lg" /> Play Season
          </button>
          <button className="bg-zinc-700/50 text-white rounded-md py-1.5 px-4 sm:px-5 font-semibold flex items-center gap-2 hover:bg-zinc-700 transition text-sm">
            <IoMdAdd className="text-lg" /> Add to List
          </button>
        </div>
      </div>
    </div>
  );
};
