"use client";

import type { DiscoverDialogProps } from "@/types/components";
import BaseDialog from "@/components/UI/BaseDialog";
import { DynamicDialogHeader as DialogHeader } from "@/utils/dynamicImports";
import MovieGrid from "@/components/UI/MovieGrid";
import { useDiscoverByAttribute } from "@/hooks/api/useMovies";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function DiscoverDialog({
  isOpen,
  attributeId,
  attributeName,
  onClose,
  onBack,
  onMovieClick,
  zIndex = 10000,
}: DiscoverDialogProps) {
  const router = useRouter();
  const { data: movies } = useDiscoverByAttribute(attributeId, "all", isOpen);

  const displayMovies = useMemo(() => movies || [], [movies]);

  const handleViewAll = () => {
    if (attributeId) {
      router.push(`/browse/genre/${attributeId}`);
      onClose();
    }
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      zIndex={zIndex}
      ariaLabel={`Browse ${attributeName}`}
      className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[75vw] max-w-[1200px] min-h-[90vh]"
    >
      {({ handleClose, handleBack }) => (
        <div className="relative flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700">
            <div className="flex-1">
              <DialogHeader
                title={attributeName}
                onClose={handleClose}
                onBack={handleBack}
                showBackButton={!!onBack}
                variant="default"
              />
            </div>
            <button
              onClick={handleViewAll}
              className="ml-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded transition-colors whitespace-nowrap"
              aria-label={`View all ${attributeName}`}
            >
              View All
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-8">
              <MovieGrid
                movies={displayMovies}
                onMovieClick={onMovieClick}
                columns={4}
                disableHover={true}
                disableAnimation={true}
              />
            </div>
          </div>
        </div>
      )}
    </BaseDialog>
  );
}
