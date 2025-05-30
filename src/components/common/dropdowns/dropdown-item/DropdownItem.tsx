'use client';

import Link from 'next/link';
import {
  DropdownItemProps,
  LinkItemProps,
  ButtonItemProps,
} from '../../../../types/dropdown-item.types';

export default function DropdownItem({
  type,
  label,
  isMobile = false,
  isDanger = false,
  disabled = false,
  ...restProps
}: DropdownItemProps) {
  const fontSizeClass = isMobile ? 'text-lg' : 'text-md';
  const textColor = isDanger ? 'text-red-300' : 'text-gray-700';
  const radiusClass = isMobile ? 'group-hover:rounded-[0.7rem]' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const commonClassNames = `
    w-full
    ${isMobile ? 'h-full group-hover:h-[4.6rem]' : 'h-[4.6rem]'}
    py-[1rem]
    hover:bg-gray-100
    ${radiusClass}
    ${fontSizeClass} ${textColor}
    transition-all duration-150
    flex items-center justify-center
    select-none
    ${disabledClass}
  `;

  switch (type) {
    case 'link':
      const { href } = restProps as LinkItemProps;
      return (
        <div
          className={
            isMobile ? 'w-full h-[5.4rem] p-[0.4rem] bg-white group' : ''
          }
        >
          <Link href={href} className={commonClassNames}>
            {label}
          </Link>
        </div>
      );
    case 'button':
      const { onClick } = restProps as ButtonItemProps;
      return (
        <div
          className={
            isMobile ? 'w-full h-[5.4rem] p-[0.4rem] bg-white group' : ''
          }
        >
          <button
            type='button'
            onClick={onClick}
            disabled={disabled}
            className={commonClassNames}
          >
            {label}
          </button>
        </div>
      );
    default:
      return null;
  }
}
