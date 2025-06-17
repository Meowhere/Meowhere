'use client';

import { CSSProperties } from 'react';
import StarIcon from '../icons/StarIcon';
import StarFillIcon from '../icons/StarFillIcon';

interface StarButtonProps {
  filled: boolean;
  onClick: () => void;
  className?: string;
  size?: number;
  style?: CSSProperties;
}

export default function StarButton({
  filled,
  onClick,
  className = '',
  size = 24,
  style,
  ...rest
}: StarButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={filled ? '별점 있음' : '별점 없음'}
      className={`w-6 h-6 ${className}`}
      style={style}
      {...rest}
    >
      <div className='w-full h-full cursor-pointer'>
        {filled ? (
          <StarFillIcon size={size} className='w-full h-full text-yellow-200' />
        ) : (
          <StarIcon size={size} className='w-full h-full text-gray-400' />
        )}
      </div>
    </button>
  );
}
