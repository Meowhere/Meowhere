'use client';

import { SVGProps } from 'react';
import ShareSvg from '@/public/assets/icons/ico-share.svg';

interface ShareIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function ShareIcon({ className = '', size = 40, ...props }: ShareIconProps) {
  return <ShareSvg className={className} width={size} height={size} {...props} />;
}
