"use client";

import type { ReactNode } from "react";

type Direction = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  label: string;
  children: ReactNode;
  direction?: Direction;
  className?: string;
}

const wrapperPosition: Record<Direction, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 pb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 pt-2",
  left: "right-full top-1/2 -translate-y-1/2 pr-2",
  right: "left-full top-1/2 -translate-y-1/2 pl-2",
};

const arrowPosition: Record<Direction, string> = {
  top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
  bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
  left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
  right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
};

export default function Tooltip({
  label,
  children,
  direction = "top",
  className = "",
}: TooltipProps) {
  return (
    <div className={`relative group/tooltip inline-flex ${className}`}>
      {children}
      <div
        role="tooltip"
        className={`
          absolute z-50 ${wrapperPosition[direction]}
          pointer-events-none select-none
          opacity-0 group-hover/tooltip:opacity-100
          transition-opacity duration-150
        `}
      >
        <div className="relative bg-zinc-200 text-zinc-900 text-[10px] sm:text-xs md:text-sm font-semibold rounded px-2 sm:px-2.5 py-0.5 sm:py-1 whitespace-nowrap shadow-md">
          {label}
          <span
            className={`absolute w-2 h-2 bg-zinc-200 rotate-45 ${arrowPosition[direction]}`}
          />
        </div>
      </div>
    </div>
  );
}
