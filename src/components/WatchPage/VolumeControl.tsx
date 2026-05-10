import type { CSSProperties } from "react";
import ControlButton from "./ControlButton";

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  isActive: boolean;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

export default function VolumeControl({
  volume,
  isMuted,
  isActive,
  onToggleMute,
  onVolumeChange,
}: VolumeControlProps) {
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return (
        <svg
          viewBox="0 0 24 24"
          width="44"
          height="44"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11 4.001a1 1 0 0 0-1.707-.707L4.586 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.586l4.707 4.707A1 1 0 0 0 11 20zm-2 1.413v13.172L5.707 15.293 5.414 15H2V9h3.414l.293-.293zm15.707 1.293-1.414-1.414L20 8.586l-3.293-3.293-1.414 1.414L18.586 10l-3.293 3.293 1.414 1.414L20 11.414l3.293 3.293 1.414-1.414L21.414 10z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else if (volume < 0.33) {
      return (
        <svg
          viewBox="0 0 24 24"
          width="44"
          height="44"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11 4a1 1 0 0 0-1.707-.707L4.586 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.586l4.707 4.707A1 1 0 0 0 11 20zM5.707 9.707 9 6.414v11.172l-3.293-3.293L5.414 14H2v-4h3.414zM16 12a6 6 0 0 0-1.757-4.243l-1.415 1.415a4 4 0 0 1 0 5.656l1.415 1.415A6 6 0 0 0 16 12"
            clipRule="evenodd"
          />
        </svg>
      );
    } else if (volume < 0.66) {
      return (
        <svg
          viewBox="0 0 24 24"
          width="44"
          height="44"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11 4a1 1 0 0 0-1.707-.707L4.586 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.586l4.707 4.707A1 1 0 0 0 11 20zM5.707 9.707 9 6.414v11.172l-3.293-3.293L5.414 14H2v-4h3.414zM16 12a6 6 0 0 0-1.757-4.243l-1.415 1.415a4 4 0 0 1 0 5.656l1.415 1.415A6 6 0 0 0 16 12m1.07-7.071a10 10 0 0 1 0 14.142l-1.413-1.414a8 8 0 0 0 0-11.314z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      return (
        <svg
          viewBox="0 0 24 24"
          width="44"
          height="44"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M24 12a14 14 0 0 0-4.1-9.9l-1.415 1.415a12 12 0 0 1 0 16.97L19.9 21.9A14 14 0 0 0 24 12M11 4a1 1 0 0 0-1.707-.707L4.586 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.586l4.707 4.707A1 1 0 0 0 11 20zM5.707 9.707 9 6.414v11.172l-3.293-3.293L5.414 14H2v-4h3.414zM16 12a6 6 0 0 0-1.757-4.243l-1.415 1.415a4 4 0 0 1 0 5.656l1.415 1.415A6 6 0 0 0 16 12m1.07-7.071a10 10 0 0 1 0 14.142l-1.413-1.414a8 8 0 0 0 0-11.314z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  return (
    <div className="flex items-center gap-3 group">
      <ControlButton
        onClick={onToggleMute}
        isActive={isActive}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </ControlButton>

      {/* Volume Slider */}
      <div className="w-0 group-hover:w-24 overflow-hidden transition-all duration-300">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider volume-slider-track"
          style={{ "--vol": `${volume * 100}%` } as CSSProperties}
          aria-label="Volume"
          aria-valuetext={
            isMuted || volume === 0 ? "Muted" : `${Math.round(volume * 100)}%`
          }
        />
      </div>
    </div>
  );
}
