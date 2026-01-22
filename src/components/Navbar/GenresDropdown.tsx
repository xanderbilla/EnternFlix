"use client";

import { NavbarGenre } from "@/types/navbar";
import { GenresDropdownProps } from "@/types/components";
import { useDropdown } from "@/hooks/ui/useDropdown";

export default function GenresDropdown({
  genres,
  isOpen,
  onToggle,
  onGenreClick,
}: GenresDropdownProps) {
  const { dropdownRef } = useDropdown(isOpen, () => onToggle());

  if (genres.length === 0) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white text-base font-bold transition-colors border border-white tracking-wide focus:outline-none"
      >
        <span>Genres</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className={`w-3 h-3 fill-current transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M300.3 440.8C312.9 451 331.4 450.3 343.1 438.6L471.1 310.6C480.3 301.4 483 287.7 478 275.7C473 263.7 461.4 256 448.5 256L192.5 256C179.6 256 167.9 263.8 162.9 275.8C157.9 287.8 160.7 301.5 169.9 310.6L297.9 438.6L300.3 440.8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="bg-black/70 backdrop-blur-sm w-96 absolute top-full left-0 py-4 border border-white/50 z-50">
          <div className="grid grid-cols-3 gap-2 px-4">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => onGenreClick(genre)}
                className="text-white text-xs hover:underline cursor-pointer text-left transition-colors whitespace-nowrap focus:outline-none"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
