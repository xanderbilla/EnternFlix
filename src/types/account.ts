export type TabId =
  | "overview"
  | "membership"
  | "security"
  | "devices"
  | "profiles";

export interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export interface EditableFieldProps {
  label: string;
  currentValue: string;
  fieldType: "email" | "password";
  placeholder: string;
}

export interface DeviceItemProps {
  type: "desktop" | "mobile" | "tablet";
  name: string;
  browser: string;
  lastActive: string;
  location: string;
  isCurrent?: boolean;
}

export interface OverviewTabProps {
  name: string;
  email: string;
}

export interface TabIconProps {
  tabId: TabId;
  filled: boolean;
}

export interface AccountFormProps {
  name: string;
  email: string;
  language: string;
  isKid: boolean;
  setLanguage: (value: string) => void;
  setIsKid: (value: boolean) => void;
}

export interface ContentLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
