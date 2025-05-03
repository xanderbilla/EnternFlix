import React from "react";

const SearchItemSkeleton = () => {
  return (
    <div className="relative">
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-zinc-800 animate-pulse">
        {/* Image placeholder */}
        <div className="absolute inset-0 bg-zinc-700" />

        {/* Hover overlay skeleton */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Rating and date skeleton */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-16 bg-zinc-600 rounded" />
              <div className="h-4 w-16 bg-zinc-600 rounded" />
            </div>
            {/* Overview skeleton */}
            <div className="space-y-1">
              <div className="h-3 w-full bg-zinc-600 rounded" />
              <div className="h-3 w-3/4 bg-zinc-600 rounded" />
            </div>
          </div>
        </div>
      </div>
      {/* Title skeleton */}
      <div className="mt-2 h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
    </div>
  );
};

export default SearchItemSkeleton;
