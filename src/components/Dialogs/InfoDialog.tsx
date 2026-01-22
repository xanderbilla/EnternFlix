"use client";

import { ReactNode, cloneElement, isValidElement, memo } from "react";
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
      {({ handleClose }) => {
        // Pass handleClose to children if it's a valid React element
        if (isValidElement(children) && typeof children.type !== "string") {
          return cloneElement(children as React.ReactElement<any>, {
            onClose: handleClose,
          });
        }
        return children;
      }}
    </BaseDialog>
  );
}

export default memo(InfoDialog);
