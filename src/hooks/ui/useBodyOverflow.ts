import { useEffect } from "react";

export function useBodyOverflow(isDialogOpen: boolean) {
  useEffect(() => {
    if (isDialogOpen) {
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
