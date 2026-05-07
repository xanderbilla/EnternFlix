"use client";

import { useMemo, useState } from "react";
import { useDropdown } from "@/hooks/ui/useDropdown";

export interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  value: string;
  options: SortOption[];
  onChange: (value: string) => void;
  buttonLabel?: string;
  ariaLabel?: string;
  showOptionIcon?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

function OptionIcon({ isActive }: { isActive: boolean }) {
  if (isActive) {
    return (
      <svg
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M13.2 4.8L6.4 11.6L2.8 8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 3L8 6L11 3M11 13L8 10L5 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SortDropdown({
  value,
  options,
  onChange,
  buttonLabel = "Sort By",
  ariaLabel = "Select sort",
  showOptionIcon = true,
  isOpen: externalIsOpen,
  onOpenChange,
}: SortDropdownProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const listboxId = `sort-dropdown-${buttonLabel.toLowerCase().replace(/\s+/g, "-")}`;

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleToggleOpen = () => {
    if (onOpenChange) {
      onOpenChange(!isOpen);
    } else {
      setInternalIsOpen((current) => !current);
    }
  };

  const handleCloseDropdown = () => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  const { dropdownRef } = useDropdown(isOpen, handleCloseDropdown);

  const selectedLabel = useMemo(() => {
    const selected = options.find((option) => option.value === value);
    return selected?.label ?? buttonLabel;
  }, [options, value, buttonLabel]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggleOpen}
        className="inline-flex w-auto min-w-[120px] max-w-[90vw] items-center justify-between gap-2 border border-white/70 bg-black/65 px-2.5 py-1.5 text-white font-medium text-[12px] md:text-[13px] leading-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
      >
        <span className="whitespace-nowrap">{selectedLabel}</span>
        <span className="inline-block h-0 w-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-current" />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 top-full -mt-px w-auto min-w-full max-w-[90vw] rounded-[2px] border border-zinc-700 bg-black/95 p-2 shadow-xl z-30"
        >
          <div className="grid grid-cols-1 gap-y-1">
            {options.map((option) => {
              const isActive = option.value === value;

              return (
                <button
                  key={`${option.value}-${option.label}`}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    handleCloseDropdown();
                  }}
                  className="flex items-center gap-2 text-left px-2 py-1 text-[12px] md:text-[13px] leading-5 text-white/90 hover:text-white hover:underline hover:underline-offset-4 transition-colors focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  role="option"
                  aria-selected={isActive}
                >
                  {showOptionIcon && (
                    <span className="text-white/70">
                      <OptionIcon isActive={isActive} />
                    </span>
                  )}
                  <span className="whitespace-nowrap">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
