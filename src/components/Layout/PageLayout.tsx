"use client";

import { ReactNode } from "react";
import {
  DynamicNavbar,
  DynamicFooter,
  DynamicBanner,
} from "@/utils/dynamicImports";

interface PageLayoutProps {
  children: ReactNode;
  showBanner?: boolean;
  bannerVariant?: "home" | "category";
  bannerTitle?: string;
  bannerDescription?: string;
  bannerCategory?: string;
}

export default function PageLayout({
  children,
  showBanner = false,
  bannerVariant = "home",
  bannerTitle,
  bannerDescription,
  bannerCategory,
}: PageLayoutProps) {
  return (
    <>
      <DynamicNavbar />
      <div className="relative">
        {showBanner && (
          <DynamicBanner
            variant={bannerVariant}
            title={bannerTitle}
            description={bannerDescription}
            category={bannerCategory}
          />
        )}
        {/* Content with overlapping effect when banner is shown */}
        <div
          className={
            showBanner
              ? "relative -mt-32 md:-mt-40 lg:-mt-48 z-10 pb-4 space-y-6"
              : ""
          }
        >
          {children}
        </div>
      </div>
      <DynamicFooter />
    </>
  );
}
