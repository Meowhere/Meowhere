'use client';
import { SVGProps } from 'react';
import FilterSvg from '@/public/assets/icons/ico-filter.svg';

interface SortIconProps extends SVGProps<SVGAElement> {
  size?: number;
  className?: string;
}
export default function FilterIcon({ className = '', size = 24, ...props }: SortIconProps) {
  return <FilterSvg className={className} />;
}
