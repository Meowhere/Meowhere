export interface ButtonItemProps {
  type: "button";
  label: string;
  onClick: () => void;
  isMobile?: boolean;
  isDelete?: boolean;
  disabled?: boolean;
}

export interface LinkItemProps {
  type: "link";
  label: string;
  href: string;
  isMobile?: boolean;
  isDelete?: boolean;
  disabled?: boolean;
}

export type DropdownItemProps = ButtonItemProps | LinkItemProps;
