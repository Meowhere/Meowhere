'use client';

import { SVGProps } from 'react';
import LeftIcon from '@/public/assets/icons/arrow/btn-arrow-left.svg';
import RightIcon from '@/public/assets/icons/arrow/btn-arrow-right.svg';
import DownIcon from '@/public/assets/icons/arrow/btn-arrow-down.svg';

type Direction = 'left' | 'right' | 'down';

const ICONS = {
  left: LeftIcon,
  right: RightIcon,
  down: DownIcon,
};

interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  direction: Direction;
  className?: string;
}

export default function ArrowIcon({ direction, className = '', ...rest }: ArrowIconProps) {
  const IconComponent = ICONS[direction];
  return <IconComponent className={className} {...rest} />;
}
