'use client';

import { SVGProps } from 'react';
import KebabSvg from '@/public/assets/icons/ico-kebab-menu.svg';

interface KebabIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function KebobIcon({ className = '', size = 40, ...props }: KebabIconProps) {
  return <KebabSvg className={className} width={size} height={size} {...props} />;
}
