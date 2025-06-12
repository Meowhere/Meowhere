'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useMyReservations } from '@/src/hooks/useMyReservations';
import { MY_RESERVATION_STATUS_MAP } from '@/src/constants/my-reservation-status';
import { MyReservationStatus } from '@/src/types/profile-reservation.types';
import { DropdownItemButton } from '@/src/types/dropdown-menu.types';

import Dropdown from '@/src/components/common/dropdowns/Dropdown';
import ReservationsCard from './components/ReservationsCard';

export default function ReservationsTestPage() {
  const [selectedStatus, setSelectedStatus] = useState<MyReservationStatus>('all');
  const { reservations, cursorId, totalCount, isLoading } = useMyReservations(selectedStatus);

  // 드롭다운 메뉴 아이템 데이터
  const reservationStatusItems: DropdownItemButton[] = [
    {
      label: '모든 예약',
      onClick: () => {
        setSelectedStatus('all');
      },
    },
    {
      label: '예약 완료',
      onClick: () => {
        setSelectedStatus('pending');
      },
    },
    {
      label: '예약 승인',
      onClick: () => {
        setSelectedStatus('confirmed');
      },
    },
    {
      label: '예약 취소',
      onClick: () => {
        setSelectedStatus('canceled');
      },
    },
    {
      label: '예약 거절',
      onClick: () => {
        setSelectedStatus('declined');
      },
    },
    {
      label: '체험 완료',
      onClick: () => {
        setSelectedStatus('completed');
      },
    },
  ];

  return (
    <main className='bg-gray-50 min-h-screen flex flex-col items-center pt-[44px] lg:pt-[96px]'>
      {/* 사이드바 추가 및 에러사항 없을 시에, 배경색 white로 */}
      <div className='w-full flex flex-col h-[calc(100vh-136px)] lg:max-w-[720px] lg:mx-auto lg:h-[1130px] lg:pt-[96px]'>
        <div className='hidden lg:flex lg:justify-end'>
          <div className='w-[180px]'>
            <Dropdown
              dropdownItems={reservationStatusItems}
              triggerLabel='체험 상태'
              selectedValue={MY_RESERVATION_STATUS_MAP[selectedStatus].label}
              bottomSheetTitle='체험 상태'
            />
          </div>
        </div>

        {reservations && reservations.length ? (
          <div className='flex flex-col gap-[16px] mt-[24px]'>
            {reservations.map((reservation) => (
              <ReservationsCard
                key={reservation.id}
                reservation={reservation}
                showCancel={reservation.status === 'pending'}
                showReview={reservation.status === 'completed'}
              />
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
            <p className='text-md text-gray-500 mt-[24px]'>
              {MY_RESERVATION_STATUS_MAP[selectedStatus].label}한 체험이 없다냥
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
