export interface DropdownItemProps {
  label: string;
  isMobile?: boolean;
  isDanger?: boolean;
  disabled?: boolean;
  onClick: () => void;
  onClose: () => void;
}
