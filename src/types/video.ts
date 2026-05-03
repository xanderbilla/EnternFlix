export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  showControls: boolean;
}

export interface VideoPlayerControls {
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  forward: (seconds: number) => void;
  backward: (seconds: number) => void;
}

export interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

export interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (time: number) => void;
  onLoadedData?: () => void;
  className?: string;
}

export interface HLSConfig {
  enableWorker?: boolean;
  lowLatencyMode?: boolean;
  backBufferLength?: number;
}

export type VideoQuality = "auto" | "360p" | "480p" | "720p" | "1080p";

export interface VideoAsset {
  url: string;
  quality: VideoQuality;
  type: "HLS" | "MP4" | "WEBM";
}
