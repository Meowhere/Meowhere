'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ReservationsCard from './components/ReservationsCard';
import DropdownMenu from '../../../components/common/dropdowns/dropdown-menu/DropdownMenu';
import type { DropdownItemData } from '../../../types/dropdown-menu.types';
import { ReservationStatus } from '@/src/types/reservations-status.types';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';

interface testDataInterface {
  label: ReservationStatus;
  imageUrl: string;
  title: string;
  date: string;
  time: string;
  headCount: number;
  price: number;
  showCancel?: boolean;
  showReview?: boolean;
}

export default function ReservationsTestPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down');
  const triggerRef = useRef<HTMLButtonElement>(null);

  const reservationStatusItems: DropdownItemData[] = [
    { type: 'button', label: '예약 완료', onClick: () => {} },
    { type: 'button', label: '예약 승인', onClick: () => {} },
    { type: 'button', label: '예약 취소', onClick: () => {} },
    { type: 'button', label: '예약 거절', onClick: () => {} },
    { type: 'button', label: '체험 완료', onClick: () => {} },
  ];

  // const testData: any[] = [];

  const testData: testDataInterface[] = [
    {
      label: 'pending',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
      showCancel: true,
    },
    {
      label: 'confirmed',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
    },
    {
      label: 'canceled',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
    },
    {
      label: 'declined',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
    },
    {
      label: 'completed',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
      showReview: true,
    },
  ];

  const toggleDropdown = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setOpenDirection(spaceBelow < 200 && spaceAbove > 200 ? 'up' : 'down');
    setIsOpen((prev) => !prev);
  };

  const hasData = testData.length > 0;

  const getReservations = async () => {
    const res = await fetchFromClient('/my-reservations');
    console.log(res);
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <main className='bg-gray-50 min-h-screen flex flex-col items-center pt-[44px] lg:pt-[96px]'>
      {/* 사이드바 추가 및 에러사항 없을 시에, 배경색 white로 */}
      <div className='w-full flex flex-col h-[calc(100vh-136px)] lg:max-w-[720px] lg:mx-auto lg:h-[1130px] lg:pt-[96px]'>
        {hasData && (
          <div className='flex justify-end'>
            <div className='relative w-[180px]'>
              <button
                ref={triggerRef}
                onClick={toggleDropdown}
                type='button'
                className='w-full h-[64px] gap-[10px] rounded-[10px] border border-gray-200 bg-white hidden lg:inline-block'
              >
                <div className='w-full flex items-center justify-between px-[20px] py-[8px]'>
                  <div className='flex flex-col items-start'>
                    <span className='text-xs font-regular text-gray-500'>체험 상태</span>
                    <span className='text-md font-regular text-gray-800'>예약 완료</span>
                  </div>
                  <svg
                    className={`w-[24px] h-[24px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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

              <div className='flex mt-[8px] justify-end hidden lg:block'>
                {isOpen && (
                  <DropdownMenu
                    items={reservationStatusItems}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    position='bottom'
                    isMobile={false}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {hasData ? (
          <div className='flex flex-col gap-[16px] mt-[24px]'>
            {testData.map((item, idx) => (
              <ReservationsCard key={idx} {...item} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-full'>
            <Image
              src='/assets/icons/logo/ico-empty-view-logo.svg'
              alt='빈 상태 이미지'
              width={82}
              height={123}
            />
            <p className='text-md text-gray-500 mt-[24px]'>예약한 체험이 없다냥</p>
          </div>
        )}
      </div>
    </main>
  );
}
