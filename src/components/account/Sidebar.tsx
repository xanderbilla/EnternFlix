import Image from "next/image";
import { useMemo, useCallback } from "react";
import { TabId } from "@/hooks/account/useAccountNavigation";
import { TAB_CONFIG, TAB_ORDER } from "@/constants/account/tabConfig";
import TabIcon from "./TabIcon";
import { SidebarProps } from "@/types/account";

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = useMemo(
    () =>
      TAB_ORDER.map((tabId) => {
        const config = TAB_CONFIG[tabId];
        return {
          id: config.id,
          label: config.label,
        };
      }),
    [],
  );

  const renderMenuItem = useCallback(
    (item: { id: TabId; label: string }) => (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        className={`
          w-full flex items-center gap-3 px-4 py-3 text-left
          rounded-lg transition-all duration-200
          ${
            activeTab === item.id
              ? "bg-zinc-800 text-white"
              : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
          }
        `}
      >
        <div className="w-5 h-5 flex-shrink-0">
          <TabIcon tabId={item.id} filled={activeTab === item.id} />
        </div>
        <span className="font-medium">{item.label}</span>
      </button>
    ),
    [activeTab, setActiveTab],
  );

  return (
    <div className="p-6 h-full">
      <div className="flex flex-col items-center w-full">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-4 w-full mb-8">
          <Image
            className="rounded-lg w-20 h-20 object-cover"
            src="/img/default-blue.png"
            alt="Profile Avatar"
            width={80}
            height={80}
          />
          <div className="text-center">
            <h3 className="text-white text-lg font-medium">John Doe</h3>
            <p className="text-zinc-400 text-sm">Premium Member</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="w-full space-y-2">{menuItems.map(renderMenuItem)}</nav>
      </div>
    </div>
  );
};

export default Sidebar;
