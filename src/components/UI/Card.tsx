"use client";

import { CardProps } from "@/types/components";

export default function Card({
  title,
  subtitle,
  children,
  className = "",
  contentClassName = "",
}: CardProps) {
  return (
    <div className={`bg-zinc-800/50 rounded-lg p-6 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-lg font-medium text-white">{title}</h3>}
          {subtitle && <p className="text-zinc-400 text-sm mt-1">{subtitle}</p>}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
