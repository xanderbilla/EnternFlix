import { TabId } from "@/hooks/account/useAccountNavigation";

export interface TabConfig {
  id: TabId;
  label: string;
  title: string;
  description?: string;
}

export const TAB_CONFIG: Record<TabId, TabConfig> = {
  overview: {
    id: "overview",
    label: "Overview",
    title: "Account Overview",
    description: "Manage your account settings and preferences",
  },
  membership: {
    id: "membership",
    label: "Membership",
    title: "Membership & Billing",
    description: "View and manage your subscription details",
  },
  security: {
    id: "security",
    label: "Security",
    title: "Security Settings",
    description: "Manage your account security and privacy",
  },
  devices: {
    id: "devices",
    label: "Devices",
    title: "Manage Devices",
    description: "View and manage your connected devices",
  },
  profiles: {
    id: "profiles",
    label: "Profiles",
    title: "Profile Management",
    description: "Create and manage user profiles",
  },
};

export const TAB_ORDER: TabId[] = [
  "overview",
  "membership",
  "security",
  "devices",
  "profiles",
];
