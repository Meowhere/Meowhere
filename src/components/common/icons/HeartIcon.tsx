'use client';

import { SVGProps } from 'react';
import HeartWhite from '@/public/assets/icons/heart/ico-heart.svg';
import HeartWhiteFill from '@/public/assets/icons/heart/ico-heart-fill.svg';
import HeartBlack from '@/public/assets/icons/heart/ico-heart-bw.svg';
import HeartBlackFill from '@/public/assets/icons/heart/ico-heart-bw-fill.svg';

interface HeartIconProps extends SVGProps<SVGSVGElement> {
  isLiked: boolean;
  variant: 'white' | 'black';
}

export default function HeartIcon({ isLiked, variant, ...props }: HeartIconProps) {
  const IconComponent = isLiked
    ? variant === 'black'
      ? HeartBlackFill
      : HeartWhiteFill
    : variant === 'black'
      ? HeartBlack
      : HeartWhite;
  return <IconComponent {...props} />;
}
