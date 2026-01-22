"use client";

import { Suspense, lazy } from "react";
import { DialogState } from "@/hooks/ui/useDialogManager";
import { DialogRendererProps } from "@/types/components";
import ExploreDialog from "./ExploreDialog";
import CastDialog from "./CastDialog";
import DetailDialog from "./DetailDialog";
import InfoDialog from "./InfoDialog";

const TitleDialog = lazy(() => import("@/components/TitlePage/TitleDialog"));

export default function DialogRenderer({
  dialogState,
  hasBackNavigation,
  onClose,
  onBack,
  onMovieClick,
  onInfoDialogOpen,
}: DialogRendererProps) {
  const {
    type,
    isOpen,
    title,
    movies,
    castName,
    backdropUrl,
    titleId,
    zIndex,
  } = dialogState;

  if (!isOpen || !type) return null;

  switch (type) {
    case "explore":
      return (
        <ExploreDialog
          isOpen={isOpen}
          title={title}
          movies={movies}
          onClose={onClose}
          onMovieClick={onMovieClick}
          zIndex={zIndex}
        />
      );

    case "cast":
      return (
        <CastDialog
          isOpen={isOpen}
          castName={castName || title}
          movies={movies}
          onClose={onClose}
          onBack={hasBackNavigation ? onBack : undefined}
          onMovieClick={onInfoDialogOpen || onMovieClick}
          backdropUrl={backdropUrl}
          zIndex={zIndex}
        />
      );

    case "detail":
      return (
        <DetailDialog
          isOpen={isOpen}
          title={title}
          movies={movies}
          onClose={onClose}
          onBack={hasBackNavigation ? onBack : undefined}
          onMovieClick={onInfoDialogOpen || onMovieClick}
          zIndex={zIndex}
        />
      );

    case "info":
      return (
        <Suspense fallback={null}>
          <TitleDialog
            isOpen={isOpen}
            titleId={titleId || ""}
            onClose={onClose}
            onMovieChange={(id) => onInfoDialogOpen?.(Number(id))}
          />
        </Suspense>
      );

    default:
      return null;
  }
}
