"use client";

import { useRef, useState } from "react";
import CircularButton from "@/components/UI/CircularButton";
import VideoPlayer from "./VideoPlayer";
import VideoControls from "./VideoControls";
import DialogActionButtons from "./DialogActionButtons";
import { DialogVideoSectionProps } from "@/types/title";
import { usePlayback } from "@/hooks/api/usePlayback";
import { getContentType } from "@/utils/movieHelpers";

export default function DialogVideoSection({
  data,
  onClose,
}: DialogVideoSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const contentType = data
    ? getContentType(data) === "TV"
      ? "tv"
      : "movie"
    : "movie";

  const { data: playbackData } = usePlayback(
    contentType,
    data?.id?.toString() || "",
    !!data?.id,
  );

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setVideoEnded(true);
  };

  const handleVideoLoaded = () => {
    setIsVideoPlaying(true);
  };

  const handleReplayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsVideoPlaying(true);
      setVideoEnded(false);
    }
  };

  return (
    <div className="relative h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[55vh] w-full overflow-hidden bg-zinc-900 -mb-px">
      {data && (
        <>
          <VideoPlayer
            showVideo={true}
            videoLoaded={isVideoPlaying}
            isMuted={isMuted}
            videoRef={videoRef}
            data={data}
            previewVideoPath={playbackData?.preview?.url}
            onVideoEnded={handleVideoEnded}
            onVideoLoaded={handleVideoLoaded}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

          <CircularButton
            onClick={onClose}
            variant="secondary"
            size="md"
            aria-label="Close dialog"
            className="absolute top-6 right-6 z-50 !border-0"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            }
          />

          <DialogActionButtons
            title={data.title ?? ""}
            contentId={data.id?.toString() || ""}
            contentType={data.contentType || "MOVIE"}
            onClose={onClose}
          />

          {/* Volume Control - Only show when video is playing */}
          {isVideoPlaying && (
            <VideoControls
              isMuted={isMuted}
              onToggleMute={() => setIsMuted(!isMuted)}
            />
          )}

          {/* Replay Button - Only show when video has ended */}
          {videoEnded && (
            <div className="absolute bottom-6 right-6">
              <CircularButton
                onClick={handleReplayVideo}
                variant="secondary"
                size="md"
                aria-label="Replay video"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    role="img"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M20.663 7A10 10 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10h2c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0a11.99 11.99 0 0 1 10 5.365V2h2v6a1 1 0 0 1-1 1h-6V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
