"use client";

import { useState, useCallback, useEffect } from "react";
import { Movie } from "@/types/movie";

export type DialogType = "explore" | "info" | "cast" | "discover" | null;

export interface DialogState {
  type: DialogType;
  isOpen: boolean;
  title: string;
  movies: Movie[];
  castName?: string;
  castId?: string;
  backdropUrl?: string;
  titleId?: string;
  attributeId?: string;
  attributeName?: string;
  zIndex?: number;
  parentDialog?: DialogType;
  // Pagination support
  discoverType?: string;
  discoverContent?: string;
  isPaginationEnabled?: boolean;
}

export function useDialogManager() {
  const [dialogStack, setDialogStack] = useState<DialogState[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const syncDialogQueryParam = useCallback(
    (param: "title" | "cast" | null, value?: string) => {
      if (typeof window === "undefined") return;

      const url = new URL(window.location.href);
      url.searchParams.delete("title");
      url.searchParams.delete("cast");

      if (param && value) {
        url.searchParams.set(param, value);
      }

      const nextUrl = `${url.pathname}${url.search}${url.hash}`;
      window.history.replaceState(window.history.state, "", nextUrl);
    },
    [],
  );

  const currentDialog = dialogStack[dialogStack.length - 1] || {
    type: null,
    isOpen: false,
    title: "",
    movies: [],
  };

  useEffect(() => {
    if (dialogStack.length === 0) {
      syncDialogQueryParam(null);
      return;
    }

    const topDialog = dialogStack[dialogStack.length - 1];
    if (!topDialog?.isOpen) {
      return;
    }

    if (topDialog.type === "info" && topDialog.titleId) {
      syncDialogQueryParam("title", topDialog.titleId);
      return;
    }

    if (topDialog.type === "cast" && topDialog.castId) {
      syncDialogQueryParam("cast", topDialog.castId);
      return;
    }

    syncDialogQueryParam(null);
  }, [dialogStack, syncDialogQueryParam]);

  const openExploreDialog = useCallback(
    (
      title: string,
      movies: Movie[],
      zIndex?: number,
      discoverType?: string,
      discoverContent?: string,
      isPaginationEnabled: boolean = false,
    ) => {
      setDialogStack([
        {
          type: "explore",
          isOpen: true,
          title,
          movies,
          zIndex,
          discoverType,
          discoverContent,
          isPaginationEnabled,
        },
      ]);
    },
    [],
  );

  const openInfoDialog = useCallback(
    (titleId: string, zIndex?: number) => {
      if (dialogStack.length > 0) {
        if (isTransitioning) return;

        setIsTransitioning(true);

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

        setTimeout(() => {
          setDialogStack((prev) => [
            ...prev,
            {
              type: "info",
              isOpen: true,
              title: "",
              movies: [],
              titleId,
              zIndex,
            },
          ]);
          setIsTransitioning(false);
        }, 550); // Slightly longer to ensure previous dialog is gone
      } else {
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
      castId: string,
      castName: string,
      backdropUrl?: string,
      zIndex?: number,
    ) => {
      if (dialogStack.length > 0) {
        if (isTransitioning) return;

        setIsTransitioning(true);

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

        setTimeout(() => {
          setDialogStack((prev) => [
            ...prev,
            {
              type: "cast",
              isOpen: true,
              title: castName,
              castId,
              castName,
              backdropUrl,
              movies: [],
              zIndex,
            },
          ]);
          setIsTransitioning(false);
        }, 550);
      } else {
        setDialogStack([
          {
            type: "cast",
            isOpen: true,
            title: castName,
            castId,
            castName,
            backdropUrl,
            movies: [],
            zIndex,
          },
        ]);
      }
    },
    [dialogStack.length, isTransitioning],
  );

  const openDiscoverDialog = useCallback(
    (attributeId: string, attributeName: string, zIndex?: number) => {
      if (dialogStack.length > 0) {
        if (isTransitioning) return;

        setIsTransitioning(true);

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

        setTimeout(() => {
          setDialogStack((prev) => [
            ...prev,
            {
              type: "discover",
              isOpen: true,
              title: attributeName,
              attributeId,
              attributeName,
              movies: [],
              zIndex,
            },
          ]);
          setIsTransitioning(false);
        }, 550);
      } else {
        setDialogStack([
          {
            type: "discover",
            isOpen: true,
            title: attributeName,
            attributeId,
            attributeName,
            movies: [],
            zIndex,
          },
        ]);
      }
    },
    [dialogStack.length, isTransitioning],
  );

  const replaceDialog = useCallback(
    (newDialog: DialogState, onComplete?: () => void) => {
      if (isTransitioning) return;

      setIsTransitioning(true);

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

  const goBack = useCallback(() => {
    if (isTransitioning || dialogStack.length === 0) return;

    setIsTransitioning(true);

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

    setTimeout(() => {
      setDialogStack((prev) => {
        const updated = prev.slice(0, -1);
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

  const closeDialog = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);

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
    openDiscoverDialog,
    replaceDialog,
    goBack,
    closeDialog,
  };
}
