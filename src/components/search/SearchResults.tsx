import { useRef, memo } from "react";
import { DynamicMovieCard } from "@/utils/dynamicImports";
import { SearchResultsProps } from "@/types/components";

function SearchResults({
  searchQuery,
  debouncedQuery,
  searchRes,
  hasNextPage,
  loadMoreRef,
}: SearchResultsProps) {
  if (searchQuery && searchRes.length === 0 && debouncedQuery) {
    return (
      <div className="text-center text-gray-400 py-12">
        No results found for &ldquo;{searchQuery}&rdquo;
      </div>
    );
  }

  if (searchQuery && debouncedQuery && searchRes.length > 0) {
    return (
      <>
        <div className="flex flex-wrap gap-2">
          {searchRes.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-none w-[calc((100%-4*0.5rem)/5)] sm:w-[calc((100%-4*0.5rem)/5)] md:w-[calc((100%-4*0.5rem)/5)] lg:w-[calc((100%-4*0.5rem)/5)]"
            >
              <DynamicMovieCard
                data={item}
                isFirst={index === 0}
                isLast={index === searchRes.length - 1}
              />
            </div>
          ))}
        </div>

        {/* Invisible trigger for infinite scroll */}
        {hasNextPage && <div ref={loadMoreRef} className="h-4" />}
      </>
    );
  }

  return null;
}

export default memo(SearchResults);
