import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export type TabId =
  | "overview"
  | "membership"
  | "security"
  | "devices"
  | "profiles";

export const useAccountNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as TabId) || "overview";

  const navigateToTab = useCallback(
    (tab: TabId) => {
      const url = tab === "overview" ? "/account" : `/account?tab=${tab}`;
      router.push(url);
    },
    [router],
  );

  const navigateToOverview = useCallback(() => {
    navigateToTab("overview");
  }, [navigateToTab]);

  return {
    currentTab,
    navigateToTab,
    navigateToOverview,
    isOverview: currentTab === "overview",
  };
};

export default useAccountNavigation;
