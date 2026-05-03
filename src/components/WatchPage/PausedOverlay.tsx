import { PlaybackInfo } from "@/types/playback";

interface PausedOverlayProps {
  info: PlaybackInfo;
  onPlay: () => void;
}

export default function PausedOverlay({ info, onPlay }: PausedOverlayProps) {
  return (
    <>
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/80 z-[5] cursor-pointer"
        onClick={onPlay}
      />

      {/* Content */}
      <div
        className="absolute inset-0 z-[6] flex items-start justify-between p-12 md:p-16 pt-40 md:pt-48 pb-44 md:pb-48 cursor-pointer"
        onClick={onPlay}
      >
        <div className="max-w-2xl space-y-4">
          <p className="text-white/50 text-base md:text-lg">
            You&apos;re watching
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold drop-shadow-lg">
            {info.title}
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-lg">
            {info.overview}
          </p>
          {info.casts && info.casts.length > 0 && (
            <p className="text-white/70 text-base md:text-lg drop-shadow-lg">
              Cast: {info.casts.map((c) => c.name).join(", ")}
            </p>
          )}
        </div>
        <div className="self-end">
          <span className="text-white/50 text-base md:text-lg font-semibold drop-shadow-lg">
            Paused
          </span>
        </div>
      </div>
    </>
  );
}
