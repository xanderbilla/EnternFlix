import { useRef, useState, useCallback } from "react";
import { VIDEO_CONTROLS } from "@/constants/video";
import { clampVolume } from "@/utils/videoHelpers";

export function useVideoControls() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  const handleSeek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  }, []);

  const handleForward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime += VIDEO_CONTROLS.SEEK_FORWARD;
    }
  }, []);

  const handleBackward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime -= VIDEO_CONTROLS.SEEK_BACKWARD;
    }
  }, []);

  const handleVolumeChange = useCallback(
    (newVolume: number) => {
      if (videoRef.current) {
        const clampedVolume = clampVolume(newVolume);
        videoRef.current.volume = clampedVolume;
        setVolume(clampedVolume);
        if (clampedVolume === 0) {
          setIsMuted(true);
        } else if (isMuted) {
          setIsMuted(false);
        }
      }
    },
    [isMuted],
  );

  const handleVolumeUp = useCallback(() => {
    handleVolumeChange(volume + VIDEO_CONTROLS.VOLUME_STEP);
  }, [volume, handleVolumeChange]);

  const handleVolumeDown = useCallback(() => {
    handleVolumeChange(volume - VIDEO_CONTROLS.VOLUME_STEP);
  }, [volume, handleVolumeChange]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  return {
    videoRef,
    volume,
    isMuted,
    handlePlayPause,
    handleSeek,
    handleForward,
    handleBackward,
    handleVolumeChange,
    handleVolumeUp,
    handleVolumeDown,
    toggleMute,
  };
}
