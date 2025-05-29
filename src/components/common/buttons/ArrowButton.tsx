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
    const hoverDirections = ['left', 'right'] as const;
    type HoverDirection = (typeof hoverDirections)[number];

    const isHoverDirection = (dir: string): dir is HoverDirection =>
      hoverDirections.includes(dir as HoverDirection);

    const fileName =
      isHoverDirection(direction) && isHovered
        ? `btn-arrow-${direction}-active.svg`
        : `btn-arrow-${direction}.svg`;

    return `${basePath}${fileName}`;
  };

  const getRotationClass =
    direction === 'down' && isOpen ? 'rotate-180' : 'rotate-0';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => hasHoverEffect && setIsHovered(true)}
      onMouseLeave={() => hasHoverEffect && setIsHovered(false)}
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
