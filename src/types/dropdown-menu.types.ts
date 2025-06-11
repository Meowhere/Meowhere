export interface DropdownItemButton {
  label: string;
  onClick: () => void;
  isDanger?: boolean;
}

export interface DropdownMenuProps {
  items: DropdownItemButton[];
  isMobile?: boolean;
  title?: string;
  bottomButton?: DropdownItemButton; // 바텀 시트 취소 버튼
  onClose: () => void;
}
