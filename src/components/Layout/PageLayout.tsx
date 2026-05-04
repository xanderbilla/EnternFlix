"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  DynamicNavbar,
  DynamicFooter,
  DynamicBanner,
} from "@/utils/dynamicImports";
import { PageLayoutProps } from "@/types/components";

function PageLayoutContent({
  children,
  showBanner = false,
  gridContent,
}: PageLayoutProps) {
  const searchParams = useSearchParams();
  const viewMode = (searchParams.get("view") as "list" | "grid") || "list";

  return (
    <div className="flex flex-col min-h-screen">
      <DynamicNavbar />
      <div className="relative">
        {/* Only show banner in list view */}
        {showBanner && viewMode === "list" && <DynamicBanner />}

        {/* Content based on view mode */}
        {viewMode === "list" ? (
          <div
            className={
              showBanner
                ? "relative -mt-32 md:-mt-40 lg:-mt-48 z-10 pb-4 space-y-6"
                : "pt-24 pb-4 space-y-6" // Add top padding for secondary navbar when no banner
            }
          >
            {children}
          </div>
        ) : (
          <div className="pt-24 pb-4">{gridContent || children}</div>
        )}
      </div>
      <DynamicFooter />
    </div>
  );
}

export default function PageLayout(props: PageLayoutProps) {
  return (
    <Suspense fallback={null}>
      <PageLayoutContent {...props} />
    </Suspense>
  );
}
