import { DropdownItemButton } from './dropdown-menu.types';

export interface DropdownProps {
  dropdownItems: DropdownItemButton[];
  selectedValue: string;
  bottomSheetTitle: string;
  trigger?: React.ReactNode;
  triggerLabel?: string;
}
