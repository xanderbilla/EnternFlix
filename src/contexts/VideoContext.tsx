"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface VideoContextType {
  shouldPauseBanner: boolean;
  pauseBanner: () => void;
  resumeBanner: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [pauseCount, setPauseCount] = useState(0);

  const pauseBanner = useCallback(() => {
    setPauseCount((count) => count + 1);
  }, []);

  const resumeBanner = useCallback(() => {
    setPauseCount((count) => Math.max(0, count - 1));
  }, []);

  const shouldPauseBanner = pauseCount > 0;

  return (
    <VideoContext.Provider
      value={{ shouldPauseBanner, pauseBanner, resumeBanner }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
}
