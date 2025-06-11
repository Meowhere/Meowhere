'use client';

import { SVGProps } from 'react';
import CheckedSvg from '@/public/assets/icons/ico-checked.svg';

interface CheckedIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: string;
  className?: string;
}

export default function CheckedIcon({
  className = '',
  size = 24,
  stroke = 'currentColor',
  ...props
}: CheckedIconProps) {
  return <CheckedSvg className={className} width={size} height={size} stroke={stroke} {...props} />;
}
