import Image from "next/image";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { SlLike } from "react-icons/sl";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const route = useRouter();
  return (
    <div className="group flex flex-col bg-zinc-900 col-span relative w-48 md:w-[300px] h-72 md:h-[52vh]">
      <Image
        className="cursor-pointer object-fill lg:object-fill transition duration shadow-xl rounded-md 
        group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-full"
        onClick={() => route.push("/title/70205012")}
        fill
        src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
        alt={data?.title || data?.name || data?.original_name}
      />
      <div
        className="hidden md:block md:h-[52vh] md:w-96 h-[56vh] w-[460px] opacity-0 absolute top-0 transition duration-500 z-10
      invisible ease-in-out sm:visible delay-500 scale-0 group-hover:scale-105 
      group-hover:-translate-y-[8vw] lg:group-hover:-translate-y-[3vw] group-hover:translate-x-[1vw] group-hover:opacity-100"
      >
        <Image
          className="cursor-pointer absolute object-scale-down transition duration shadow-xl 
          rounded-t-md w-full h-[2/3]"
          onClick={() => route.push("/title/70205012")}
          fill
          src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
          alt={data?.title || data?.name || data?.original_name}
        />
        <div className="bg-gradient-to-t from-black via-zinc-800 to-transparent p-2 absolute bottom-0 h-36 lg:h-40 w-full lg:p-4 transition rounded shadow-md">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-3">
              <div
                className="cursor-pointer w-8 h-8 lg:w-10 lg:h-10 bg-white/90 rounded-full 
          flex justify-center items-center transition hover:bg-neutral-300"
                onClick={() => {}}
              >
                <BsFillPlayFill size={26} color="black" />
              </div>
              <div
                className="cursor-pointer w-8 h-8 lg:w-10 lg:h-10 bg-white/90 rounded-full 
          flex justify-center items-center transition hover:bg-neutral-300"
                onClick={() => {}}
              >
                <IoMdAdd
                  size={26}
                  color="black"
                  className="text-white group-hover/item:text-neutral-300
          w-4 lg:w-6"
                />
              </div>
              <div
                className="cursor-pointer w-8 h-8 lg:w-10 lg:h-10 bg-white/90 rounded-full 
          flex justify-center items-center transition hover:bg-neutral-300"
                onClick={() => {}}
              >
                <SlLike
                  size={18}
                  color="black"
                  className="text-white group-hover/item:text-neutral-300
          w-4 lg:w-6"
                />
              </div>
            </div>
            <div
              className="cursor-pointer w-8 h-8 lg:w-10 lg:h-10 bg-white/90 rounded-full 
          flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => route.push("/title/70205012")} //Route to movie details page
            >
              <IoIosArrowDown
                size={24}
                color="black"
                className="group-hover/item:text-neutral-300
          w-4 lg:w-6"
              />
            </div>
          </div>
          <p
            className="text-green-400 font-semibold mt-2 cursor-pointer"
            onClick={() => route.push("/title/70205012")}
          >
            {(data?.title || data?.name || data?.original_name)?.length > 32
              ? (data?.title || data?.name || data?.original_name)?.slice(
                  0,
                  32
                ) + "..."
              : data?.title || data?.name || data?.original_name}
            <span className="text-white px-2">
              {data?.release_date?.split("-")[0] ||
                data?.first_air_date?.split("-")[0]}
            </span>
          </p>
          <div className="flex flex-row mt-3 md:mt-2 gap-2 items-center">
            <p
              className="border border-neutral-500/90 rounded-lg p-1 text-white 
        md:text-xs lg:font-medium"
            >
              U/A 16+
            </p>
            <p className="text-white md:text-xs">
              {data?.media_type === "tv" ? "TV Show" : "Movie"}
            </p>
            <p className="bg-neutral-600 px-1 rounded-md text-white md:text-xs">
              HD
            </p>
          </div>
          <div className="flex flex-row mt-2 gap-2 items-center">
            <p className="text-white md:text-xs">1hr 23m</p>
            <p className="text-white md:text-xs">&#8729;</p>
            <p className="text-white md:text-xs">Comedy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
