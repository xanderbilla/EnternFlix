"use client";

import { memo } from "react";

export type IconButtonVariant = "add" | "like" | "check";

interface IconButtonProps {
  variant: IconButtonVariant;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

function IconButton({
  variant,
  onClick,
  className = "",
  ariaLabel,
}: IconButtonProps) {
  const baseClasses =
    "bg-zinc-800/80 hover:bg-zinc-700/80 border-2 border-zinc-600 hover:border-zinc-500 text-white p-1.5 sm:p-2 rounded-full transition-colors";

  const icons = {
    add: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M11 11V2h2v9h9v2h-9v9h-2v-9H2v-2z"
          clipRule="evenodd"
        />
      </svg>
    ),
    like: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M10.696 8.773A2 2 0 0 0 11 7.713V4h.838c.877 0 1.59.553 1.77 1.311C13.822 6.228 14 7.227 14 8a7 7 0 0 1-.246 1.75L13.432 11H17.5a1.5 1.5 0 0 1 1.476 1.77l-.08.445.28.354c.203.256.324.578.324.931s-.12.675-.324.93l-.28.355.08.445q.024.13.024.27c0 .49-.234.925-.6 1.2l-.4.3v.5a1.5 1.5 0 0 1-1.5 1.5h-3.877a9 9 0 0 1-2.846-.462l-1.493-.497A10.5 10.5 0 0 0 5 18.5v-4.747l2.036-.581a3 3 0 0 0 1.72-1.295zM10.5 2A1.5 1.5 0 0 0 9 3.5v4.213l-1.94 3.105a1 1 0 0 1-.574.432l-2.035.581A2 2 0 0 0 3 13.754v4.793c0 1.078.874 1.953 1.953 1.953.917 0 1.828.148 2.698.438l1.493.498a11 11 0 0 0 3.479.564H16.5a3.5 3.5 0 0 0 3.467-3.017 3.5 3.5 0 0 0 1.028-2.671c.32-.529.505-1.15.505-1.812s-.185-1.283-.505-1.812Q21 12.595 21 12.5A3.5 3.5 0 0 0 17.5 9h-1.566c.041-.325.066-.66.066-1 0-1.011-.221-2.194-.446-3.148C15.14 3.097 13.543 2 11.838 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
    check: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  const defaultLabels = {
    add: "Add to My List",
    like: "Like",
    check: "Added",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      aria-label={ariaLabel || defaultLabels[variant]}
    >
      {icons[variant]}
    </button>
  );
}

export default memo(IconButton);
