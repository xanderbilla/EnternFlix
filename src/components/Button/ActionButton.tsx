"use client";

import { memo } from "react";

interface NetflixButtonProps {
  variant: "primary" | "secondary";
  icon?: "play" | "info" | "home" | "search" | "retry";
  label: string;
  ariaLabel?: string;
  onClick?: () => void;
  className?: string;
}

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z" />
  </svg>
);

const InfoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12m13-2v8h-2v-8zm-1-1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
      clipRule="evenodd"
    />
  </svg>
);

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3 10.5L12 3L21 10.5V21H14.5V14.5H9.5V21H3V10.5Z"
      fill="currentColor"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 4a6 6 0 1 0 3.75 10.68l4.28 4.27 1.42-1.41-4.27-4.28A6 6 0 0 0 10 4m-8 6a8 8 0 1 1 14.32 4.9l4.1 4.1-2.83 2.83-4.1-4.1A8 8 0 0 1 2 10"
      fill="currentColor"
    />
  </svg>
);

const RetryIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 12A8 8 0 1 1 17.66 6.34L20 9M20 9V3M20 9H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function NetflixButton({
  variant,
  icon,
  label,
  ariaLabel,
  onClick,
  className = "",
}: NetflixButtonProps) {
  const baseClasses =
    "font-semibold rounded flex items-center gap-3 transition-colors";

  const variantClasses = {
    primary: "bg-white hover:bg-white/90 text-black py-2 px-6",
    secondary:
      "bg-zinc-600/70 hover:bg-zinc-600/50 text-white py-2 px-6 border-0",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={ariaLabel ?? label}
    >
      {icon === "play" && <PlayIcon />}
      {icon === "info" && <InfoIcon />}
      {icon === "home" && <HomeIcon />}
      {icon === "search" && <SearchIcon />}
      {icon === "retry" && <RetryIcon />}
      <span>{label}</span>
    </button>
  );
}

export default memo(NetflixButton);
