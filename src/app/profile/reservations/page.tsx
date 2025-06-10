'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import ReservationsCard from './components/ReservationsCard';
import type { DropdownItemButton } from '../../../types/dropdown-menu.types';
import Dropdown from '@/src/components/common/dropdowns/Dropdown';

export default function ReservationsTestPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [selectedStatus, setSelectedStatus] = useState('예약 완료');

  const handleDropdownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle dropdown change if needed
    setSelectedStatus(event.target.value);
    console.log('Dropdown changed:', event.target.value);
  };

  const reservationStatusItems: DropdownItemButton[] = [
    {
      type: 'button',
      label: '예약 완료',
      onClick: () => {
        setSelectedStatus('예약 완료');
      },
    },
    {
      type: 'button',
      label: '예약 승인',
      onClick: () => {
        setSelectedStatus('예약 승인');
      },
    },
    {
      type: 'button',
      label: '예약 취소',
      onClick: () => {
        setSelectedStatus('예약 취소');
      },
    },
    {
      type: 'button',
      label: '예약 거절',
      onClick: () => {
        setSelectedStatus('예약 거절');
      },
    },
    {
      type: 'button',
      label: '체험 완료',
      onClick: () => {
        setSelectedStatus('체험 완료');
      },
    },
  ];

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

  const hasData = testData.length > 0;

  return (
    <main className='bg-gray-50 min-h-screen flex flex-col items-center pt-[44px] lg:pt-[96px]'>
      {/* 사이드바 추가 및 에러사항 없을 시에, 배경색 white로 */}
      <div className='w-full flex flex-col h-[calc(100vh-136px)] lg:max-w-[720px] lg:mx-auto lg:h-[1130px] lg:pt-[96px]'>
        {hasData && (
          <div className='flex justify-end'>
            <div className='w-[180px]'>
              <Dropdown
                dropdownItems={reservationStatusItems}
                triggerLabel='체험 상태'
                selectedValue={selectedStatus}
              />
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
