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
      <div className="mx-8 mb-8 sm:mb-10 md:mb-12">
        <div className="rounded-xl overflow-visible flex flex-col lg:flex-row items-stretch gap-4 md:gap-6">
          {/* Poster Skeleton */}
          <div className="flex justify-center items-center w-full lg:w-[280px] flex-shrink-0 self-center">
            <div className="w-full h-[420px] bg-zinc-800 rounded-lg shadow-md" />
          </div>

          {/* Info Skeleton */}
          <div className="flex-1 flex flex-col justify-center bg-zinc-800/60 rounded-xl p-4 sm:p-6 md:p-8 space-y-4 min-w-0">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 min-h-[64px]">
              {/* Left Side */}
              <div className="w-full lg:w-1/2">
                <div className="h-8 w-48 bg-zinc-700 rounded mb-2" />
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-4 w-12 bg-zinc-700 rounded" />
                  <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                  <div className="h-4 w-16 bg-zinc-700 rounded" />
                </div>

                <div className="space-y-4">
                  {/* Genres */}
                  <div className="space-y-2">
                    <div className="h-4 w-16 bg-zinc-700 rounded" />
                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 w-16 bg-zinc-700 rounded" />
                      <div className="h-6 w-20 bg-zinc-700 rounded" />
                      <div className="h-6 w-16 bg-zinc-700 rounded" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="h-4 w-16 bg-zinc-700 rounded" />
                      <div className="h-4 w-20 bg-zinc-700 rounded" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-4 w-16 bg-zinc-700 rounded" />
                      <div className="h-4 w-20 bg-zinc-700 rounded" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-4 w-16 bg-zinc-700 rounded" />
                      <div className="h-4 w-20 bg-zinc-700 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Production Companies */}
              <div className="w-full lg:w-1/2">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="h-6 w-40 bg-zinc-700 rounded" />
                    <div className="flex flex-wrap gap-4">
                      <div className="h-12 w-24 bg-zinc-700 rounded" />
                      <div className="h-12 w-24 bg-zinc-700 rounded" />
                      <div className="h-12 w-24 bg-zinc-700 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
