import { useState, useRef } from 'react';
import type { DropdownItemData } from '../../../../../types/dropdown-menu.types';
import DropdownMenu from '@/src/components/common/dropdowns/dropdown-menu/DropdownMenu';

// 나중에 수정할 예정
export default function Category() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down');

  const reservationStatusItems: DropdownItemData[] = [
    { type: 'button', label: '문화 · 예술', onClick: () => {} },
    { type: 'button', label: '식음료', onClick: () => {} },
    { type: 'button', label: '스포츠', onClick: () => {} },
    { type: 'button', label: '투어', onClick: () => {} },
    { type: 'button', label: '관광', onClick: () => {} },
    { type: 'button', label: '웰빙', onClick: () => {} },
  ];
  const toggleDropdown = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setOpenDirection(spaceBelow < 200 && spaceAbove > 200 ? 'up' : 'down');
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        type='button'
        className='w-full h-[64px] gap-[10px] rounded-[10px] border border-gray-200 bg-white hidden lg:inline-block'
      >
        <div className='w-full flex items-center justify-between px-[20px] py-[8px]'>
          <div className='flex flex-col items-start'>
            <span className='text-xs font-regular text-gray-500'>카테고리</span>
            <span className='text-md font-regular text-gray-800'>휴식</span>
          </div>
          <svg
            className={`w-[24px] h-[24px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            viewBox='0 0 24 24'
            fill='none'
            stroke='#A1A1A1'
            strokeWidth='2.25'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='6 15 12 9 18 15' />
          </svg>
        </div>
      </button>
      <div className='flex mt-[8px] justify-end hidden lg:block'>
        {isOpen && (
          <DropdownMenu
            items={reservationStatusItems}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            position='bottom'
            isMobile={false}
          />
        )}
      </div>
    </div>
  );
}
