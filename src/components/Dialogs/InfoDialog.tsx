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
      className="w-full max-w-4xl relative"
    >
      {children}
    </BaseDialog>
  );
}

export default memo(InfoDialog);
