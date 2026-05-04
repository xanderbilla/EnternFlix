"use client";

import { memo, useRef, useEffect } from "react";
import { BannerVideoProps } from "@/types/components";
import { logger } from "@/lib/logger/logger";

export default function BannerVideo({
  sampleVideoUrl,
  isMuted,
  showVideo,
  videoEnded,
  shouldPauseBanner,
  onVideoEnded,
  onVideoLoaded,
}: BannerVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (shouldPauseBanner) {
      videoRef.current.pause();
      return;
    }
    if (showVideo && !videoEnded) {
      videoRef.current.play().catch(() => {
        if (!videoRef.current) return;
        videoRef.current.muted = true;
        videoRef.current.play().catch((err) => {
          logger.warn("BannerVideo autoplay failed:", err);
        });
      });
    }
  }, [shouldPauseBanner, showVideo, videoEnded]);

  if (!showVideo) return null;

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
      autoPlay
      muted={isMuted}
      onEnded={onVideoEnded}
      onLoadedData={() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 10;
        videoRef.current.muted = isMuted;
        videoRef.current.play().catch(() => {
          if (!videoRef.current) return;
          videoRef.current.muted = true;
          videoRef.current.play().catch((err) => {
            logger.warn("BannerVideo autoplay failed:", err);
          });
        });
        onVideoLoaded?.();
      }}
      playsInline
    >
      <source src={sampleVideoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
