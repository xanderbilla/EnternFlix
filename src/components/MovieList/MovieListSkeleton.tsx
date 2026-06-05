const SKELETON_COUNT = 5;

interface MovieListSkeletonProps {
  title?: string;
}

export default function MovieListSkeleton({ title }: MovieListSkeletonProps) {
  return (
    <div
      className="mt-4 space-y-4 relative overflow-visible"
      role="status"
      aria-label={title ? `Loading ${title}` : "Loading content"}
    >
      {/* Title placeholder */}
      <div className="px-4 md:px-12">
        <div className="h-5 sm:h-6 md:h-7 lg:h-8 w-32 sm:w-40 md:w-48 bg-zinc-800/40 rounded animate-pulse" />
      </div>

      {/* Card row */}
      <div className="flex gap-2 overflow-x-hidden w-full">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <div
            key={index}
            className={`flex-none w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] aspect-video rounded-md bg-zinc-800/40 animate-pulse${
              index === 0 ? " ml-3 sm:ml-4 md:ml-12" : ""
            }${index === SKELETON_COUNT - 1 ? " mr-3 sm:mr-4 md:mr-12" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
