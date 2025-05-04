import React from "react";

export const TabsSkeleton = () => {
  return (
    <div className="px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 animate-pulse">
      {/* Tabs Skeleton */}
      <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-10 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 w-20 sm:w-24 bg-zinc-800 rounded" />
        ))}
      </div>

      {/* Season Details Skeleton */}
      <div className="mt-6 sm:mt-8 md:mt-10">
        <div className="mb-8 sm:mb-10 md:mb-12 rounded-xl overflow-visible flex flex-col lg:flex-row items-stretch gap-4 md:gap-6">
          {/* Poster Skeleton */}
          <div className="w-full lg:w-[280px] h-60 sm:h-80 md:h-[420px] bg-zinc-800 rounded-xl" />

          {/* Info Skeleton */}
          <div className="flex-1 bg-zinc-800/60 rounded-xl p-4 sm:p-6 md:p-8 space-y-4">
            <div className="h-8 w-32 sm:w-48 bg-zinc-700 rounded" />
            <div className="h-4 w-20 sm:w-32 bg-zinc-700 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-16 sm:w-24 bg-zinc-700 rounded" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-14 sm:w-20 bg-zinc-700 rounded"
                  />
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
              className="h-32 sm:h-44 md:h-48 lg:h-52 xl:h-56 bg-zinc-800 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
