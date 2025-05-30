'use client';

import { useState, MouseEventHandler } from 'react';
import ArrowIcon from '../icons/ArrowIcon';

interface ArrowButtonProps {
  direction?: 'left' | 'right' | 'down';
  isOpen?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function ArrowButton({
  direction = 'left',
  isOpen = false,
  onClick,
  className = '',
  ...rest
}: ArrowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasHoverEffect = direction === 'left' || direction === 'right';

  const getRotationClass = direction === 'down' && isOpen ? 'rotate-180' : 'rotate-0';

  return (
    <button
      type='button'
      onClick={onClick}
      onMouseEnter={() => hasHoverEffect && setIsHovered(true)}
      onMouseLeave={() => hasHoverEffect && setIsHovered(false)}
      aria-label={`${direction} 화살표 버튼`}
      className={`p-2 transition-transform duration-200 ${getRotationClass}`}
      {...rest}
    >
      <ArrowIcon
        direction={direction}
        className={isHovered ? 'text-[#4B4B4B]' : 'text-[#A1A1A1]'}
      />
    </button>
  );
}
