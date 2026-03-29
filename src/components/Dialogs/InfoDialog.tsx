"use client";

import { ReactNode, memo } from "react";
import BaseDialog from "@/components/UI/BaseDialog";

export interface InfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  zIndex?: number;
}

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
