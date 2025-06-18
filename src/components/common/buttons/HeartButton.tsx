// components/common/buttons/HeartButton.tsx
'use client';

import HeartIcon from '../icons/HeartIcon';

interface HeartButtonProps {
  isLiked: boolean;
  onToggle: () => void;
  className?: string;
}

export default function HeartButton({ isLiked, onToggle, className = '' }: HeartButtonProps) {
  return (
    <button
      type='button'
      aria-label={isLiked ? '찜 취소' : '찜하기'}
      onClick={onToggle}
      className={`p-0 bg-transparent border-none appearance-none ${className}`}
    >
      <HeartIcon isFilled={isLiked} className='w-full h-full' />
    </button>
  );
}
