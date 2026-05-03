"use client";

import { useState, useRef, useEffect, memo } from "react";
import Button from "@/components/Button/Button";
import { DialogSeasonSelectorProps } from "@/types/title";

function DialogSeasonSelector({
  selectedSeason,
  numberOfSeasons,
  onSeasonChange,
}: DialogSeasonSelectorProps) {
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSeasonDropdown(false);
      }
    };

    if (showSeasonDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSeasonDropdown]);

  if (numberOfSeasons === 1) {
    return (
      <div className="relative">
        <Button
          variant="secondary"
          size="md"
          className="flex items-center min-w-[120px] justify-center focus:ring-0 focus:ring-offset-0 cursor-default"
          disabled
        >
          Season {selectedSeason}
        </Button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="secondary"
        size="md"
        className="flex items-center gap-2 min-w-[120px] justify-between focus:ring-0 focus:ring-offset-0"
        onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
      >
        Season {selectedSeason}
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          className="text-white"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m12 15.586 7.293-7.293 1.414 1.414-8 8a1 1 0 0 1-1.414 0l-8-8 1.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>

      {/* Dropdown Menu */}
      {showSeasonDropdown && (
        <div className="absolute top-full right-0 mt-1 bg-zinc-800 border border-white/40 z-50 rounded w-56 max-h-64 overflow-y-auto scrollbar-hover">
          {Array.from({ length: numberOfSeasons }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => {
                onSeasonChange(i + 1);
                setShowSeasonDropdown(false);
              }}
              className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors first:rounded-t last:rounded-b"
            >
              <span className="text-xs font-medium tracking-widest">
                Season {i + 1} (24 Episodes)
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(DialogSeasonSelector);
