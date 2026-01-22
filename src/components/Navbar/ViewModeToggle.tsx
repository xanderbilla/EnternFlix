"use client";

import Icon from "@/components/Icon/Icon";
import { ViewMode } from "@/types/common";
import { ViewModeToggleProps } from "@/types/components";
import { useDropdown } from "@/hooks/ui/useDropdown";

export default function ViewModeToggle({
  viewMode,
  selectedSort,
  showSortDropdown,
  onViewModeChange,
  onToggleSortDropdown,
  onSortClick,
  sortOptions,
}: ViewModeToggleProps) {
  const { dropdownRef } = useDropdown(showSortDropdown, () =>
    onToggleSortDropdown(),
  );

  return (
    <div className="flex items-center border border-gray-600/50 bg-black/20 backdrop-blur-sm">
      <button
        onClick={() => onViewModeChange("list")}
        className={`flex items-center justify-center py-1 px-3 transition-colors border-r border-gray-600/50 focus:outline-none ${
          viewMode === "list"
            ? "text-white border border-white"
            : "text-gray-400 hover:text-white"
        }`}
        aria-label="List view"
      >
        <Icon name="listMedium" size={14} />
      </button>

      {viewMode === "grid" ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={onToggleSortDropdown}
            className="flex items-center gap-2 py-1 px-3 text-white border border-white bg-black transition-colors focus:outline-none"
          >
            <Icon name="gridFillMedium" size={14} />
            <span className="text-sm font-medium">{selectedSort}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className={`w-3 h-3 fill-current transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
            >
              <path d="M300.3 440.8C312.9 451 331.4 450.3 343.1 438.6L471.1 310.6C480.3 301.4 483 287.7 478 275.7C473 263.7 461.4 256 448.5 256L192.5 256C179.6 256 167.9 263.8 162.9 275.8C157.9 287.8 160.7 301.5 169.9 310.6L297.9 438.6L300.3 440.8z" />
            </svg>
          </button>

          {showSortDropdown && (
            <div className="bg-black/90 backdrop-blur-sm w-full absolute top-full left-0 border border-white/50 z-50">
              <div className="px-4">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => onSortClick(option)}
                    className={`block w-full text-left py-1 text-sm transition-colors whitespace-nowrap focus:outline-none ${
                      selectedSort === option
                        ? "text-white font-medium"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => onViewModeChange("grid")}
          className="flex items-center justify-center py-1 px-3 transition-colors focus:outline-none text-gray-400 hover:text-white"
          aria-label="Grid view"
        >
          <Icon name="gridFillMedium" size={14} />
        </button>
      )}
    </div>
  );
}
