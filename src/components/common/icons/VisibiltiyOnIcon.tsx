'use client';

import { SVGProps } from 'react';
import VisibilityOnSvg from '@/public/assets/icons/ico-visibility-on.svg';

interface VisibilityOnIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function VisibilityOnIcon({
  className = '',
  size = 24,
  ...props
}: VisibilityOnIconProps) {
  return <VisibilityOnSvg className={className} width={size} height={size} {...props} />;
}
