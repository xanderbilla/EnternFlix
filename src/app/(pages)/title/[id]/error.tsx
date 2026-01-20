"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Title page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Title Not Found
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          We couldn&apos;t find this title or there was an error loading it. The
          content may have been removed or is temporarily unavailable.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={reset}>Try Again</Button>
          <Button onClick={() => router.back()} variant="secondary">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
