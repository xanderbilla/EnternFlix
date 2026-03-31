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
  dialogStack,
  hasBackNavigation,
  onClose,
  onBack,
  onMovieClick,
  onInfoDialogOpen,
  onOpenCastDialog,
  onOpenDetailDialog,
}: DialogRendererProps) {
  // Render all dialogs in the stack (for collapse animations)
  return (
    <>
      {dialogStack.map((dialog, index) => {
        const {
          type,
          isOpen,
          title,
          movies,
          castName,
          backdropUrl,
          titleId,
          zIndex,
        } = dialog;

        const isTopDialog = index === dialogStack.length - 1;
        const key = `${type}-${index}`;

        switch (type) {
          case "explore":
            return (
              <ExploreDialog
                key={key}
                isOpen={isOpen}
                title={title}
                movies={movies}
                onClose={isTopDialog ? onClose : () => {}}
                onMovieClick={onMovieClick}
                zIndex={(zIndex || 9999) + index}
              />
            );

          case "cast":
            return (
              <CastDialog
                key={key}
                isOpen={isOpen}
                castName={castName || title}
                movies={movies}
                onClose={isTopDialog ? onClose : () => {}}
                onBack={isTopDialog && hasBackNavigation ? onBack : undefined}
                onMovieClick={(movieId) => {
                  if (onInfoDialogOpen) {
                    onInfoDialogOpen(movieId);
                  } else if (onMovieClick) {
                    onMovieClick(movieId);
                  }
                }}
                backdropUrl={backdropUrl}
                zIndex={(zIndex || 10000) + index}
              />
            );

          case "detail":
            return (
              <DetailDialog
                key={key}
                isOpen={isOpen}
                title={title}
                movies={movies}
                onClose={isTopDialog ? onClose : () => {}}
                onBack={isTopDialog && hasBackNavigation ? onBack : undefined}
                onMovieClick={onInfoDialogOpen || onMovieClick}
                zIndex={(zIndex || 10000) + index}
              />
            );

          case "info":
            return (
              <Suspense key={key} fallback={null}>
                <TitleDialog
                  isOpen={isOpen}
                  titleId={titleId || ""}
                  onClose={isTopDialog ? onClose : () => {}}
                  onMovieChange={(id) => {
                    onInfoDialogOpen?.(id);
                  }}
                  onOpenCastDialog={onOpenCastDialog}
                  onOpenDetailDialog={onOpenDetailDialog}
                />
              </Suspense>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
