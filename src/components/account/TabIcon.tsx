import React from "react";
import { TabId } from "@/hooks/account/useAccountNavigation";
import { TabIconProps } from "@/types/account";
import OverviewIcon from "./icons/OverviewIcon";
import MembershipIcon from "./icons/MembershipIcon";
import SecurityIcon from "./icons/SecurityIcon";
import DevicesIcon from "./icons/DevicesIcon";
import ProfilesIcon from "./icons/ProfilesIcon";

export default function TabIcon({ tabId, filled }: TabIconProps) {
  const iconClass = "w-5 h-5";

  const iconMap: Record<TabId, React.ReactElement> = {
    overview: <OverviewIcon filled={filled} className={iconClass} />,
    membership: <MembershipIcon filled={filled} className={iconClass} />,
    security: <SecurityIcon filled={filled} className={iconClass} />,
    devices: <DevicesIcon filled={filled} className={iconClass} />,
    profiles: <ProfilesIcon filled={filled} className={iconClass} />,
  };

  return iconMap[tabId] || null;
}
