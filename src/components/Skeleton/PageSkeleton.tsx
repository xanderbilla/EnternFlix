import React from "react";

export const PageSkeleton = () => {
  return (
    <div className="flex flex-col text-white min-h-screen bg-zinc-900 animate-pulse">
      {/* Banner Skeleton */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-zinc-800" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="h-12 w-64 bg-zinc-700 rounded mb-4" />
            <div className="h-4 w-48 bg-zinc-700 rounded mb-6" />
            <div className="flex gap-4">
              <div className="h-10 w-32 bg-zinc-700 rounded" />
              <div className="h-10 w-32 bg-zinc-700 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
        <div className="flex space-x-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-24 bg-zinc-800 rounded" />
          ))}
        </div>

        {/* Season Details Skeleton */}
        <div className="mt-6 sm:mt-8 md:mt-10">
          <div className="mb-8 sm:mb-10 md:mb-12 rounded-xl overflow-visible flex flex-col lg:flex-row items-stretch gap-4 md:gap-6">
            {/* Poster Skeleton */}
            <div className="w-full lg:w-[280px] h-[420px] bg-zinc-800 rounded-xl" />

            {/* Info Skeleton */}
            <div className="flex-1 bg-zinc-800/60 rounded-xl p-4 sm:p-6 md:p-8 space-y-4">
              <div className="h-8 w-48 bg-zinc-700 rounded" />
              <div className="h-4 w-32 bg-zinc-700 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-zinc-700 rounded" />
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 w-20 bg-zinc-700 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Episodes Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-48 sm:h-44 md:h-48 lg:h-52 xl:h-56 bg-zinc-800 rounded"
              />
            ))}
          </div>
        </div>
      </div>

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
