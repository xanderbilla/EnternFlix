import { formatTime } from "@/utils/videoHelpers";
import ControlButton from "./ControlButton";
import VolumeControl from "./VolumeControl";
import PlayPauseIcon from "./icons/PlayPauseIcon";
import { BackwardIcon, ForwardIcon } from "./icons/SeekIcons";
import FullscreenIcon from "./icons/FullscreenIcon";

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  showControls: boolean;
  activeControl: string | null;
  title?: string;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onForward: () => void;
  onBackward: () => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onTriggerFeedback: (control: string) => void;
}

export default function PlaybackControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isFullscreen,
  showControls,
  activeControl,
  title,
  onPlayPause,
  onSeek,
  onForward,
  onBackward,
  onVolumeChange,
  onToggleMute,
  onToggleFullscreen,
  onTriggerFeedback,
}: PlaybackControlsProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 transition-opacity duration-300 ${
        showControls ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Progress bar with timestamp */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="relative flex-1 h-1 bg-white/20 rounded-full cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            onSeek(pos * duration);
          }}
        >
          <div
            className="h-full bg-white rounded-full relative transition-all duration-150"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Remaining time */}
        <span className="text-white text-sm font-medium whitespace-nowrap">
          {duration > 0 ? `-${formatTime(duration - currentTime)}` : "--:--"}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <ControlButton
            onClick={() => {
              onTriggerFeedback("play");
              onPlayPause();
            }}
            isActive={activeControl === "play"}
            title={isPlaying ? "Pause" : "Play"}
          >
            <PlayPauseIcon isPlaying={isPlaying} />
          </ControlButton>

          {/* Backward Button */}
          <ControlButton
            onClick={() => {
              onTriggerFeedback("backward");
              onBackward();
            }}
            isActive={activeControl === "backward"}
            title="Rewind 10 seconds"
          >
            <BackwardIcon />
          </ControlButton>

          {/* Forward Button */}
          <ControlButton
            onClick={() => {
              onTriggerFeedback("forward");
              onForward();
            }}
            isActive={activeControl === "forward"}
            title="Forward 10 seconds"
          >
            <ForwardIcon />
          </ControlButton>

          {/* Volume Control */}
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            isActive={activeControl === "volume"}
            onToggleMute={() => {
              onTriggerFeedback("volume");
              onToggleMute();
            }}
            onVolumeChange={onVolumeChange}
          />
        </div>

        {/* Title in the center */}
        {title && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h2 className="text-white text-lg md:text-xl font-semibold whitespace-nowrap">
              {title}
            </h2>
          </div>
        )}

        {/* Fullscreen Button */}
        <div className="flex items-center gap-4">
          <ControlButton
            onClick={() => {
              onTriggerFeedback("fullscreen");
              onToggleFullscreen();
            }}
            isActive={activeControl === "fullscreen"}
            title="Toggle fullscreen"
          >
            <FullscreenIcon isFullscreen={isFullscreen} />
          </ControlButton>
        </div>
      </div>
    </div>
  );
}
