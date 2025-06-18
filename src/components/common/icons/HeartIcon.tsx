'use client';

import { SVGProps } from 'react';
import HeartBlack from '@/public/assets/icons/heart/ico-heart-bw.svg';
import HeartBlackFill from '@/public/assets/icons/heart/ico-heart-bw-fill.svg';

interface HeartIconProps extends SVGProps<SVGSVGElement> {
  isFilled: boolean;
  className?: string;
  onClick?: () => void;
}

export default function HeartIcon({ isFilled, className = '', onClick, ...props }: HeartIconProps) {
  const IconComponent = isFilled ? HeartBlackFill : HeartBlack;

  return (
    <IconComponent
      {...props}
      onClick={onClick}
      className={className}
      aria-label={isFilled ? '찜 취소' : '찜하기'}
    />
  );
}
