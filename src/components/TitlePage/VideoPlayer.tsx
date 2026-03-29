"use client";

import Image from "next/image";
import { VideoPlayerProps } from "@/types/title";
import { getImageUrl } from "@/utils/movieHelpers";

export default function VideoPlayer({ data }: VideoPlayerProps) {
  const backdropUrl = getImageUrl(data.backdrop_path || "", "original");

  return (
    <>
      {/* Show backdrop image only - No Video */}
      {backdropUrl ? (
        <Image
          className="absolute inset-0 w-full h-full object-cover brightness-[60%]"
          src={backdropUrl}
          alt={`${data.title ?? data.name ?? data.original_name} backdrop`}
          width={1920}
          height={1080}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-zinc-900" />
      )}
    </>
  );
}
