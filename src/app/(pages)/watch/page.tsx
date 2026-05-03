"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import WatchPageContent from "@/components/WatchPage/WatchPageContent";

function WatchPageInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type") as "movie" | "tv" | null;

  if (!id || !type) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Invalid URL</h1>
          <p className="text-gray-400">
            Please provide a valid content ID and type.
          </p>
        </div>
      </div>
    );
  }

  return <WatchPageContent contentId={id} contentType={type} />;
}

export default function WatchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-zinc-900">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }
    >
      <WatchPageInner />
    </Suspense>
  );
}
