import Image from "next/image";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { SlLike } from "react-icons/sl";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  data: Record<string, any>;
  isFirst: boolean;
  isLast: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, isFirst, isLast }) => {
  const router = useRouter();

  const getPositionClass = () => {
    if (isFirst) return "left-0";
    if (isLast) return "right-0";
    return "left-1/2 -translate-x-1/2";
  };

  const getTruncatedTitle = () => {
    const title = data?.title || data?.name || data?.original_name;
    if (!title) return "";
    return title.length > 25 ? title.slice(0, 25) + "..." : title;
  };

  const getReleaseYear = () => {
    const date = data?.release_date || data?.first_air_date;
    return date ? date.split("-")[0] : "";
  };

  const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  const navigateToTitle = () => router.push(`/title/${data?.id}`);

  return (
    <div className="group/item relative w-full h-[240px] md:h-[280px] lg:h-[320px]">
      <div className="relative w-full h-full bg-zinc-900 rounded-md overflow-hidden">
        <button
          className="w-full h-full border-0 p-0 cursor-pointer"
          onClick={navigateToTitle}
          onKeyDown={(e) => handleKeyPress(e, navigateToTitle)}
          aria-label={`View details for ${
            data?.title || data?.name || "this title"
          }`}
        >
          <Image
            className="object-cover transition duration-300 shadow-xl rounded-md 
            group-hover/item:opacity-0 delay-300 w-full h-full"
            layout="fill"
            src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
            alt={data?.title || data?.name || data?.original_name}
          />
        </button>
      </div>

      <div
        className={`hidden md:block opacity-0 absolute top-0 transition duration-300 z-10
        invisible sm:visible delay-300 scale-0 group-hover/item:scale-110 
        group-hover/item:translate-y-[5vh] group-hover/item:opacity-100
        w-[280px] md:w-[320px] lg:w-[360px] h-[180px] md:h-[200px] lg:h-[220px]
        ${getPositionClass()}`}
      >
        <button
          className="w-full h-[60%] border-0 p-0 cursor-pointer relative"
          onClick={navigateToTitle}
          onKeyDown={(e) => handleKeyPress(e, navigateToTitle)}
          aria-label={`View details for ${
            data?.title || data?.name || "this title"
          }`}
        >
          <Image
            className="object-cover transition duration shadow-xl rounded-t-md w-full h-full"
            fill
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
            alt={data?.title || data?.name || data?.original_name}
          />
        </button>
        <div className="bg-gradient-to-t from-black via-zinc-800/90 to-transparent absolute bottom-0 w-full h-[45%] transition rounded-b-md shadow-md">
          <div className="absolute bottom-0 w-full p-4 flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <button
                  className="w-8 h-8 bg-white rounded-full 
                  flex justify-center items-center transition hover:bg-neutral-300"
                  onClick={() => {}}
                  onKeyDown={(e) => handleKeyPress(e, () => {})}
                  aria-label="Play"
                >
                  <BsFillPlayFill size={22} color="black" />
                </button>
                <button
                  className="w-8 h-8 bg-white rounded-full 
                  flex justify-center items-center transition hover:bg-neutral-300"
                  onClick={() => {}}
                  onKeyDown={(e) => handleKeyPress(e, () => {})}
                  aria-label="Add to list"
                >
                  <IoMdAdd size={22} color="black" />
                </button>
                <button
                  className="w-8 h-8 bg-white rounded-full 
                  flex justify-center items-center transition hover:bg-neutral-300"
                  onClick={() => {}}
                  onKeyDown={(e) => handleKeyPress(e, () => {})}
                  aria-label="Like"
                >
                  <SlLike size={18} color="black" />
                </button>
              </div>
              <button
                className="w-8 h-8 bg-white rounded-full 
                flex justify-center items-center transition hover:bg-neutral-300"
                onClick={navigateToTitle}
                onKeyDown={(e) => handleKeyPress(e, navigateToTitle)}
                aria-label="More information"
              >
                <IoIosArrowDown size={22} color="black" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="text-green-400 font-semibold text-base cursor-pointer flex items-center bg-transparent border-0 p-0 hover:text-green-300"
                onClick={navigateToTitle}
                onKeyDown={(e) => handleKeyPress(e, navigateToTitle)}
                aria-label={`View details for ${getTruncatedTitle()}`}
              >
                {getTruncatedTitle()}
                <span className="text-white text-sm ml-2">
                  {getReleaseYear()}
                </span>
              </button>
              <div className="flex flex-row gap-2 items-center">
                <span className="text-white text-xs border border-white/40 px-1.5 py-0.5 rounded">
                  U/A 16+
                </span>
                <span className="text-white text-xs">
                  {data?.media_type === "tv" ? "TV Show" : "Movie"}
                </span>
                <span className="text-white text-xs bg-white/20 px-1.5 py-0.5 rounded">
                  HD
                </span>
              </div>
              <div className="flex flex-row gap-2 items-center text-white/80 text-xs">
                <span>1hr 23m</span>
                <span>&#8729;</span>
                <span>Comedy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
