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
  parentDialog?: DialogType; // Track parent dialog for back navigation
}

export function useDialogManager() {
  const [dialogState, setDialogState] = useState<DialogState>({
    type: null,
    isOpen: false,
    title: "",
    movies: [],
  });

  const [dialogHistory, setDialogHistory] = useState<DialogState[]>([]);

  const openExploreDialog = useCallback(
    (title: string, movies: Movie[], zIndex?: number) => {
      setDialogState({
        type: "explore",
        isOpen: true,
        title,
        movies,
        zIndex,
      });
      setDialogHistory([]);
    },
    [],
  );

  const openInfoDialog = useCallback(
    (titleId: string, zIndex?: number, fromDialog?: DialogType) => {
      // Save current dialog to history if it exists and we're coming from another dialog
      if (fromDialog && dialogState.isOpen && dialogState.type) {
        setDialogHistory((prev) => [...prev, dialogState]);
      }

      setDialogState({
        type: "info",
        isOpen: true,
        title: "",
        movies: [],
        titleId,
        zIndex,
        parentDialog: fromDialog,
      });
    },
    [dialogState],
  );

  const openCastDialog = useCallback(
    (
      castName: string,
      movies: Movie[],
      backdropUrl?: string,
      zIndex?: number,
      parentDialog?: DialogType,
    ) => {
      // If we have a parent dialog, create a fake dialog state to represent it in history
      if (parentDialog === "info") {
        setDialogHistory([
          {
            type: "info",
            isOpen: true,
            title: "",
            movies: [],
            titleId: "", // This will be handled by the parent TitleDialog
          },
        ]);
      } else if (dialogState.isOpen && dialogState.type) {
        // Save current dialog to history if it exists
        setDialogHistory((prev) => [...prev, dialogState]);
      }

      setDialogState({
        type: "cast",
        isOpen: true,
        title: castName,
        movies,
        castName,
        backdropUrl,
        zIndex,
        parentDialog,
      });
    },
    [dialogState],
  );

  const openDetailDialog = useCallback(
    (
      title: string,
      movies: Movie[],
      zIndex?: number,
      parentDialog?: DialogType,
    ) => {
      // If we have a parent dialog, create a fake dialog state to represent it in history
      if (parentDialog === "info") {
        setDialogHistory([
          {
            type: "info",
            isOpen: true,
            title: "",
            movies: [],
            titleId: "", // This will be handled by the parent TitleDialog
          },
        ]);
      } else if (dialogState.isOpen && dialogState.type) {
        // Save current dialog to history if it exists
        setDialogHistory((prev) => [...prev, dialogState]);
      }

      setDialogState({
        type: "detail",
        isOpen: true,
        title,
        movies,
        zIndex,
        parentDialog,
      });
    },
    [dialogState],
  );

  const goBack = useCallback(() => {
    const previousDialog = dialogHistory[dialogHistory.length - 1];
    if (previousDialog) {
      if (previousDialog.type === "info") {
        // Going back to info dialog - just close the current dialog
        setDialogState({
          type: null,
          isOpen: false,
          title: "",
          movies: [],
        });
        setDialogHistory([]);
      } else {
        // Going back to another dialog type
        setDialogState(previousDialog);
        setDialogHistory((prev) => prev.slice(0, -1));
      }
    } else {
      // No history, just close
      setDialogState({
        type: null,
        isOpen: false,
        title: "",
        movies: [],
      });
    }
  }, [dialogHistory]);

  const closeDialog = useCallback(() => {
    setDialogState({
      type: null,
      isOpen: false,
      title: "",
      movies: [],
    });
    setDialogHistory([]);
  }, []);

  const hasBackNavigation = dialogHistory.length > 0;

  return {
    dialogState,
    hasBackNavigation,
    openExploreDialog,
    openInfoDialog,
    openCastDialog,
    openDetailDialog,
    goBack,
    closeDialog,
  };
}
