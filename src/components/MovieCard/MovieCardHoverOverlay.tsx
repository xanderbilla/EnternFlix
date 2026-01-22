"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useVideo } from "@/contexts/VideoContext";
import { MovieCardHoverOverlayProps } from "@/types/components";
import { SAMPLE_VIDEO_URL } from "@/constants/video";
import VideoPlayer from "./VideoPlayer";
import VolumeControl from "./VolumeControl";

export default function MovieCardHoverOverlay({
  backdropUrl,
  positionClass,
  data,
  navigateToTitle,
  handleKeyPress,
  children,
}: MovieCardHoverOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { pauseBanner, resumeBanner } = useVideo();

  const handleArrowClick = () => {
    navigateToTitle();
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isVisible) {
      setVideoLoaded(false);
      timeoutRef.current = setTimeout(() => {
        setShowVideo(true);
      }, 1000);
    } else {
      setShowVideo(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (showVideo) {
      pauseBanner();
    } else {
      resumeBanner();
    }
    return () => {
      resumeBanner();
    };
  }, [showVideo, pauseBanner, resumeBanner]);

  const handleVideoEnded = () => {
    setShowVideo(false);
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div
      className={`hidden md:block opacity-0 md:opacity-0 absolute top-0 transition duration-300 z-50
        md:invisible md:group-hover/item:visible md:group-hover/item:opacity-100
        md:scale-0 md:group-hover/item:scale-110 
        md:translate-y-0 md:group-hover/item:translate-y-[5vh]
        w-[320px] md:w-[380px] lg:w-[420px] aspect-video
        ${positionClass}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="relative w-full h-full rounded-md overflow-hidden">
        <button
          className="w-full h-full p-0 cursor-pointer relative"
          onClick={handleArrowClick}
          onKeyDown={(e) => handleKeyPress(e, handleArrowClick)}
          aria-label={`View details for ${
            data?.title || data?.name || "this title"
          }`}
        >
          {showVideo && (
            <VideoPlayer
              sampleVideoUrl={SAMPLE_VIDEO_URL}
              isMuted={isMuted}
              onEnded={handleVideoEnded}
              onVideoLoaded={handleVideoLoaded}
            />
          )}

          {/* Show backdrop until video is loaded, then fade out */}
          {backdropUrl ? (
            <Image
              className={`object-contain transition-opacity duration-1000 w-full h-full ${
                showVideo && videoLoaded ? "opacity-0" : "opacity-100"
              }`}
              fill
              src={backdropUrl}
              alt={
                data?.title ||
                data?.name ||
                data?.original_name ||
                "Movie backdrop"
              }
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Image not available
            </div>
          )}
        </button>

        {showVideo && (
          <VolumeControl isMuted={isMuted} onToggleMute={toggleMute} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
          <div className="absolute bottom-0 w-full p-4 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
