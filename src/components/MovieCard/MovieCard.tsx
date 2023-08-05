import Image from "next/image";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { SlLike } from "react-icons/sl";
import { RxCross1 } from "react-icons/rx";
interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <div className="group bg-zinc-900 col-span relative h-[24vw] lg:h-[12vw] md:h-[16vw]">
      <Image
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md 
        group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
        fill
        src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
        alt={data?.title || data?.name || data?.original_name}
      />
      <div
        className="h-[36vh] opacity-0 absolute top-0 transition duration-500 z-10 
      invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 
      group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100"
      >
        <Image
          className="cursor-pointer object-cover absolute transition duration shadow-xl 
          rounded-t-md  w-full h-[12vh]"
          fill
          src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
          alt={data?.title || data?.name || data?.original_name}
        />
        <div className="bg-zinc-800 p-2 lg:p-4 absolute bottom-0 w-full transition shadow-md">
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-center gap-3">
              <div
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full 
              flex justify-center items-center transition hover:bg-neutral-300"
                onClick={() => {}}
              >
                <BsFillPlayFill size={26} />
              </div>
              <div
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border border-neutral-100 text-white rounded-full 
              flex justify-center items-center transition  hover:bg-white hover:text-black"
                onClick={() => {}}
              >
                <IoMdAdd size={26} />
              </div>
              <div
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border border-neutral-100 text-white rounded-full 
              flex justify-center items-center transition hover:bg-white hover:text-black"
                onClick={() => {}}
              >
                <SlLike size={18} />
              </div>
              <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border border-neutral-100 text-white rounded-full 
              flex justify-center items-center transition hover:bg-white hover:text-black"
              onClick={() => {}}
            >
              <RxCross1 size={18} />
            </div>
            </div>
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border border-neutral-100 text-white rounded-full 
              flex justify-center items-center transition hover:bg-white hover:text-black"
              onClick={() => {}}
            >
              <IoIosArrowDown size={24} />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
          {data?.title || data?.name || data?.original_name} <span className="text-white px-2">{data?.release_date?.split('-')[0] || data?.first_air_date?.split('-')[0]}</span>
          </p>
          <div className="flex flex-row mt-3 md:mt-2 gap-2 items-center">
            <p
              className="border border-neutral-500/90 rounded-lg p-1 px-2 text-white 
            text-[12px] lg:text-sm font-medium"
            >
              U/A 16+
            </p>
            <p className="text-white text-[12px] lg:text-sm">{data?.media_type === 'tv' ? 'TV Show' : 'Movie'}</p>
            <p className="bg-neutral-600 px-2 rounded-md text-white text-[12px] lg:text-sm">
              HD
            </p>
          </div>
          <div className="flex flex-row mt-2 gap-2 items-center">
            <p className="text-white text-[12px] lg:text-sm">1hr 23m</p>
            <p className="text-white text-[12px] lg:text-sm">&#8729;</p>
            <p className="text-white text-[12px] lg:text-sm">Comedy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
