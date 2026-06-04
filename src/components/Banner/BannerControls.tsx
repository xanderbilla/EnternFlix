"use client";

import { memo } from "react";
import { BannerControlsProps } from "@/types/components";
import CircularButton from "@/components/UI/CircularButton";

export default function BannerControls({
  showVideo,
  videoEnded,
  isMuted,
  contentRating,
  onToggleMute,
  onReloadVideo,
}: BannerControlsProps) {
  return (
    <div
      className={`absolute inset-y-0 right-0 flex items-center gap-4 z-20 transition-opacity duration-700 ${
        showVideo ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {videoEnded ? (
        <CircularButton
          onClick={onReloadVideo}
          variant="secondary"
          size="lg"
          aria-label="Reload video"
          className="mr-6"
          icon={
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
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
      ) : (
        <CircularButton
          onClick={onToggleMute}
          variant="secondary"
          size="lg"
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="mr-6 opacity-60 hover:opacity-100 transition-opacity duration-300"
          icon={
            isMuted ? (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                role="img"
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
                width="24"
                height="24"
                fill="none"
                role="img"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M24 12a14 14 0 0 0-4.1-9.9l-1.41 1.41a12 12 0 0 1 0 16.98l1.41 1.41A14 14 0 0 0 24 12M11 4a1 1 0 0 0-1.7-.7L4.58 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.59l4.7 4.7A1 1 0 0 0 11 20zM5.7 9.7 9 6.42V17.6l-3.3-3.3-.29-.29H2v-4h3.41zM16 12a6 6 0 0 0-1.76-4.24l-1.41 1.41a4 4 0 0 1 0 5.66l1.41 1.41A6 6 0 0 0 16 12m1.07-7.07a10 10 0 0 1 0 14.14l-1.41-1.41a8 8 0 0 0 0-11.32z"
                  clipRule="evenodd"
                />
              </svg>
            )
          }
        />
      )}

      <div className="bg-black/60 px-4 py-2 text-white text-lg font-medium border-l-4 border-white">
        {contentRating}
      </div>
    </div>
  );
}
