'use client';

import MinusIcon from '@/src/components/common/icons/MinusIcon';
import PlusIcon from '@/src/components/common/icons/PlusIcon';

interface CounterButtonProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export default function CounterButton({
  count,
  onIncrease,
  onDecrease,
  min = 1,
  max = 10,
}: CounterButtonProps) {
  const isMinusDisabled = count <= min;
  const isPlusDisabled = count >= max;

  return (
    <div className='flex items-center gap-[18px]'>
      <button
        onClick={onDecrease}
        disabled={isMinusDisabled}
        className='disabled:cursor-not-allowed'
      >
        <MinusIcon
          className={isMinusDisabled ? 'text-gray-300' : 'text-gray-600'}
          width={18}
          height={18}
          fill='currentColor'
        />
      </button>
      <span className='text-gray-800 text-md font-regular'>{count}</span>
      <button
        onClick={onIncrease}
        disabled={isPlusDisabled}
        className='disabled:cursor-not-allowed'
      >
        <PlusIcon
          className={isPlusDisabled ? 'text-gray-300' : 'text-gray-600'}
          width={18}
          height={18}
          fill='currentColor'
        />
      </button>
    </div>
  );
}
