"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTitle } from "@/hooks/api/useTitle";
import { useRouter } from "next/navigation";
import DialogBanner from "./DialogBanner";
import InfoDialog from "@/components/Dialogs/InfoDialog";
import { DynamicDialogRenderer as DialogRenderer } from "@/utils/dynamicImports";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import { TitleDialogProps } from "@/types/components";
import { useMovieTransition } from "@/hooks/ui/useMovieTransition";
import { useExploreNavigation } from "@/hooks/ui/useExploreNavigation";

export default function TitleDialog({
  isOpen,
  titleId,
  onClose,
  onMovieChange,
  onOpenCastDialog,
  onOpenDiscoverDialog,
}: TitleDialogProps) {
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const { data, error } = useTitle(titleId, shouldFetchData);
  const router = useRouter();

  const handleExploreClick = useCallback(
    (idOrName: string, title: string, isCast?: boolean) => {
      if (isCast && onOpenCastDialog) {
        onOpenCastDialog(idOrName, title, undefined, 10001);
      } else {
        // Navigate to genre page instead of opening discover dialog
        router.push(`/browse/genre/${idOrName}`);
        onClose();
      }
    },
    [onOpenCastDialog, router, onClose],
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // Debounced fetch gating: only enable the network request 500ms after
      // the dialog opens (avoids fetch-on-flicker when users brush past).
      // Resetting on close is required so a subsequent open re-arms the timer.
      // This is a synchronization with an external system (the data layer)
      // and cannot be expressed as a pure derivation.
      const fetchTimer = setTimeout(() => {
        setShouldFetchData(true);
      }, 500);

      return () => clearTimeout(fetchTimer);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldFetchData(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl text-white mb-4">Oops!</h1>
            <p className="text-gray-400">
              {error instanceof Error ? error.message : "Content not found"}
            </p>
          </div>
        </div>
      );
    }

    if (!data) {
      return null;
    }

    const titleData = data;

    return (
      <div className="relative transition-all duration-300 ease-in-out">
        <DialogBanner
          data={titleData.content}
          mediaType={titleData.mediaType}
          onClose={handleClose}
          onExploreClick={handleExploreClick}
        />
      </div>
    );
  };

  return (
    <InfoDialog isOpen={isOpen} onClose={onClose} zIndex={9999}>
      {renderContent()}
    </InfoDialog>
  );
}
