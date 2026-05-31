"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { TitleVideoPlayerProps } from "@/types/title";
import { getImageUrl } from "@/utils/movieHelpers";
import { constructVideoUrl } from "@/utils/videoHelpers";
import type { Asset, AssetType } from "@/types/movie";

export default function VideoPlayer({
  data,
  showVideo,
  videoLoaded,
  isMuted,
  videoRef,
  previewVideoPath,
  onVideoEnded,
  onVideoLoaded,
}: TitleVideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const backdropUrl = getImageUrl(data.backdropPath || "", "original");

  const getVideoUrl = useCallback((assets?: Asset[]): string | null => {
    if (!assets || assets.length === 0) return null;

    const priority: AssetType[] = ["CLIP", "TEASER", "TRAILER", "PROMO", "BTS"];

    for (const assetType of priority) {
      const asset = assets.find((a) => a.type === assetType);
      if (asset && asset.keys.length > 0) {
        const randomIndex = Math.floor(Math.random() * asset.keys.length);
        return constructVideoUrl(asset.keys[randomIndex].value);
      }
    }

    return null;
  }, []);

  useEffect(() => {
    if (!data) return;

    const videoSrc = previewVideoPath
      ? constructVideoUrl(previewVideoPath)
      : getVideoUrl(data.assets);

    // Video fade reset when source changes; this intentionally precedes
    // subsequent async src assignment to preserve the crossfade effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVideoPlaying(false);
    if (videoSrc) {
      setVideoUrl(videoSrc);
      return;
    }

    setVideoUrl(null);
  }, [data, getVideoUrl, previewVideoPath]);

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

  const handleCanPlay = useCallback(() => {
    setIsVideoPlaying(true);
    if (onVideoLoaded) {
      onVideoLoaded();
    }
  }, [onVideoLoaded]);

  return (
    <>
      {/* Backdrop Image */}
      {backdropUrl ? (
        <Image
          className={`absolute inset-0 w-full h-full object-cover brightness-[60%] transition-opacity duration-[1500ms] ease-in-out ${
            isVideoPlaying ? "opacity-0" : "opacity-100"
          }`}
          src={backdropUrl}
          alt={`${data.title ?? ""} backdrop`}
          width={1920}
          height={1080}
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
          onLoadedData={handleCanPlay}
          onCanPlay={handleCanPlay}
          onEnded={handleVideoEnd}
        />
      )}
    </>
  );
}
