"use client";

import { useState, useCallback } from "react";
import { Movie } from "@/types/movie";

export type DialogType = "explore" | "info" | "cast" | "detail" | null;

export interface DialogState {
  type: DialogType;
  isOpen: boolean;
  title: string;
  movies: Movie[];
  castName?: string;
  backdropUrl?: string;
  titleId?: string;
  zIndex?: number;
  parentDialog?: DialogType;
}

export function useDialogManager() {
  const [dialogStack, setDialogStack] = useState<DialogState[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get current dialog (top of stack)
  const currentDialog = dialogStack[dialogStack.length - 1] || {
    type: null,
    isOpen: false,
    title: "",
    movies: [],
  };

  const openExploreDialog = useCallback(
    (title: string, movies: Movie[], zIndex?: number) => {
      setDialogStack([
        {
          type: "explore",
          isOpen: true,
          title,
          movies,
          zIndex,
        },
      ]);
    },
    [],
  );

  const openInfoDialog = useCallback(
    (titleId: string, zIndex?: number) => {
      // If there's already a dialog open, do collapse → expand transition
      // But keep the previous dialog in stack for back navigation
      if (dialogStack.length > 0) {
        if (isTransitioning) return;

        setIsTransitioning(true);

        // Step 1: Collapse current dialog (but keep in stack)
        setDialogStack((prev) => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              isOpen: false,
            };
          }
          return updated;
        });

        // Step 2: After collapse (500ms), add new info dialog
        setTimeout(() => {
          setDialogStack((prev) => [
            ...prev,
            {
              type: "info",
              isOpen: true, // Open immediately, BaseDialog will handle animation
              title: "",
              movies: [],
              titleId,
              zIndex,
            },
          ]);
          setIsTransitioning(false);
        }, 550); // Slightly longer to ensure previous dialog is gone
      } else {
        // No dialog open, just open directly
        setDialogStack([
          {
            type: "info",
            isOpen: true,
            title: "",
            movies: [],
            titleId,
            zIndex,
          },
        ]);
      }
    },
    [dialogStack.length, isTransitioning],
  );

  const openCastDialog = useCallback(
    (
      castName: string,
      movies: Movie[],
      backdropUrl?: string,
      zIndex?: number,
    ) => {
      // If there's already a dialog open, do collapse → expand transition
      if (dialogStack.length > 0) {
        if (isTransitioning) return;

        setIsTransitioning(true);

        // Step 1: Collapse current dialog
        setDialogStack((prev) => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              isOpen: false,
            };
          }
          return updated;
        });

        // Step 2: After collapse (500ms), add new cast dialog
        setTimeout(() => {
          setDialogStack((prev) => [
            ...prev,
            {
              type: "cast",
              isOpen: true,
              title: castName,
              movies,
              castName,
              backdropUrl,
              zIndex,
            },
          ]);
          setIsTransitioning(false);
        }, 550);
      } else {
        // No dialog open, just open directly
        setDialogStack([
          {
            type: "cast",
            isOpen: true,
            title: castName,
            movies,
            castName,
            backdropUrl,
            zIndex,
          },
        ]);
      }
    },
    [dialogStack.length, isTransitioning],
  );

  const openDetailDialog = useCallback(
    (title: string, movies: Movie[], zIndex?: number) => {
      // If there's already a dialog open, do collapse → expand transition
      if (dialogStack.length > 0) {
        if (isTransitioning) return;

        setIsTransitioning(true);

        // Step 1: Collapse current dialog
        setDialogStack((prev) => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              isOpen: false,
            };
          }
          return updated;
        });

        // Step 2: After collapse (500ms), add new detail dialog
        setTimeout(() => {
          setDialogStack((prev) => [
            ...prev,
            {
              type: "detail",
              isOpen: true,
              title,
              movies,
              zIndex,
            },
          ]);
          setIsTransitioning(false);
        }, 550);
      } else {
        // No dialog open, just open directly
        setDialogStack([
          {
            type: "detail",
            isOpen: true,
            title,
            movies,
            zIndex,
          },
        ]);
      }
    },
    [dialogStack.length, isTransitioning],
  );

  // Replace current dialog with new one (collapse → expand)
  const replaceDialog = useCallback(
    (newDialog: DialogState, onComplete?: () => void) => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      // Step 1: Collapse current dialog
      setDialogStack((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            isOpen: false,
          };
        }
        return updated;
      });

      // Step 2: After collapse animation (500ms), replace with new dialog
      setTimeout(() => {
        setDialogStack((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...newDialog, isOpen: true };
          return updated;
        });
        setIsTransitioning(false);
        onComplete?.();
      }, 500);
    },
    [isTransitioning],
  );

  // Go back (collapse current → expand previous)
  const goBack = useCallback(() => {
    if (isTransitioning || dialogStack.length === 0) return;

    setIsTransitioning(true);

    // Step 1: Collapse current dialog
    setDialogStack((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          isOpen: false,
        };
      }
      return updated;
    });

    // Step 2: After collapse animation (500ms), remove from stack and reopen previous
    setTimeout(() => {
      setDialogStack((prev) => {
        const updated = prev.slice(0, -1);
        // Reopen the previous dialog (now at top of stack)
        if (updated.length > 0) {
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            isOpen: true,
          };
        }
        return updated;
      });
      setIsTransitioning(false);
    }, 500);
  }, [dialogStack.length, isTransitioning]);

  // Close all dialogs
  const closeDialog = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Collapse current dialog
    setDialogStack((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          isOpen: false,
        };
      }
      return updated;
    });

    // After animation, clear stack
    setTimeout(() => {
      setDialogStack([]);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const hasBackNavigation = dialogStack.length > 1;

  return {
    dialogState: currentDialog,
    dialogStack,
    hasBackNavigation,
    isTransitioning,
    openExploreDialog,
    openInfoDialog,
    openCastDialog,
    openDetailDialog,
    replaceDialog,
    goBack,
    closeDialog,
  };
}
