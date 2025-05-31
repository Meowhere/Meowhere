'use client';

import { SVGProps } from 'react';
import StarSvg from '@/public/assets/icons/star/ico-star-bw.svg';

interface StarIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function StarIcon({ className = '', size = 18, ...props }: StarIconProps) {
  return <StarSvg className={className} width={size} height={size} {...props} />;
}
