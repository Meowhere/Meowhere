'use client';

import HeartIcon from '../icons/HeartIcon';

interface HeartButtonProps {
  isLiked: boolean;
  onToggle: () => void;
  variant?: 'white' | 'black';
  size?: number;
  className?: string;
}

export default function HeartButton({
  isLiked,
  onToggle,
  variant = 'white',
  size = 24,
  className = '',
  ...rest
}: HeartButtonProps) {
  return (
    <button
      type='button'
      onClick={onToggle}
      aria-label={isLiked ? '찜 취소' : '찜하기'}
      className={`bg-transparent p-0 ${className}`}
      {...rest}
    >
      <HeartIcon isLiked={isLiked} variant={variant} className='w-6 h-6' />
    </button>
  );
}
