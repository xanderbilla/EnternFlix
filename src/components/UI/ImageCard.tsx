"use client";

import Image from "next/image";
import { ImageCardProps } from "@/types/components";

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-24 h-24",
  lg: "w-[100px] h-[100px]",
};

export default function ImageCard({
  imageUrl,
  alt,
  name,
  shape = "square",
  size = "md",
  subtitle,
  onEdit,
  className = "",
}: ImageCardProps) {
  return (
    <div className={`flex flex-col items-center gap-2 group ${className}`}>
      <div
        className={`
          relative overflow-hidden
          ${sizeClasses[size]}
          ${shape === "circular" ? "rounded-full" : "rounded-md"}
        `}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className={`object-cover ${shape === "square" ? "brightness-0 invert" : ""}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-700 text-white text-sm">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="text-center">
        <span className="text-white text-sm block">{name}</span>
        {subtitle && <span className="text-zinc-400 text-xs">{subtitle}</span>}
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Edit
        </button>
      )}
    </div>
  );
}
