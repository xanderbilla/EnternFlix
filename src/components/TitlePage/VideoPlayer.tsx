"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { TitleVideoPlayerProps } from "@/types/title";
import { getImageUrl } from "@/utils/movieHelpers";
import type { Asset, AssetType } from "@/types/movie";

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

  // Get video URL based on priority
  const getVideoUrl = useCallback((assets?: Asset[]): string | null => {
    if (!assets || assets.length === 0) return null;

    const priority: AssetType[] = ["TRAILER", "TEASER", "CLIP", "PROMO", "BTS"];

    for (const assetType of priority) {
      const asset = assets.find((a) => a.asset === assetType);
      if (asset && asset.key.length > 0) {
        // Pick a random video from the available keys
        const randomIndex = Math.floor(Math.random() * asset.key.length);
        let videoPath = asset.key[randomIndex];

        // Remove leading slash from videoPath if it exists
        if (videoPath.startsWith("/")) {
          videoPath = videoPath.substring(1);
        }

        // Construct full URL using image base URL + video path
        const baseUrl = process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL || "";
        return `${baseUrl}${videoPath}`;
      }
    }

    return null;
  }, []);

  // Handle video playback after 1 second
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

  // Handle video mute state
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
