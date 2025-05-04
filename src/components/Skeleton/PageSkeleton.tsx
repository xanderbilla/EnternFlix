import React from "react";
import { TabsSkeleton } from "./TabsSkeleton";

export const PageSkeleton = () => {
  return (
    <div className="flex flex-col text-white min-h-screen bg-zinc-900 animate-pulse">
      {/* Banner Skeleton */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-zinc-800" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <div className="max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="h-12 w-80 bg-zinc-700 rounded mb-4" />
            <div className="flex gap-4 mb-4">
              <div className="h-8 w-16 bg-zinc-700 rounded" />
              <div className="h-8 w-20 bg-zinc-700 rounded" />
              <div className="h-8 w-24 bg-zinc-700 rounded" />
              <div className="h-8 w-20 bg-zinc-700 rounded" />
            </div>
            <div className="h-4 w-2/3 bg-zinc-700 rounded mb-2" />
            <div className="h-4 w-1/2 bg-zinc-700 rounded mb-6" />
            <div className="flex gap-4">
              <div className="h-10 w-32 bg-zinc-700 rounded" />
              <div className="h-10 w-32 bg-zinc-700 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton (imported) */}
      <TabsSkeleton />

      {/* Title Info Skeleton */}
      <div className="px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="h-6 w-48 bg-zinc-800 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-zinc-800 rounded" />
                <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                <div className="h-4 w-5/6 bg-zinc-800 rounded" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="h-6 w-32 bg-zinc-800 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-zinc-800 rounded" />
                <div className="h-4 w-20 bg-zinc-800 rounded" />
                <div className="h-4 w-28 bg-zinc-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
