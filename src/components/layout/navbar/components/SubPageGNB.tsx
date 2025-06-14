import React, { ReactElement } from 'react';
import { useGnbStore } from '@/src/store/gnbStore';
import ArrowIcon from '@/src/components/common/icons/ArrowIcon';

export default function SubPageGNB() {
  const { backAction, title, subtitle, rightButtons } = useGnbStore();

  return (
    <nav className='fixed top-0 left-0 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-xs z-30'>
      <div className='flex justify-center gap-[24px] w-full h-[48px] p-[14px] px-[24px] items-center'>
        {Boolean(backAction || rightButtons.length) && (
          <div className='flex justify-start w-[60px]'>
            <ArrowIcon
              direction='left'
              className='w-[24px] h-[24px] text-gray-800 dark:text-gray-200'
              onClick={backAction || undefined}
              aria-label='뒤로가기'
            />
          </div>
        )}
        <div className='flex flex-col justify-center items-center flex-1 gap-[4px]'>
          <span className='text-md leading-none text-gray-800 dark:text-gray-200'>{title}</span>
          {subtitle && (
            <span className='text-xs leading-none text-gray-500 dark:text-gray-400'>
              {subtitle}
            </span>
          )}
        </div>
        {Boolean(backAction || rightButtons.length) && (
          <div className='flex justify-end items-center gap-[12px] w-[60px]'>
            {rightButtons.map((button, index) =>
              React.cloneElement(button as ReactElement, {
                key: `gnb-button-${index}`,
              })
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
