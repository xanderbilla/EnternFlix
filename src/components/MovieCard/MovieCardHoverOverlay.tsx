"use client";

import RemoteImage from "@/components/UI/RemoteImage";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { MovieCardHoverOverlayProps } from "@/types/components";
import type { Asset, AssetType } from "@/types/movie";
import { constructVideoUrl } from "@/utils/videoHelpers";
import { usePlayback } from "@/hooks/api/usePlayback";
import { getContentType } from "@/utils/movieHelpers";

export default function MovieCardHoverOverlay({
  backdropUrl,
  positionClass,
  viewportPosition = "center",
  data,
  navigateToTitle,
  handleKeyPress,
  children,
}: MovieCardHoverOverlayProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const contentType = data
    ? getContentType(data) === "TV"
      ? "tv"
      : "movie"
    : "movie";

  const { data: playbackData } = usePlayback(
    contentType,
    data?.id?.toString() || "",
    isHovered && !!data?.id,
  );

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

  const videoUrl = useMemo(() => {
    if (!isHovered || !data) return null;

    const previewVideoPath = playbackData?.preview?.url;
    if (previewVideoPath) {
      return constructVideoUrl(previewVideoPath);
    }

    return getVideoUrl(data.assets);
  }, [isHovered, data, playbackData, getVideoUrl]);

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    setIsVideoPlaying(false);
    setVideoEnded(false);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
    setIsVideoPlaying(false);
    setVideoEnded(false);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleVideoEnd = useCallback(() => {
    setIsVideoPlaying(false);
    setVideoEnded(true);
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  const handleReplay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsVideoPlaying(true);
      setVideoEnded(false);
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  }, []);

  const getDirectionalTransforms = () => {
    switch (viewportPosition) {
      case "left":
        return {
          initial: "md:scale-0 md:translate-x-[-20px] md:translate-y-0",
          hover:
            "md:group-hover/item:scale-110 md:group-hover/item:translate-x-0 md:group-hover/item:translate-y-[5vh]",
        };
      case "right":
        return {
          initial: "md:scale-0 md:translate-x-[20px] md:translate-y-0",
          hover:
            "md:group-hover/item:scale-110 md:group-hover/item:translate-x-0 md:group-hover/item:translate-y-[5vh]",
        };
      default:
        return {
          initial: "md:scale-0 md:translate-y-0",
          hover:
            "md:group-hover/item:scale-110 md:group-hover/item:translate-y-[5vh]",
        };
    }
  };

  const transforms = getDirectionalTransforms();

  return (
    <div
      className={`hidden md:block opacity-0 md:opacity-0 absolute top-0 transition-all duration-300 z-10
        md:invisible md:group-hover/item:visible md:group-hover/item:opacity-100
        ${transforms.initial} ${transforms.hover}
        w-[320px] md:w-[380px] lg:w-[420px] aspect-video
        ${positionClass}`}
    >
      <div
        className="relative w-full h-full rounded-md overflow-hidden"
        role="group"
        aria-label={`${data?.title || "Title"} preview controls`}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onFocusCapture={handleHoverStart}
        onBlurCapture={(e) => {
          const nextTarget = e.relatedTarget as Node | null;
          if (!nextTarget || !e.currentTarget.contains(nextTarget)) {
            handleHoverEnd();
          }
        }}
      >
        <button
          type="button"
          className="absolute inset-0 z-10 rounded-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          onClick={navigateToTitle}
          onKeyDown={(e) => handleKeyPress(e, navigateToTitle)}
          aria-label={`Open details for ${data?.title || "this title"}`}
        />

        {/* Backdrop Image */}
        <RemoteImage
          className={`object-contain w-full h-full rounded-md transition-opacity duration-[1500ms] ease-in-out ${
            isVideoPlaying ? "opacity-0" : "opacity-100"
          }`}
          fill
          sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
          src={backdropUrl}
          alt={data?.title || "Movie backdrop"}
          fallbackClassName="w-full h-full flex items-center justify-center text-gray-400 bg-zinc-800/40 rounded-md"
        />

        {/* Video Player */}
        {videoUrl && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover rounded-md transition-opacity duration-[1500ms] ease-in-out ${
              isVideoPlaying ? "opacity-100" : "opacity-0"
            }`}
            src={videoUrl}
            autoPlay
            muted={isMuted}
            playsInline
            disablePictureInPicture
            onCanPlay={handleCanPlay}
            onEnded={handleVideoEnd}
          />
        )}

        {/* Volume/Replay Controls - Bottom Right */}
        {(isVideoPlaying || videoEnded) && (
          <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 z-30">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8">
              {/* Volume Button - Only show when video is playing */}
              {isVideoPlaying && (
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="absolute inset-0 rounded-full border-2 border-white/30 bg-transparent hover:border-white/60 hover:bg-white/10 flex items-center justify-center transition-all duration-200 opacity-30 hover:opacity-75"
                  type="button"
                >
                  {isMuted ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="none"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11 4a1 1 0 0 0-1.7-.7L4.58 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.59l4.7 4.7A1 1 0 0 0 11 20zM5.7 9.7 9 6.42V17.6l-3.3-3.3-.29-.29H2v-4h3.41zm9.6 0 2.29 2.3-2.3 2.3 1.42 1.4L19 13.42l2.3 2.3 1.4-1.42-2.28-2.3 2.3-2.3-1.42-1.4-2.3 2.28-2.3-2.3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="none"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M24 12a14 14 0 0 0-4.1-9.9l-1.415 1.415a12 12 0 0 1 0 16.97L19.9 21.9A14 14 0 0 0 24 12M11 4a1 1 0 0 0-1.707-.707L4.586 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.586l4.707 4.707A1 1 0 0 0 11 20zM5.707 9.707 9 6.414v11.172l-3.293-3.293L5.414 14H2v-4h3.414zM16 12a6 6 0 0 0-1.757-4.243l-1.415 1.415a4 4 0 0 1 0 5.656l1.415 1.415A6 6 0 0 0 16 12m1.07-7.071a10 10 0 0 1 0 14.142l-1.413-1.414a8 8 0 0 0 0-11.314z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              )}

              {/* Replay Button - Only show when video has ended */}
              {videoEnded && videoUrl && (
                <button
                  onClick={handleReplay}
                  aria-label="Replay"
                  className="absolute inset-0 rounded-full border-2 border-white/30 bg-transparent hover:border-white/60 hover:bg-white/10 flex items-center justify-center transition-all duration-200 opacity-30 hover:opacity-75"
                  type="button"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M20.663 7A10 10 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10h2c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0a11.99 11.99 0 0 1 10 5.365V2h2v6a1 1 0 0 1-1 1h-6V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none">
          <div className="absolute bottom-0 w-full p-4 flex flex-col pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
