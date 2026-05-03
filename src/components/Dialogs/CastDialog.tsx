"use client";

import type { CastDialogProps } from "@/types/components";
import BaseDialog from "@/components/UI/BaseDialog";
import { DynamicDialogHeader as DialogHeader } from "@/utils/dynamicImports";
import CastInfo from "./CastInfo";
import { usePerson, usePersonMovies } from "@/hooks/api/usePerson";
import { getImageUrl } from "@/utils/movieHelpers";
import { useMemo } from "react";

export default function CastDialog({
  isOpen,
  castId,
  castName,
  onClose,
  onBack,
  onMovieClick,
  backdropUrl,
  zIndex = 10000,
}: CastDialogProps) {
  const { data: personData } = usePerson(castId, isOpen);
  const { data: personMovies } = usePersonMovies(castId, "all", isOpen);

  const movies = useMemo(() => personMovies || [], [personMovies]);

  // React Compiler cannot preserve this memoization due to the optional
  // chain on a server-fetched object; the manual useMemo is retained so
  // `getImageUrl` (a string-builder) is not recomputed on every render.
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const displayBackdrop = useMemo(() => {
    return personData?.backdropPath
      ? getImageUrl(personData.backdropPath, "original")
      : backdropUrl;
  }, [personData?.backdropPath, backdropUrl]);

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      zIndex={zIndex}
      className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[75vw] max-w-[1200px]"
    >
      {({ handleClose, handleBack }) => (
        <div className="relative">
          <DialogHeader
            title={castName}
            onClose={handleClose}
            onBack={handleBack}
            showBackButton={!!onBack}
            backdropUrl={displayBackdrop}
            variant="cast"
            subtitle="Movies & TV Shows"
            isLoading={!personData}
            verified={personData?.verified}
            gender={personData?.gender}
          />
          <CastInfo
            castId={castId}
            castName={castName}
            movies={movies}
            onMovieClick={onMovieClick}
          />
        </div>
      )}
    </BaseDialog>
  );
}
