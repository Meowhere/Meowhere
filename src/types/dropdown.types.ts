import { DropdownItemButton } from './dropdown-menu.types';

export interface DropdownProps {
  dropdownItems: DropdownItemButton[];
  triggerLabel: string;
  selectedValue: string;
}
