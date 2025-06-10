'use client';

import { SVGProps } from 'react';
import PlusSvg from '@/public/assets/icons/ico-plus.svg';

interface PlusIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function PlusIcon({ className = '', size = 18, ...props }: PlusIconProps) {
  return <PlusSvg className={className} width={size} height={size} {...props} />;
}
