'use client';

import { SVGProps } from 'react';
import DeleteSvg from '@/public/assets/icons/delete/ico-delete.svg';

interface CloseIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: string;
  className?: string;
}

export default function CloseIcon({
  className = '',
  size = 24,
  stroke = 'currentColor',
  ...props
}: CloseIconProps) {
  return <DeleteSvg className={className} width={size} height={size} stroke={stroke} {...props} />;
}
