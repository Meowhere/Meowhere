export type DropdownItemLink = {
  type: "link";
  label: string;
  href: string;
  isDelete?: boolean;
};

export type DropdownItemButton = {
  type: "button";
  label: string;
  onClick: () => void;
  isDelete?: boolean;
};

export type DropdownItemData = DropdownItemLink | DropdownItemButton;

export type DropdownMenuProps = {
  items: DropdownItemData[];
  isMobile?: boolean;
  title?: string;
  bottomButton?: DropdownItemButton;
};
