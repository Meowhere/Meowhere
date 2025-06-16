'use client';

import { useEffect, useState } from 'react';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import { DropdownItemButton } from '@/src/types/dropdown.types';

interface Props {
  dropdownItems: DropdownItemButton[];
  bottomSheetTitle: string;
  trigger: React.ReactNode;
}

export default function DropdownRightAligned({ dropdownItems, bottomSheetTitle, trigger }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const close = () => setIsOpen(false);
    if (isOpen) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [isOpen]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <div className='relative z-50' onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setIsOpen((v) => !v)}>{trigger}</button>
      {isOpen && (
        <div className='absolute top-[36px] right-0 min-w-[160px]'>
          <DropdownMenu
            items={dropdownItems}
            bottomSheetTitle={bottomSheetTitle}
            isMobile={isMobile}
            onClose={() => setIsOpen(false)}
            bottomButton={{
              label: '취소',
              onClick: () => setIsOpen(false),
            }}
          />
        </div>
      )}
    </div>
  );
}
