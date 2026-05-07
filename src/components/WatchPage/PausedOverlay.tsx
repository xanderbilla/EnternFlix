import { PlaybackInfo } from "@/types/playback";

interface PausedOverlayProps {
  info: PlaybackInfo;
  onPlay: () => void;
}

export default function PausedOverlay({ info, onPlay }: PausedOverlayProps) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label="Resume playback"
      className="absolute inset-0 z-[5] block w-full h-full bg-black/80 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 z-[6] flex items-start justify-between p-12 md:p-16 pt-40 md:pt-48 pb-44 md:pb-48"
      >
        <span className="max-w-2xl space-y-4 block">
          <span className="block text-white/50 text-base md:text-lg">
            You&apos;re watching
          </span>
          <span className="block text-white text-5xl md:text-6xl font-bold drop-shadow-lg">
            {info.title}
          </span>
          <span className="block text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-lg">
            {info.overview}
          </span>
          {info.casts && info.casts.length > 0 && (
            <span className="block text-white/70 text-base md:text-lg drop-shadow-lg">
              Cast: {info.casts.map((c) => c.name).join(", ")}
            </span>
          )}
        </span>
        <span className="self-end">
          <span className="text-white/50 text-base md:text-lg font-semibold drop-shadow-lg">
            Paused
          </span>
        </span>
      </span>
    </button>
  );
}
