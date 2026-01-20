"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { TabId } from "@/hooks/account/useAccountNavigation";

const Sidebar = dynamic(() => import("@/components/account/Sidebar"), {
  ssr: false,
});

const Subscriptions = dynamic(
  () => import("@/components/account/Subscriptions"),
  {
    ssr: false,
  },
);

const OverviewTab = dynamic(
  () => import("@/components/account/tabs/OverviewTab"),
  {
    ssr: false,
  },
);

const SecurityTab = dynamic(
  () => import("@/components/account/tabs/SecurityTab"),
  {
    ssr: false,
  },
);

const DevicesTab = dynamic(
  () => import("@/components/account/tabs/DevicesTab"),
  {
    ssr: false,
  },
);

const ProfilesTab = dynamic(
  () => import("@/components/account/tabs/ProfilesTab"),
  {
    ssr: false,
  },
);

function AccountContent() {
  const name = "John Doe";
  const email = "user@email.com";
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as TabId) || "overview";

  const setActiveTab = (newTab: TabId) => {
    router.push(`/account?tab=${newTab}`);
  };

  const renderContent = () => {
    switch (tab) {
      case "membership":
        return <Subscriptions />;
      case "security":
        return <SecurityTab />;
      case "devices":
        return <DevicesTab />;
      case "profiles":
        return <ProfilesTab />;
      case "overview":
      default:
        return <OverviewTab name={name} email={email} />;
    }
  };

  return (
    <div className="h-screen bg-zinc-900 flex flex-col">
      {/* Fixed Header with Logo */}
      <div className="w-full flex items-center px-6 py-4 bg-zinc-900 flex-shrink-0">
        <Link href="/" className="flex items-center">
          <Image
            className="rounded-sm"
            src="/logo.png"
            alt="Logo"
            height={70}
            width={85}
          />
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="w-80 h-full bg-zinc-900 flex-shrink-0">
          <div className="h-full overflow-y-auto">
            <Sidebar activeTab={tab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* Scrollable Tab Content Area */}
        <div className="flex-1 h-full overflow-y-auto bg-zinc-900 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-600">
          <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8 pb-4 border-b border-zinc-700">
              <div className="text-white text-2xl font-bold">
                Account Settings
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
