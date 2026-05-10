"use client";

import { useEffect, useId, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { SearchScope } from "@/hooks/ui/useNavbarSearch";

interface SearchFieldProps {
  isOpen: boolean;
  value: string;
  selectedScope: SearchScope;
  placeholder?: string;
  onOpen: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onScopeChange: (scope: SearchScope) => void;
}

const SCOPE_OPTIONS: Array<{ value: SearchScope; label: string }> = [
  { value: "content", label: "Content" },
  { value: "people", label: "People" },
];

function ScopeIcon({ scope }: { scope: SearchScope }) {
  if (scope === "people") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 5V19M17 5V19M3 8H7M17 8H21M3 16H7M17 16H21M3 12H21M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SearchField({
  isOpen,
  value,
  selectedScope,
  placeholder = "Search titles, people...",
  onOpen,
  onChange,
  onClear,
  onScopeChange,
}: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const inputLabelId = `${inputId}-label`;

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative flex items-center">
      <div
        className={twMerge(
          "relative flex items-center overflow-visible rounded-[2px] border-[0.5px] border-white/70 bg-black/70 transition-[width,opacity,padding,background-color,border-color] duration-300 ease-in-out",
          isOpen
            ? "h-[34px] w-36 sm:w-48 md:w-64 px-2"
            : "w-10 border-transparent bg-transparent px-0 py-0",
        )}
      >
        <button
          type="button"
          onClick={onOpen}
          className={twMerge(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-200 transition-colors focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
            isOpen
              ? "hover:text-white"
              : "hover:bg-zinc-800/70 hover:text-white",
          )}
          aria-label={isOpen ? "Search expanded" : "Open search"}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            role="img"
            aria-hidden="true"
            className="search-icon"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div
          className={twMerge(
            "flex min-w-0 items-center transition-all duration-300 ease-in-out",
            isOpen ? "w-full opacity-100" : "w-0 opacity-0 pointer-events-none",
          )}
        >
          <label htmlFor={inputId} id={inputLabelId} className="sr-only">
            Search
          </label>
          <input
            ref={inputRef}
            type="text"
            id={inputId}
            name="searchInput"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={80}
            dir="ltr"
            className="ml-1 w-full bg-transparent text-[15px] text-zinc-100 placeholder:text-[14px] placeholder:text-zinc-500 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 transition-opacity duration-300 ease-in-out"
            aria-labelledby={inputLabelId}
          />
          <button
            type="button"
            onClick={onClear}
            className={twMerge(
              "ml-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[2px] text-zinc-400 transition-all duration-200 hover:bg-zinc-800/70 hover:text-zinc-100 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
              value ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-label="Clear search"
          >
            <span className="text-sm leading-none">&times;</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="relative -ml-px flex h-[34px] shrink-0 items-stretch gap-0 rounded-r-[2px] border-[0.5px] border-white/70 bg-black/70 p-0">
          {SCOPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onScopeChange(option.value)}
              className={twMerge(
                "flex h-full w-[34px] items-center justify-center rounded-none border-l-0 border-r-0 border-t-0 border-b-0 text-zinc-300 transition-colors hover:text-zinc-100 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
                selectedScope === option.value &&
                  "border-transparent bg-zinc-200/20 text-zinc-100",
              )}
              aria-label={`Search by ${option.label}`}
              title={option.label}
            >
              <ScopeIcon scope={option.value} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
