'use client';

import { SVGProps } from 'react';
import VisibilityOffSvg from '@/public/assets/icons/ico-visibility-off.svg';

interface VisibilityOffIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function VisibilityOffIcon({
  className = '',
  size = 24,
  ...props
}: VisibilityOffIconProps) {
  return <VisibilityOffSvg className={className} width={size} height={size} {...props} />;
}
