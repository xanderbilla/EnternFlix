import { useState, useEffect, useCallback, RefObject } from "react";

export function useFullscreen(containerRef: RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  type SupportedOrientationLock =
    | "any"
    | "natural"
    | "landscape"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary"
    | "landscape-primary"
    | "landscape-secondary";

  const lockLandscapeOnSmallScreens = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;

    const orientation = screen.orientation as ScreenOrientation & {
      lock?: (orientation: SupportedOrientationLock) => Promise<void>;
    };

    if (!orientation?.lock) return;

    try {
      await orientation.lock("landscape");
    } catch {
      // Some browsers/devices block orientation lock without user gesture.
    }
  }, []);

  const unlockOrientation = useCallback(() => {
    const orientation = screen.orientation as ScreenOrientation & {
      unlock?: () => void;
    };

    if (!orientation?.unlock) return;

    try {
      orientation.unlock();
    } catch {
      // Ignore unlock failures; browser default orientation handling will apply.
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const inFullscreen = !!document.fullscreenElement;
      setIsFullscreen(inFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [unlockOrientation]);

  useEffect(() => {
    lockLandscapeOnSmallScreens();
    return () => {
      unlockOrientation();
    };
  }, [lockLandscapeOnSmallScreens, unlockOrientation]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, [containerRef]);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  return {
    isFullscreen,
    toggleFullscreen,
    exitFullscreen,
  };
}
