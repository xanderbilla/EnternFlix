const SKELETON_COUNT = 5;

const GRID_COLS: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6",
};

interface MovieGridSkeletonProps {
  columns?: number;
  fullWidth?: boolean;
}

export default function MovieGridSkeleton({
  columns = 4,
  fullWidth = false,
}: MovieGridSkeletonProps) {
  const gridCols =
    GRID_COLS[columns] ??
    "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

  return (
    <div
      className={`pb-6 sm:pb-8 md:pb-10 ${fullWidth ? "px-0" : "px-4 sm:px-8 md:px-12 lg:px-16"}`}
      role="status"
      aria-label="Loading content"
    >
      <div
        className={`grid ${gridCols} gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-4 md:gap-y-5 lg:gap-y-5`}
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <div
            key={index}
            className="w-full aspect-video rounded bg-zinc-800/40 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
