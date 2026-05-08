import { useState, useRef, useCallback } from "react";
import { VIDEO_CONTROLS } from "@/constants/video";

export function useControlsVisibility(isPlaying: boolean) {
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, VIDEO_CONTROLS.CONTROLS_HIDE_DELAY);
    }
  }, [isPlaying]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) {
      setShowControls(false);
    }
  }, [isPlaying]);

  return {
    showControls,
    handleMouseMove,
    handleMouseLeave,
  };
}
