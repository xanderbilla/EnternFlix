import Image from "next/image";
import { useMemo } from "react";
import { getImageUrl } from "@/utils/movieHelpers";
import Icon from "@/components/Icon/Icon";
import { SearchHeroProps } from "@/types/components";

export default function SearchHero({
  movie,
  searchQuery,
  onSearchChange,
}: SearchHeroProps) {
  return (
    <div className="relative w-full">
      {movie ? (
        <>
          <div className="relative w-full h-[60vh]">
            <Image
              className="w-full h-full object-cover brightness-[60%]"
              src={getImageUrl(movie.backdrop_path, "original")}
              alt={`${movie.title ?? movie.name ?? movie.original_name} backdrop`}
              width={1920}
              height={1080}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-4xl px-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center mb-6 md:mb-8">
              Find Your Next Entertainment
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies, TV shows, anime..."
                className="
                  w-full
                  p-3 sm:p-4 md:px-12
                  pl-10 sm:pl-12
                  rounded-lg
                  bg-zinc-800/90
                  text-white
                  text-base sm:text-lg md:text-xl
                  border-2 border-transparent
                  focus:border-red-500 focus:outline-none
                  transition-all duration-300
                  backdrop-blur-sm
                "
                onChange={onSearchChange}
                value={searchQuery}
              />
              <Icon
                name="search"
                size={18}
                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="relative w-full h-[60vh] bg-zinc-800">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-4xl px-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center mb-6 md:mb-8">
              Find Your Next Entertainment
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies, TV shows, anime..."
                className="
                  w-full
                  p-3 sm:p-4 md:px-12
                  pl-10 sm:pl-12
                  rounded-lg
                  bg-zinc-800/90
                  text-white
                  text-base sm:text-lg md:text-xl
                  border-2 border-transparent
                  focus:border-red-500 focus:outline-none
                  transition-all duration-300
                  backdrop-blur-sm
                "
                onChange={onSearchChange}
                value={searchQuery}
              />
              <Icon
                name="search"
                size={18}
                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
