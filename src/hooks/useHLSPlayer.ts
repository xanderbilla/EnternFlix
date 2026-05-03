import { useState, useCallback } from "react";

export function useHLSPlayer() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const handleManifestParsed = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => {
      setShowVideo(true);
    }, 100);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    showVideo,
    handleManifestParsed,
    handleError,
  };
}
