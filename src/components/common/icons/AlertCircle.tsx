'use client';

import { SVGProps } from 'react';
import ToastCancelSvg from '@/public/assets/icons/toast-cancel.svg';

interface AlertCircleIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function AlertCircleIcon({
  className = '',
  size = 24,
  ...props
}: AlertCircleIconProps) {
  return <ToastCancelSvg className={className} width={size} height={size} {...props} />;
}
