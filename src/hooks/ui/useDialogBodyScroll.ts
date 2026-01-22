"use client";

import { useEffect } from "react";

export function useDialogBodyScroll(showDialog: boolean) {
  useEffect(() => {
    if (showDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDialog]);
}
