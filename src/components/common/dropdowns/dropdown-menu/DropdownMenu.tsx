'use client';

import DropdownItem from '../dropdown-item/DropdownItem';
import {
  DropdownMenuProps,
  DropdownItemButton,
  DropdownItemData,
} from '../../../../types/dropdown-menu.types';
import { useState, useEffect } from 'react';

export default function DropdownMenu({
  items,
  isMobile = false,
  title,
  bottomButton,
  isOpen,
  onClose,
  position = 'bottom',
}: DropdownMenuProps & { isOpen?: boolean; onClose?: () => void; position?: 'bottom' | 'top' }) {
  const mobileShadow = 'shadow-[0_0.4rem_4rem_rgba(0,0,0,0.1)] backdrop-blur-[4rem]';
  const desktopShadow = 'shadow-[0_0_2rem_rgba(0,0,0,0.05)]';

  const wrapperClass = `
    w-full rounded-[1.2rem] overflow-hidden bg-white border border-gray-100
    ${mobileShadow}
  `;

  if (isMobile) {
    return (
      <>
        {isOpen && <div className='fixed inset-0 z-30 bg-black/40' onClick={onClose} />}
        <div className='fixed inset-x-0 bottom-0 z-40 px-[1.6rem] pb-[2rem]'>
          <div className='w-full flex flex-col gap-[0.8rem]' onClick={(e) => e.stopPropagation()}>
            <div className={wrapperClass}>
              {title && (
                <div className='text-center text-xs text-gray-600 leading-[1.2rem] h-[3.6rem] flex items-center justify-center border-b border-gray-100'>
                  {title}
                </div>
              )}
              <div className='divide-y divide-gray-100'>
                {items.map((item, idx) => (
                  <DropdownItem key={idx} {...item} isMobile isDanger={item.isDanger} />
                ))}
              </div>
            </div>
            {bottomButton && (
              <div className={wrapperClass}>
                <DropdownItem {...bottomButton} isMobile isDanger={bottomButton.isDanger} />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // NotMobile
  return (
    <>
      {isOpen && (
        <div
          className={`
        rounded-[1.2rem] border border-gray-100 bg-white overflow-hidden min-w-[16rem] absolute top-[72px]
        ${desktopShadow}
        ${isOpen ? 'animate-fade-down animate-duration-900 animate-ease-in-out' : ''}
          `}
        >
          {items.map((item, idx) => (
            <DropdownItem key={idx} {...item} isDanger={item.isDanger} />
          ))}
        </div>
      )}
    </>
  );
}
