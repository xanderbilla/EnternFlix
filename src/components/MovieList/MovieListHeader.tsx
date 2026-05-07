"use client";

import { memo } from "react";
import { MovieListHeaderProps } from "@/types/components";

export default function MovieListHeader({
  title,
  showExploreButton,
  onExploreClick,
  onTitleHover,
}: MovieListHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="text-white text-lg md:text-xl lg:text-2xl font-medium hover:text-gray-300 transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0"
        onClick={onExploreClick}
        onMouseEnter={onTitleHover?.onEnter}
        onMouseLeave={onTitleHover?.onLeave}
        onFocus={onTitleHover?.onEnter}
        onBlur={onTitleHover?.onLeave}
        aria-label={`Open all titles in ${title}`}
      >
        {title}
      </button>

      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={onExploreClick}
          onMouseEnter={onTitleHover?.onEnter}
          onMouseLeave={onTitleHover?.onLeave}
          onFocus={onTitleHover?.onEnter}
          onBlur={onTitleHover?.onLeave}
          className={`text-gray-300 hover:text-white text-xs font-medium flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0 transition-[opacity,transform,color] duration-300 ease-out transform ${
            showExploreButton
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 -translate-x-4 scale-95 pointer-events-none"
          }`}
          aria-label={`Explore all titles in ${title}`}
        >
          Explore All
          <svg
            className={`w-3 h-3 transition-transform duration-300 ease-in-out ${
              showExploreButton ? "translate-x-0" : "translate-x-1"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
