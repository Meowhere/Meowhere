'use client';
import { SVGProps } from 'react';
import FilterSvg from '@/public/assets/icons/ico-filter.svg';
import FilteredSvg from '@/public/assets/icons/ico-filtered.svg';

interface SortIconProps extends SVGProps<SVGAElement> {
  size?: number;
  className?: string;
}
export function SortIcon({ className = '', size = 24, ...props }: SortIconProps) {
  return <FilterSvg fill='currentColor' className={className} width={size} height={size} />;
}

export function SortedIcon({ className = '', size = 24, ...props }: SortIconProps) {
  return <FilteredSvg fill='currentColor' className={className} width={size} height={size} />;
}
