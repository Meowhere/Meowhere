'use client';

import { SVGProps } from 'react';
import CheckSvg from '@/public/assets/icons/ico-check.svg';

interface CheckIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: string;
  className?: string;
}

export default function CheckIcon({
  className = '',
  size = 24,
  stroke = 'currentColor',
  ...props
}: CheckIconProps) {
  return <CheckSvg className={className} width={size} height={size} stroke={stroke} {...props} />;
}
