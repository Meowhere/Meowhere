'use client';

import { SVGProps } from 'react';
import StarFillSvg from '@/public/assets/icons/star/ico-star-bw-fill.svg';

interface StarFillIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function StarFillIcon({ className = '', size = 18, ...props }: StarFillIconProps) {
  return <StarFillSvg className={className} width={size} height={size} {...props} />;
}
