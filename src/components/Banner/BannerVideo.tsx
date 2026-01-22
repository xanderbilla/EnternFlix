"use client";

import { memo, useRef, useEffect } from "react";
import { BannerVideoProps } from "@/types/components";

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
    if (videoRef.current) {
      if (shouldPauseBanner) {
        videoRef.current.pause();
      } else if (showVideo && !videoEnded) {
        videoRef.current.play().catch((error) => {
          // If autoplay fails, try with muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch((err) => {
              if (process.env.NODE_ENV === "development") {
                console.error("Video autoplay failed:", err);
              }
            });
          }
        });
      }
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
        if (videoRef.current) {
          videoRef.current.currentTime = 10;
          videoRef.current.muted = isMuted;
          videoRef.current.play().catch((error) => {
            // Fallback to muted if autoplay with sound fails
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch((err) => {
                if (process.env.NODE_ENV === "development") {
                  console.error("Video autoplay failed:", err);
                }
              });
            }
          });
          // Notify parent that video is loaded and ready
          onVideoLoaded?.();
        }
      }}
      playsInline
    >
      <source src={sampleVideoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
