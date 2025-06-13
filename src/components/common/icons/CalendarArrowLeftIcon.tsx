'use client';

import { SVGProps } from 'react';
import CalendarArrowLeftSvg from '@/public/assets/icons/calendar/ico-carendar-arrow-left.svg';

interface CalendarArrowLeftIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function CalendarArrowLeftIcon({
  className = '',
  size = 18,
  ...props
}: CalendarArrowLeftIconProps) {
  return <CalendarArrowLeftSvg className={className} width={size} height={size} {...props} />;
}
