'use client';

import { CSSProperties } from 'react';
import CalendarIcon from '@/src/components/common/icons/CalendarIcon';

interface CalendarButtonProps {
  onClick?: () => void;
  className?: string;
  size?: number;
  style?: CSSProperties;
}

export default function CalendarButton({
  onClick,
  className = '',
  size = 24,
  style,
  ...rest
}: CalendarButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type='button' onClick={onClick} className={className} style={style} {...rest}>
      <CalendarIcon width={size} height={size} className='text-gray-800 dark:text-gray-200' />
    </button>
  );
}
