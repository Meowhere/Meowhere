'use client';

import CalendarArrowLeftIcon from '@/src/components/common/icons/CalendarArrowLeftIcon';
import CalendarArrowRightIcon from '@/src/components/common/icons/CalendarArrowRightIcon';

interface ArrowButtonProps {
  onClick: () => void;
  direction: 'left' | 'right';
}

export default function CalendarArrowButton({ onClick, direction }: ArrowButtonProps) {
  return (
    <button onClick={onClick} className='p-2'>
      {direction === 'left' ? (
        <CalendarArrowLeftIcon className='w-[24px] h-[24px] text-gray-700' />
      ) : (
        <CalendarArrowRightIcon className='w-[24px] h-[24px] text-gray-700' />
      )}
    </button>
  );
}
