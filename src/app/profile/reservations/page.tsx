'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import ReservationsCard from './components/ReservationsCard';
import DropdownMenu from '../../../components/common/dropdowns/dropdown-menu/DropdownMenu';

export default function ReservationsTestPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down');
  const triggerRef = useRef<HTMLButtonElement>(null);

  // const testData: any[] = [];

  const testData = [
    {
      label: '예약 완료',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
      showCancel: true,
    },
    {
      label: '예약 승인',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
    },
    {
      label: '예약 취소',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
    },
    {
      label: '예약 거절',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
    },
    {
      label: '체험 완료',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
      showReview: true,
    },
  ] as const;

  const toggleDropdown = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setOpenDirection(spaceBelow < 200 && spaceAbove > 200 ? 'up' : 'down');
    setIsOpen((prev) => !prev);
  };

  return (
    <main className='bg-gray-50 min-h-screen flex flex-col items-center pt-[4.4rem] lg:pt-[9.6rem]'>
      {/* 사이드바 추가 및 에러사항 없을 시에, 배경색 white로 */}
      <div className='w-full flex flex-col h-[calc(100vh-13.6rem)] lg:max-w-[72rem] lg:mx-auto lg:h-[113rem] lg:pt-[9.6rem]'>
        <div className='flex justify-end'>
          <div className='relative w-[18rem]'>
            <button
              ref={triggerRef}
              onClick={toggleDropdown}
              type='button'
              className='w-full h-[6.4rem] gap-[1rem] rounded-[1rem] border border-gray-200 bg-white hidden lg:inline-block'
            >
              <div className='w-full flex items-center justify-between px-[2rem] py-[0.8rem]'>
                <div className='flex flex-col items-start'>
                  <span className='text-xs font-regular text-gray-500'>체험 상태</span>
                  <span className='text-md font-regular text-gray-800'>예약 완료</span>
                </div>
                <svg
                  className={`w-[2.4rem] h-[2.4rem] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#A1A1A1'
                  strokeWidth='2.25'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polyline points='6 15 12 9 18 15' />
                </svg>
              </div>
            </button>

            <div className='flex mt-[0.8rem] justify-end hidden lg:block'>
              {isOpen && (
                <DropdownMenu
                  items={[
                    { type: 'button', label: '예약 완료', onClick: () => {} },
                    { type: 'button', label: '예약 승인', onClick: () => {} },
                    { type: 'button', label: '예약 취소', onClick: () => {} },
                    { type: 'button', label: '예약 거절', onClick: () => {} },
                    { type: 'button', label: '체험 완료', onClick: () => {} },
                  ]}
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  position='bottom'
                  isMobile={false}
                />
              )}
            </div>
          </div>
        </div>

        {testData.map((item, idx) => (
          <ReservationsCard key={idx} {...item} />
        ))}
      </div>
    </main>
  );
}
