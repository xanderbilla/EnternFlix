"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTitle, type TitleData } from "@/hooks/api/useTitle";
import DialogBanner from "./DialogBanner";
import InfoDialog from "@/components/Dialogs/InfoDialog";
import { DynamicDialogRenderer as DialogRenderer } from "@/utils/dynamicImports";
import { useDialogManager } from "@/hooks/ui/useDialogManager";
import { TitleDialogProps } from "@/types/components";
import { useTrending } from "@/hooks/api/useMovies";
import { useMovieTransition } from "@/hooks/ui/useMovieTransition";
import { useExploreNavigation } from "@/hooks/ui/useExploreNavigation";

export default function TitleDialog({
  isOpen,
  titleId,
  onClose,
  onMovieChange,
  onOpenCastDialog,
  onOpenDetailDialog,
}: TitleDialogProps) {
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const { data, error } = useTitle(titleId, shouldFetchData);
  const { data: trendingData } = useTrending();

  // Use explore navigation hook for handling explore clicks
  const handleExploreClick = useCallback(
    (name: string, title: string, isCast: boolean) => {
      if (isCast && onOpenCastDialog) {
        // Open cast dialog
        const castMovies = trendingData?.results || [];
        onOpenCastDialog(name, castMovies, undefined, 10001);
      } else if (onOpenDetailDialog) {
        // Open detail dialog
        const detailMovies = trendingData?.results || [];
        onOpenDetailDialog(title, detailMovies, 10001);
      }
    },
    [trendingData, onOpenCastDialog, onOpenDetailDialog],
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // Start fetching data after dialog animation completes (500ms)
      const fetchTimer = setTimeout(() => {
        setShouldFetchData(true);
      }, 500);

      return () => clearTimeout(fetchTimer);
    } else {
      setShouldFetchData(false);
    }
  }, [isOpen]);

  // Handle escape key press
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

    // Type assertion to help TypeScript understand the data structure
    const titleData = data as TitleData;

    return (
      <div className="relative transition-all duration-300 ease-in-out">
        <DialogBanner
          data={titleData.content as any}
          mediaType={titleData.mediaType}
          onClose={handleClose}
          onExploreClick={handleExploreClick}
        />
      </div>
    );
  };

  return (
    <>
      <InfoDialog isOpen={isOpen} onClose={onClose} zIndex={9999}>
        {renderContent()}
      </InfoDialog>
    </>
  );
}
