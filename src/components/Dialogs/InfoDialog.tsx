"use client";

import type { InfoDialogProps } from "@/types/components";
import { memo } from "react";
import BaseDialog from "@/components/UI/BaseDialog";

function InfoDialog({
  isOpen,
  onClose,
  children,
  zIndex = 9999,
}: InfoDialogProps) {
  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      zIndex={zIndex}
      className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[75vw] max-w-[1000px] relative"
    >
      {children}
    </BaseDialog>
  );
}

export default memo(InfoDialog);
