import { useState, useEffect, useRef, RefObject } from "react";

interface UseVideoPlayerOptions {
  autoPlayDelay?: number;
  defaultMuted?: boolean;
  onEnded?: () => void;
}

interface UseVideoPlayerReturn {
  showVideo: boolean;
  isMuted: boolean;
  videoEnded: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  toggleMute: () => void;
  handleVideoEnded: () => void;
  startVideoTimer: () => void;
  stopVideoTimer: () => void;
}

export function useVideoPlayer({
  autoPlayDelay = 1000,
  defaultMuted = true,
  onEnded,
}: UseVideoPlayerOptions = {}): UseVideoPlayerReturn {
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(defaultMuted);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startVideoTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowVideo(true);
      setVideoEnded(false);
    }, autoPlayDelay);
  };

  const stopVideoTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowVideo(false);
    setVideoEnded(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVideoEnded = () => {
    setVideoEnded(true);
    setShowVideo(false);
    onEnded?.();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    showVideo,
    isMuted,
    videoEnded,
    videoRef,
    toggleMute,
    handleVideoEnded,
    startVideoTimer,
    stopVideoTimer,
  };
}
