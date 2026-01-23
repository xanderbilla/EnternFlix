"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import Button from "@/components/Button/Button";
import { useTrending } from "@/hooks/api/useMovies";
import { getImageUrl } from "@/utils/movieHelpers";

export default function NotFoundContent() {
  const { data: trendingData } = useTrending();

  // Get random backdrop from trending data
  const backdrop = trendingData?.results?.length
    ? trendingData.results[
        Math.floor(Math.random() * trendingData.results.length)
      ].backdrop_path
    : null;

  return (
    <div className="relative h-screen w-full">
      {/* Backdrop Image */}
      {backdrop ? (
        <Image
          className="w-full h-full object-cover brightness-[60%]"
          src={getImageUrl(backdrop, "original")}
          alt="Not Found Background"
          width={1920}
          height={1080}
          priority
        />
      ) : (
        <div className="w-full h-full bg-zinc-900" />
      )}

      {/* Gradient Overlays */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t z-0 from-zinc-900 to-transparent" />
      <div className="absolute top-0 left-0 w-full lg:w-3/4 xl:w-2/3 h-full bg-gradient-to-r from-black to-transparent">
        {/* Content */}
        <div className="absolute top-[35%] md:top-[25%] ml-4 md:ml-16">
          {/* Subtitle */}
          <h2 className="text-white text-2xl md:text-4xl lg:text-5xl xl:text-6xl h-full w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] font-bold drop-shadow-xl mb-4">
            Content Not Available
          </h2>

          {/* Meta Info */}
          <div className="flex gap-2 md:gap-4 font-light text-zinc-400 text-sm md:text-base mt-2 md:mt-4 lg:text-lg drop-shadow-xl">
            <p className="text-xs md:text-sm lg:text-lg">Error</p>
            <p className="border border-zinc-400 px-1 md:px-2 text-xs md:text-sm lg:text-lg">
              Not Found
            </p>
          </div>

          {/* Description */}
          <p className="text-white text-sm md:text-base mt-3 md:mt-8 w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%] lg:text-lg drop-shadow-xl">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Discover thousands of movies, TV shows, and anime in our
            collection.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row items-center mt-4 md:mt-6 gap-3">
            <Link href="/">
              <Button
                variant="banner-play"
                className="py-2 md:py-3 px-4 md:px-6 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center"
              >
                <Icon name="home" size={20} className="mr-1" /> Go Home
              </Button>
            </Link>
            <Link href="/search">
              <Button
                variant="banner-info"
                className="py-2 md:py-3 px-4 md:px-6 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center gap-1"
              >
                <Icon name="search" size={20} className="mr-1" /> Search Content
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
