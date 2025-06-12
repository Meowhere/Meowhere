'use client';

import { SVGProps } from 'react';
import CalendarSvg from '@/public/assets/icons/ico-calendar.svg';

interface CalendarIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function CalendarIcon({ className = '', size = 18, ...props }: CalendarIconProps) {
  return <CalendarSvg className={className} width={size} height={size} {...props} />;
}
