"use client";

import { useEffect } from "react";
import NotFoundContent from "@/components/NotFound/NotFoundContent";
import { logger } from "@/lib/logger/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Global error:", error);
  }, [error]);

  return <NotFoundContent mode="error" onRetry={reset} />;
}
