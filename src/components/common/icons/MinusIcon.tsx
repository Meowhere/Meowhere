'use client';

import { SVGProps } from 'react';
import MinusSvg from '@/public/assets/icons/counter/ico-minus.svg';

interface MinusIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function MinusIcon({ className = '', size = 18, ...props }: MinusIconProps) {
  return <MinusSvg className={className} width={size} height={size} {...props} />;
}
