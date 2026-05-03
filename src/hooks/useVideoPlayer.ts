import { useRef, useState, useCallback, useEffect } from "react";
import { VideoPlayerState, VideoPlayerControls } from "@/types/video";
import { clampVolume } from "@/utils/videoHelpers";
import { logger } from "@/lib/logger/logger";

export function useVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [state, setState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    showControls: true,
  });

  const play = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        logger.error("Play failed:", error);
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  }, []);

  const setVolume = useCallback(
    (volume: number) => {
      if (videoRef.current) {
        const clampedVolume = clampVolume(volume);
        videoRef.current.volume = clampedVolume;
        setState((prev) => ({ ...prev, volume: clampedVolume }));

        if (clampedVolume === 0) {
          setState((prev) => ({ ...prev, isMuted: true }));
        } else if (state.isMuted) {
          setState((prev) => ({ ...prev, isMuted: false }));
        }
      }
    },
    [state.isMuted],
  );

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !state.isMuted;
      setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    }
  }, [state.isMuted]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const forward = useCallback((seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  }, []);

  const backward = useCallback((seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime -= seconds;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setState((prev) => ({ ...prev, currentTime: video.currentTime }));
    };

    const handleDurationChange = () => {
      setState((prev) => ({ ...prev, duration: video.duration }));
    };

    const handlePlay = () => {
      setState((prev) => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setState((prev) => ({
        ...prev,
        isFullscreen: !!document.fullscreenElement,
      }));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const controls: VideoPlayerControls = {
    play,
    pause,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute,
    toggleFullscreen,
    forward,
    backward,
  };

  return {
    videoRef,
    state,
    controls,
  };
}
