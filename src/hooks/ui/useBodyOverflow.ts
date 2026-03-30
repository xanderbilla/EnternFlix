import { useEffect } from "react";

/**
 * Custom hook to manage body overflow state
 * Prevents direct DOM manipulation by centralizing overflow control
 *
 * @param isDialogOpen - Whether a dialog is currently open
 */
export function useBodyOverflow(isDialogOpen: boolean) {
  useEffect(() => {
    if (isDialogOpen) {
      // Restore hidden overflow when dialog opens
      document.body.style.overflowX = "hidden";
    }
  }, [isDialogOpen]);

  const setOverflowVisible = () => {
    document.body.style.overflowX = "visible";
  };

  const setOverflowHidden = () => {
    document.body.style.overflowX = "hidden";
  };

  return {
    setOverflowVisible,
    setOverflowHidden,
  };
}
