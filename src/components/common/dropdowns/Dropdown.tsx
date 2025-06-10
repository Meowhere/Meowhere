import { useState } from 'react';

import DropdownMenu from './DropdownMenu';
import { DropdownItemButton, DropdownItemData } from '@/src/types/dropdown-menu.types';
import DropdownTrigger from './DropdownTrigger';

export default function Dropdown({ dropdownItems, triggerLabel, selectedValue }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative w-full'>
      <DropdownTrigger
        label={triggerLabel}
        text={selectedValue}
        isOpen={isOpen}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      />
      <div className='w-full absolute top-[7rem] left-0 hidden lg:block'>
        {isOpen && (
          <DropdownMenu items={dropdownItems} onClose={() => setIsOpen(false)} isMobile={false} />
        )}
      </div>
      <div className='w-full absolute top-[7rem] left-0 lg:hidden'>
        {isOpen && (
          <DropdownMenu
            items={dropdownItems}
            onClose={() => setIsOpen(false)}
            bottomButton={{
              type: 'button',
              label: '취소',
              onClick: () => {
                setIsOpen(false);
              },
            }}
            isMobile={true}
          />
        )}
      </div>
    </div>
  );
}

interface DropdownProps {
  dropdownItems: DropdownItemButton[];
  triggerLabel: string;
  selectedValue: string;
}
