"use client";

import { RefObject } from "react";
import Image from "next/image";
import { VideoPlayerProps } from "@/types/title";
import { getImageUrl } from "@/utils/movieHelpers";
import { SAMPLE_VIDEO_URL } from "@/constants/video";

export default function VideoPlayer({
  showVideo,
  videoLoaded,
  isMuted,
  videoRef,
  data,
  onVideoEnded,
  onVideoLoaded,
}: VideoPlayerProps) {
  const backdropUrl = getImageUrl(data.backdrop_path || "", "original");

  return (
    <>
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          src={SAMPLE_VIDEO_URL}
          autoPlay
          muted={isMuted}
          onEnded={onVideoEnded}
          onLoadedData={() => {
            onVideoLoaded?.();
          }}
          playsInline
        />
      )}

      {/* Show backdrop until video is loaded, then fade out */}
      {backdropUrl ? (
        <Image
          className={`absolute inset-0 w-full h-full object-cover brightness-[60%] transition-opacity duration-1000 ${
            showVideo && videoLoaded ? "opacity-0" : "opacity-100"
          }`}
          src={backdropUrl}
          alt={`${data.title ?? data.name ?? data.original_name} backdrop`}
          width={1920}
          height={1080}
        />
      ) : (
        <div
          className={`absolute inset-0 w-full h-full bg-zinc-900 transition-opacity duration-1000 ${
            showVideo && videoLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
    </>
  );
}
