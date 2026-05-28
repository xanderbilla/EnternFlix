"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DynamicBanner } from "@/utils/dynamicImports";
import { PageLayoutProps } from "@/types/components";

function PageLayoutContent({
  children,
  showBanner = false,
  isContentReady = true,
  reserveTopPaddingWhenNoBanner = true,
  gridContent,
}: PageLayoutProps) {
  const searchParams = useSearchParams();
  const viewMode = (searchParams.get("view") as "list" | "grid") || "list";

  return (
    <main id="main-content" className="relative flex-1" tabIndex={-1}>
      {/* Only show banner in list view */}
      {showBanner && viewMode === "list" && <DynamicBanner />}

      {/* Content based on view mode */}
      {viewMode === "list" ? (
        <div
          className={
            showBanner
              ? "relative -mt-24 sm:-mt-32 md:-mt-40 lg:-mt-48 z-10 pb-4 space-y-6"
              : isContentReady
                ? reserveTopPaddingWhenNoBanner
                  ? "pt-24 pb-4 space-y-6"
                  : "pb-4 space-y-6"
                : "pb-4 space-y-6"
          }
        >
          {children}
        </div>
      ) : (
        <div className="pt-24 pb-4">{gridContent || children}</div>
      )}
    </main>
  );
}

export default function PageLayout(props: PageLayoutProps) {
  return (
    <Suspense fallback={null}>
      <PageLayoutContent {...props} />
    </Suspense>
  );
}
