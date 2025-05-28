'use client';

import { useState, MouseEventHandler } from 'react';

type ArrowButtonProps = {
  direction?: 'left' | 'right' | 'down';
  isOpen?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export default function ArrowButton({
  direction = 'left',
  isOpen = false,
  onClick,
  className,
}: ArrowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hasHoverEffect = direction === 'left' || direction === 'right';

  const getArrowIconSrc = () => {
    const basePath = '/assets/icons/arrow/';

    switch (direction) {
      case 'right':
        return isHovered
          ? `${basePath}btn-arrow-right-active.svg`
          : `${basePath}btn-arrow-right.svg`;
      case 'down':
        return `${basePath}btn-arrow-down.svg`;
      case 'left':
      default:
        return isHovered
          ? `${basePath}btn-arrow-left-active.svg`
          : `${basePath}btn-arrow-left.svg`;
    }
  };

  const getRotationClass =
    direction === 'down' && isOpen ? 'rotate-180' : 'rotate-0';

  const handleMouseEnter = () => {
    if (hasHoverEffect) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasHoverEffect) {
      setIsHovered(false);
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${direction} 화살표 버튼`}
      className={`p-2 transition-transform ${className}`}
    >
      <img
        src={getArrowIconSrc()}
        alt={`${direction} 화살표 아이콘`}
        className={`w-6 h-6 transition-transform duration-200 ${getRotationClass}`}
      />
    </button>
  );
}
