"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTitle, type TitleData } from "@/hooks/api/useTitle";
import { useVideo } from "@/contexts/VideoContext";
import { Movie } from "@/types/movie";
import DialogBanner from "./DialogBanner";
import InfoDialog from "@/components/Dialogs/InfoDialog";
import { useDialogManager, type DialogType } from "@/hooks/ui/useDialogManager";
import DialogRenderer from "@/components/Dialogs/DialogRenderer";
import { TitleDialogProps } from "@/types/components";
import {
  useNetflixOriginals,
  usePopularMovies,
  usePopularTV,
  useTrendingMovies,
  useTrendingTV,
} from "@/hooks/api/useMovies";

export default function TitleDialog({
  isOpen,
  titleId,
  onClose,
  onMovieChange,
}: TitleDialogProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const { data, error } = useTitle(titleId, shouldFetchData);
  const { data: netflixData } = useNetflixOriginals();
  const { data: popularMovies } = usePopularMovies();
  const { data: popularTV } = usePopularTV();
  const { data: trendingMovies } = useTrendingMovies();
  const { data: trendingTV } = useTrendingTV();
  const { pauseBanner, resumeBanner } = useVideo();
  const {
    dialogState,
    hasBackNavigation,
    openCastDialog,
    openDetailDialog,
    openInfoDialog,
    goBack,
    closeDialog,
  } = useDialogManager();

  const handleClose = useCallback(() => {
    setIsEntering(false);
    setIsClosing(true);
    document.body.style.overflow = "unset";
    resumeBanner();
    setTimeout(() => {
      onClose();
    }, 400);
  }, [resumeBanner, onClose]);

  // Handle movie click from cast/detail dialogs to open info dialog
  const handleMovieClickFromDialog = useCallback(
    (movieId: number) => {
      if (onMovieChange) {
        // Set transitioning state to prevent main InfoDialog from showing
        setIsTransitioning(true);

        // Close the current InfoDialog to trigger exit animation
        setInternalIsOpen(false);

        // First, close ALL nested dialogs (cast/detail) and start close animation
        closeDialog();

        // Wait for the dialog close animation to complete (500ms from BaseDialog)
        // Then update the parent title to open the new Info dialog with fresh animation
        setTimeout(() => {
          onMovieChange(movieId.toString());
          // Brief delay to ensure state updates, then reopen with enter animation
          setTimeout(() => {
            setInternalIsOpen(true);
            setIsTransitioning(false);
          }, 50);
        }, 500);
      } else {
        // Fallback: just close the nested dialog
        closeDialog();
      }
    },
    [closeDialog, onMovieChange],
  );

  const handleExploreClick = useCallback(
    (query: string, title: string, isCast: boolean = false) => {
      // Use different data sources based on context
      let moviesToShow: Movie[] = [];

      if (isCast) {
        // For cast dialogs, use Netflix Originals primarily
        moviesToShow = netflixData?.results?.slice(0, 20) || [];
      } else {
        // For genre/detail dialogs, use a mix of popular and trending content
        const allContent = [
          ...(popularMovies?.results || []),
          ...(popularTV?.results || []),
          ...(trendingMovies?.results || []),
          ...(trendingTV?.results || []),
        ];

        // Shuffle and take first 20
        const shuffled = allContent.sort(() => 0.5 - Math.random());
        moviesToShow = shuffled.slice(0, 20);
      }

      // Fallback if no data is available
      if (moviesToShow.length === 0) {
        moviesToShow = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          title: `${query} Content ${i + 1}`,
          backdrop_path: "/sample-backdrop.jpg",
          poster_path: "/sample-poster.jpg",
          overview: `Content related to ${query}`,
          release_date: "2023-01-01",
          vote_average: 7.5,
          vote_count: 1000,
          popularity: 100.5,
          original_language: "en",
          genre_ids: [28, 12],
        }));
      }

      const backdropUrl = data
        ? `https://image.tmdb.org/t/p/original${(data as TitleData).content?.backdrop_path}`
        : undefined;

      if (isCast) {
        openCastDialog(title, moviesToShow, backdropUrl, 10000, "info");
      } else {
        openDetailDialog(title, moviesToShow, 10000, "info");
      }
    },
    [
      data,
      netflixData,
      popularMovies,
      popularTV,
      trendingMovies,
      trendingTV,
      openCastDialog,
      openDetailDialog,
    ],
  );

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      document.body.style.overflow = "hidden";
      pauseBanner();
      // Trigger enter animation after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsEntering(true);
        });
      });

      // Start fetching data after dialog animation completes (500ms)
      const fetchTimer = setTimeout(() => {
        setShouldFetchData(true);
      }, 500);

      return () => clearTimeout(fetchTimer);
    } else {
      document.body.style.overflow = "unset";
      setShouldFetchData(false);
    }

    // Cleanup function only runs when component unmounts or isOpen changes
    return () => {
      if (isOpen) {
        document.body.style.overflow = "unset";
        resumeBanner();
      }
    };
  }, [isOpen, pauseBanner, resumeBanner]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

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
      <InfoDialog
        isOpen={
          isOpen && !dialogState.isOpen && !isTransitioning && internalIsOpen
        }
        onClose={onClose}
        zIndex={9999}
      >
        {renderContent()}
      </InfoDialog>

      <DialogRenderer
        dialogState={dialogState}
        hasBackNavigation={hasBackNavigation}
        onClose={closeDialog}
        onBack={goBack}
        onMovieClick={(movieId) => {
          // Handle movie click from cast/detail dialogs - update parent state
          handleMovieClickFromDialog(movieId);
        }}
        onInfoDialogOpen={handleMovieClickFromDialog}
      />
    </>
  );
}
