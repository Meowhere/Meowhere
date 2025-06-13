'use client';

import { SVGProps } from 'react';
import CalendarArrowRightSvg from '@/public/assets/icons/calendar/ico-carendar-arrow-right.svg';

interface CalendarArrowRightIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function CalendarArrowRightIcon({
  className = '',
  size = 18,
  ...props
}: CalendarArrowRightIconProps) {
  return <CalendarArrowRightSvg className={className} width={size} height={size} {...props} />;
}
