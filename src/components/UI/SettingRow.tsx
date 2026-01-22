"use client";

import { ReactNode } from "react";
import { SettingRowProps } from "@/types/components";

export default function SettingRow({
  label,
  description,
  action,
  hasBorder = true,
  className = "",
}: SettingRowProps) {
  return (
    <div
      className={`
        flex items-center justify-between py-3
        ${hasBorder ? "border-b border-zinc-700" : ""}
        ${className}
      `}
    >
      <div>
        <div className="font-medium text-white">{label}</div>
        {description && (
          <div className="text-zinc-400 text-sm mt-0.5">{description}</div>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
