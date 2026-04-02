"use client";

import { Suspense, lazy } from "react";
import { DialogState } from "@/hooks/ui/useDialogManager";
import { DialogRendererProps } from "@/types/components";
import ExploreDialog from "./ExploreDialog";
import CastDialog from "./CastDialog";
import DiscoverDialog from "./DiscoverDialog";
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
  onOpenDiscoverDialog,
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
          castId,
          backdropUrl,
          titleId,
          attributeId,
          attributeName,
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
                castId={castId || ""}
                castName={castName || title}
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

          case "discover":
            return (
              <DiscoverDialog
                key={key}
                isOpen={isOpen}
                attributeId={attributeId || ""}
                attributeName={attributeName || title}
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
                  onOpenDiscoverDialog={onOpenDiscoverDialog}
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
