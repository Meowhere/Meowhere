'use client';

import React, { useEffect, useRef, useState } from 'react';

import { DropdownItemButton } from '@/src/types/dropdown.types';

import DropdownMenu from './DropdownMenu';
import DropdownTrigger from './DropdownTrigger';

export default function Dropdown({
  dropdownItems,
  selectedValue,
  bottomSheetTitle,
  trigger,
  triggerLabel,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 메뉴 이외의 곳 클릭 시, trigger 닫히게 하는 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='relative w-full' ref={dropdownRef}>
      <div className='w-full'>
        {trigger ? (
          <button
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            {trigger}
          </button>
        ) : (
          <DropdownTrigger
            label={triggerLabel ? triggerLabel : ''}
            text={selectedValue}
            isOpen={isOpen}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          />
        )}
        <div className='w-full absolute top-[70px] left-0'>
          {isOpen && (
            <DropdownMenu
              items={dropdownItems}
              bottomSheetTitle={bottomSheetTitle}
              isMobile={typeof window !== 'undefined' && window.innerWidth < 1024}
              onClose={() => setIsOpen(false)}
              bottomButton={{
                label: '취소',
                onClick: () => setIsOpen(false),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export interface DropdownProps {
  dropdownItems: DropdownItemButton[];
  selectedValue: string;
  bottomSheetTitle: string;
  trigger?: React.ReactNode;
  triggerLabel?: string;
}
