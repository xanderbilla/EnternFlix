"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Pages error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Content Error
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          We couldn&apos;t load this content. Please try again or explore other
          content.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={reset}>Try Again</Button>
          <Link href="/">
            <Button variant="secondary">Browse Content</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
