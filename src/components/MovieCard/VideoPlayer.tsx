"use client";

import { useRef, useEffect } from "react";
import { VideoPlayerProps } from "@/types/components";

export default function VideoPlayer({
  sampleVideoUrl,
  isMuted,
  onEnded,
  onVideoLoaded,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // If autoplay fails, ensure it's muted and try again
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
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
      autoPlay
      muted={isMuted}
      onEnded={onEnded}
      onLoadedData={() => {
        onVideoLoaded?.();
      }}
      playsInline
    >
      <source src={sampleVideoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
