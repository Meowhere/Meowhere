'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReservationsCard from './components/ReservationsCard';
import type { DropdownItemButton } from '../../../types/dropdown-menu.types';
import Dropdown from '@/src/components/common/dropdowns/Dropdown';
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
  const [selectedStatus, setSelectedStatus] = useState('예약 완료');

  // 드롭다운 메뉴 아이템 데이터
  const reservationStatusItems: DropdownItemButton[] = [
    {
      label: '예약 완료',
      onClick: () => {
        setSelectedStatus('예약 완료');
      },
    },
    {
      label: '예약 승인',
      onClick: () => {
        setSelectedStatus('예약 승인');
      },
    },
    {
      label: '예약 취소',
      onClick: () => {
        setSelectedStatus('예약 취소');
      },
    },
    {
      label: '예약 거절',
      onClick: () => {
        setSelectedStatus('예약 거절');
      },
    },
    {
      label: '체험 완료',
      onClick: () => {
        setSelectedStatus('체험 완료');
      },
    },
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
