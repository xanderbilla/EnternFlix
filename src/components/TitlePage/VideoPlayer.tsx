"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { TitleVideoPlayerProps } from "@/types/title";
import { getImageUrl } from "@/utils/movieHelpers";
import type { Asset, AssetType } from "@/types/movie";
import { config } from "@/lib/env/env";

export default function VideoPlayer({
  data,
  showVideo,
  videoLoaded,
  isMuted,
  videoRef,
  onVideoEnded,
  onVideoLoaded,
}: TitleVideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const backdropUrl = getImageUrl(data.backdropPath || "", "original");

  const getVideoUrl = useCallback((assets?: Asset[]): string | null => {
    if (!assets || assets.length === 0) return null;

    const priority: AssetType[] = ["TRAILER", "TEASER", "CLIP", "PROMO", "BTS"];

    for (const assetType of priority) {
      const asset = assets.find((a) => a.type === assetType);
      if (asset && asset.keys.length > 0) {
        const randomIndex = Math.floor(Math.random() * asset.keys.length);
        let videoPath = asset.keys[randomIndex];

        if (videoPath.startsWith("/")) {
          videoPath = videoPath.substring(1);
        }

        return `${config.customApi.imageBaseUrl}${videoPath}`;
      }
    }

    return null;
  }, []);

  useEffect(() => {
    if (!data) return;

    const videoSrc = getVideoUrl(data.assets);
    if (videoSrc) {
      const timer = setTimeout(() => {
        setVideoUrl(videoSrc);
        setIsVideoPlaying(true);
        if (onVideoLoaded) {
          onVideoLoaded();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [data, getVideoUrl, onVideoLoaded]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, videoRef]);

  const handleVideoEnd = useCallback(() => {
    setIsVideoPlaying(false);
    if (onVideoEnded) {
      onVideoEnded();
    }
  }, [onVideoEnded]);

  return (
    <>
      {/* Backdrop Image */}
      {backdropUrl ? (
        <Image
          className={`absolute inset-0 w-full h-full object-cover brightness-[60%] transition-opacity duration-[1500ms] ease-in-out ${
            isVideoPlaying ? "opacity-0" : "opacity-100"
          }`}
          src={backdropUrl}
          alt={`${data.title ?? data.name ?? data.originalName} backdrop`}
          width={1920}
          height={1080}
          unoptimized={!backdropUrl.includes("tmdb.org")}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-zinc-900" />
      )}

      {/* Video Player */}
      {videoUrl && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            isVideoPlaying ? "opacity-100" : "opacity-0"
          }`}
          src={videoUrl}
          autoPlay
          muted={isMuted}
          playsInline
          disablePictureInPicture
          onEnded={handleVideoEnd}
        />
      )}
    </>
  );
}
