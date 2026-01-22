export interface NavbarGenre {
  id: number;
  name: string;
}

export interface SecondaryNavbarProps {
  pageTitle: string;
  genres?: NavbarGenre[];
  showBackground: boolean;
}

export interface NavbarItemProps {
  label: string;
  path?: string;
}

export interface AccountMenuProps {
  visible: boolean;
}

export interface NavbarProfileProps {
  showAccountMenu: boolean;
  onMenuEnter: () => void;
  onMenuLeave: () => void;
  AccountMenu: React.ComponentType<{ visible: boolean }>;
}

export interface NavbarActionsProps {
  onSearchClick: () => void;
}

export interface NavbarProps {
  classname?: string;
}
