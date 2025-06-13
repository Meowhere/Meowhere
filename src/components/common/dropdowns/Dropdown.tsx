'use client';

import { useEffect, useState } from 'react';
import DropdownMenu from './DropdownMenu';
import DropdownTrigger from './DropdownTrigger';
import { DropdownProps } from '@/src/types/dropdown.types';

export default function Dropdown({
  dropdownItems,
  selectedValue,
  bottomSheetTitle,
  trigger,
  triggerLabel,
}: DropdownProps) {
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
        {trigger ? (
          <button onClick={() => setIsOpen((prev) => !prev)}>{trigger}</button>
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
