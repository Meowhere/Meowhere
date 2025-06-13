'use client';

import { SVGProps } from 'react';
import ToastCheckSvg from '@/public/assets/icons/toast-check.svg';

interface CheckCircleIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export default function CheckCircleIcon({
  className = '',
  size = 24,
  ...props
}: CheckCircleIconProps) {
  return <ToastCheckSvg className={className} width={size} height={size} {...props} />;
}
