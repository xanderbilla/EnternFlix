import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { SlLike } from "react-icons/sl";
import { videosData } from "../../static/video";

type EpisodesGridProps = {
  seasonNumber: number;
  seasonName: string;
};

export const EpisodesGrid = ({
  seasonNumber,
  seasonName,
}: EpisodesGridProps) => {
  return (
    <>
      {/* Episodes Section Header */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white">Episodes</h3>
        <p className="text-sm sm:text-base text-zinc-400 mt-1">
          All episodes from {seasonName}
        </p>
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
        {videosData[seasonNumber]?.map((video) => (
          <div
            key={video.id}
            className="group/item relative bg-zinc-900 overflow-hidden h-48 sm:h-44 md:h-48 lg:h-52 xl:h-56"
          >
            <button
              className="w-full h-full border-0 p-0 cursor-pointer relative"
              onClick={() => {}}
              aria-label={`View details for ${video.title}`}
            >
              <Image
                className="object-cover transition duration shadow-xl w-full h-full"
                fill
                src={video.imageUrl}
                alt={video.title}
              />
            </button>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
              <div className="absolute bottom-0 w-full p-2 px-3 flex flex-col gap-2">
                <div className="gap-2 flex flex-row items-center md:opacity-0 md:pointer-events-none md:group-hover/item:opacity-100 md:group-hover/item:pointer-events-auto md:flex transition-opacity duration-200">
                  <button
                    className="w-6 h-6 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                    onClick={() => {}}
                    aria-label="Play"
                  >
                    <BsFillPlayFill size={16} color="black" />
                  </button>
                  <button
                    className="w-6 h-6 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                    onClick={() => {}}
                    aria-label="Add to list"
                  >
                    <IoMdAdd size={16} color="black" />
                  </button>
                  <button
                    className="w-6 h-6 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                    onClick={() => {}}
                    aria-label="Like"
                  >
                    <SlLike size={14} color="black" />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    className="text-green-400 font-semibold text-xs cursor-pointer flex items-center bg-transparent border-0 p-0 hover:text-green-300"
                    onClick={() => {}}
                    aria-label={`View details for ${video.title}`}
                  >
                    {video.title}
                  </button>
                  <div className="flex flex-row gap-2 items-center text-white/80 text-xs">
                    <span>Episode {video.id}</span>
                    <span className="bg-white/20 px-1.5 py-0.5 rounded">
                      HD
                    </span>
                    <span>&#8729;</span>
                    <span>Season {seasonNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
