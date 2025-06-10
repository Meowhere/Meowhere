'use client';

import { useRef } from 'react';

interface DropdownTriggerProps {
  label: string;
  text: string;
  isOpen: boolean;
  onClick: (el: HTMLButtonElement | null) => void;
}

export default function DropdownTrigger({ label, text, isOpen, onClick }: DropdownTriggerProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    onClick(triggerRef.current);
  };

  return (
    <div className='flex justify-end'>
      <div className='relative w-[180px]'>
        <button
          ref={triggerRef}
          onClick={handleClick}
          type='button'
          className='w-full h-[64px] gap-[10px] rounded-[10px] border border-gray-200 bg-white hidden lg:inline-block'
        >
          <div className='w-full flex items-center justify-between px-[20px] py-[8px]'>
            <div className='flex flex-col items-start'>
              <span className='text-xs font-regular text-gray-500'>{label}</span>
              <span className='text-md font-regular text-gray-800'>{text}</span>
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
      </div>
    </div>
  );
}
