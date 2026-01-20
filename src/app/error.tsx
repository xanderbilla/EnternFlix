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
    // Log error to error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          Oops!
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6">
          Something went wrong
        </h2>
        <p className="text-lg text-zinc-400 mb-8 max-w-md mx-auto">
          We&apos;re sorry, but something unexpected happened. Please try again
          or return to the homepage.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={reset}>Try Again</Button>
          <Link href="/">
            <Button variant="secondary">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
