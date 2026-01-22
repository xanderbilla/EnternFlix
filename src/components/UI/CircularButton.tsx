"use client";

import { CircularButtonProps } from "@/types/components";

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

const variantClasses = {
  primary: "bg-white/10 hover:bg-white/20 text-white",
  secondary:
    "bg-black/30 hover:bg-black/50 border-2 border-white/60 text-white/80 hover:text-white",
  ghost: "bg-transparent hover:bg-white/10 text-gray-200 hover:text-white",
  muted:
    "bg-black/50 hover:bg-black/70 border-2 border-white/60 text-white/60 hover:text-white",
};

export default function CircularButton({
  size = "md",
  variant = "ghost",
  icon,
  className = "",
  "aria-label": ariaLabel,
  ...props
}: CircularButtonProps) {
  return (
    <button
      className={`
        rounded-full flex items-center justify-center
        transition-colors cursor-pointer
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </button>
  );
}
