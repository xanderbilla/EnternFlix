"use client";

import CircularButton from "@/components/UI/CircularButton";
import { VideoControlsProps } from "@/types/title";

export default function VideoControls({
  isMuted,
  onToggleMute,
}: VideoControlsProps) {
  return (
    <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 right-4 sm:right-5 md:right-6 flex items-center gap-2">
      <button
        onClick={onToggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full border-2 border-white/30 bg-transparent hover:border-white/60 hover:bg-white/10 flex items-center justify-center transition-all duration-200 opacity-30 hover:opacity-75"
        type="button"
      >
        {isMuted ? (
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white"
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
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white"
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
        )}
      </button>
    </div>
  );
}
