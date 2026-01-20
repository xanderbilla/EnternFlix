import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "danger"
    | "secondary"
    | "outline"
    | "banner-play"
    | "banner-info"
    | "auth";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-zinc-200 text-black border border-zinc-600 tracking-widest hover:bg-zinc-300 focus:ring-zinc-500",
    danger:
      "bg-red-600 text-white border border-red-700 tracking-widest hover:bg-red-700 focus:ring-red-500",
    secondary:
      "bg-zinc-700 text-white border border-zinc-600 tracking-widest hover:bg-zinc-600 focus:ring-zinc-500",
    outline:
      "text-gray-400 border-2 border-gray-400 tracking-widest hover:border-white hover:text-white focus:ring-gray-500",
    "banner-play":
      "bg-white text-black rounded-[4px] hover:bg-neutral-300 focus:ring-gray-500",
    "banner-info":
      "bg-white bg-opacity-30 text-white hover:bg-opacity-20 focus:ring-white/50",
    auth: "bg-red-600 text-white font-bold hover:bg-red-700 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm rounded",
    md: "px-4 py-2 text-sm rounded",
    lg: "px-7 py-3 text-xl rounded",
  };

  const classes = twMerge(
    baseStyles,
    variants[variant],
    sizes[size],
    className,
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
