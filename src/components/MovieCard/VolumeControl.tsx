"use client";

import CircularButton from "@/components/UI/CircularButton";
import { VolumeControlProps } from "@/types/components";

export default function VolumeControl({
  isMuted,
  onToggleMute,
}: VolumeControlProps) {
  return (
    <CircularButton
      onClick={onToggleMute}
      variant="muted"
      size="md"
      aria-label={isMuted ? "Unmute" : "Mute"}
      className="absolute bottom-4 right-4 z-20"
      icon={
        isMuted ? (
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
              d="M11 4a1 1 0 0 0-1.7-.7L4.58 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.59l4.7 4.7A1 1 0 0 0 11 20zM5.7 9.7 9 6.42V17.6l-3.3-3.3-.29-.29H2v-4h3.41zm9.6 0 2.29 2.3-2.3 2.3 1.42 1.4L19 13.42l2.3 2.3 1.4-1.42-2.28-2.3 2.3-2.3-1.42-1.4-2.3 2.28-2.3-2.3z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
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
              d="M24 12a14 14 0 0 0-4.1-9.9l-1.41 1.41a12 12 0 0 1 0 16.98l1.41 1.41A14 14 0 0 0 24 12M11 4a1 1 0 0 0-1.7-.7L4.58 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.59l4.7 4.7A1 1 0 0 0 11 20zM5.7 9.7 9 6.42V17.6l-3.3-3.3-.29-.29H2v-4h3.41zM16 12a6 6 0 0 0-1.76-4.24l-1.41 1.41a4 4 0 0 1 0 5.66l1.41 1.41A6 6 0 0 0 16 12m1.07-7.07a10 10 0 0 1 0 14.14l-1.41-1.41a8 8 0 0 0 0-11.32z"
              clipRule="evenodd"
            />
          </svg>
        )
      }
    />
  );
}
