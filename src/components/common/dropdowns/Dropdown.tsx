'use client';

import { useEffect, useState } from 'react';
import DropdownMenu from './DropdownMenu';
import DropdownTrigger from './DropdownTrigger';
import { DropdownProps } from '@/src/types/dropdown.types';

export default function Dropdown({ dropdownItems, triggerLabel, selectedValue }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 메뉴 이외의 곳 클릭 시, trigger 닫히게 하는 로직
  useEffect(() => {
    const handleClick = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  return (
    <div className='relative w-full'>
      <div
        onClick={(e) => {
          e.stopPropagation(); // 내부 클릭일 경우 전파 차단
        }}
      >
        <DropdownTrigger
          label={triggerLabel}
          text={selectedValue}
          isOpen={isOpen}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        />
        <div className='w-full absolute top-[70px] left-0 hidden lg:block'>
          {isOpen && (
            <DropdownMenu items={dropdownItems} onClose={() => setIsOpen(false)} isMobile={false} />
          )}
        </div>
        <div className='w-full absolute top-[70px] left-0 lg:hidden'>
          {isOpen && (
            <DropdownMenu
              items={dropdownItems}
              onClose={() => setIsOpen(false)}
              bottomButton={{
                label: '취소',
                onClick: () => setIsOpen(false),
              }}
              isMobile
            />
          )}
        </div>
      </div>
    </div>
  );
}
