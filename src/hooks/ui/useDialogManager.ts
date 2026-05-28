"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Movie } from "@/types/movie";

export type DialogType = "explore" | "info" | "cast" | "discover" | null;

// Module-level guard: tracks the URL from which dialog state was last restored.
// Only the first useDialogManager instance that mounts on a given URL performs
// the restoration — all subsequent instances on the same page skip it, which
// prevents duplicate dialogs when several components share the same URL.
let _restoredFromUrl = "";

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
  const searchParams = useSearchParams();

  const syncDialogQueryParam = useCallback(
    (
      param: "title" | "cast" | "discover" | null,
      value?: string,
      extraValue?: string,
    ) => {
      if (typeof window === "undefined") return;

      const url = new URL(window.location.href);
      url.searchParams.delete("title");
      url.searchParams.delete("cast");
      url.searchParams.delete("discover");
      url.searchParams.delete("name");

      if (param === "title" && value) {
        url.searchParams.set("title", value);
      } else if (param === "cast" && value) {
        url.searchParams.set("cast", value);
      } else if (param === "discover" && value) {
        url.searchParams.set("discover", value);
        if (extraValue) url.searchParams.set("name", extraValue);
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

    if (topDialog.type === "discover" && topDialog.attributeId) {
      syncDialogQueryParam(
        "discover",
        topDialog.attributeId,
        topDialog.attributeName,
      );
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

  // Snapshot the initial search params so the restoration effect below only
  // reads the URL that was present when this hook first mounted, not the
  // live params that change on subsequent navigations.
  const mountSearchParamsRef = useRef(searchParams);

  // Re-open the dialog that was visible before the user navigated to a
  // dedicated page (e.g. /browse/genre/28). When the browser Back button is
  // pressed, Next.js restores the previous URL which still contains the
  // dialog query params written by syncDialogQueryParam. This effect reads
  // those params on initial mount and reopens the correct dialog.
  // The module-level _restoredFromUrl guard ensures only one instance
  // per URL performs this, preventing duplicate dialogs.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const currentUrl = window.location.href;
    if (_restoredFromUrl === currentUrl) return;

    const params = mountSearchParamsRef.current;
    const discoverParam = params.get("discover");
    const nameParam = params.get("name");
    const titleParam = params.get("title");

    if (discoverParam) {
      _restoredFromUrl = currentUrl;
      openDiscoverDialog(
        discoverParam,
        nameParam ? decodeURIComponent(nameParam) : discoverParam,
      );
    } else if (titleParam) {
      _restoredFromUrl = currentUrl;
      openInfoDialog(titleParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty: restore dialog state from URL only on initial mount

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
