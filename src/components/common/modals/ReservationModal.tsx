'use client';

import { useConfirmModal } from '@/src/hooks/useConfirmModal';
import BaseButton from '../buttons/BaseButton';
import { useState } from 'react';

interface ReservationModalProps {
  activityId: number;
  date: string;
}

interface ReservedScheduleByDay {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

// 모달 열림 -> activityId, date를 이용해 시간대별로 예약 내역 배열 형태로 조회 -> 받아온 데이터에서 scheduleId를 이용하여 해당 시간대에 어떤 사람들이 예약을 했는지 조회
export default function ReservationModal({ activityId, date }: ReservationModalProps) {
  const { openConfirmModal, ConfirmModal } = useConfirmModal();
  const [] = useState();
  const reservationStatusCategory = [
    '모든 예약',
    '예약 신청',
    '예약 승인',
    '예약 거절',
    '체험 완료',
  ];

  const dummyData: ReservedScheduleByDay[] = [
    {
      scheduleId: 0,
      startTime: '11:00',
      endTime: '13:00',
      count: {
        declined: 1,
        confirmed: 3,
        pending: 2,
      },
    },
    {
      scheduleId: 1,
      startTime: '13:00',
      endTime: '15:00',
      count: {
        declined: 2,
        confirmed: 1,
        pending: 4,
      },
    },
  ];

  const handleDecline = (): void => {
    openConfirmModal({
      message: '예약을 거절할까요?',
      confirmText: '거절',
      cancelText: '아니요',
      onConfirm: () => {
        console.log('거절!');
      },
    });
  };

  const handleApprove = (): void => {
    openConfirmModal({
      message: '예약을 승인할까요?',
      confirmText: '승인',
      cancelText: '아니요',
      onConfirm: () => {
        console.log('승인!');
      },
    });
  };

  return (
    <div>
      <div className='flex items-center gap-[6px]'>
        {reservationStatusCategory.map((status) => (
          <div
            className='py-[10px] px-[14px] border border-gray-200 rounded-[20px] text-gray-600 font-semibold text-[1.3rem] leading-[1.2rem]'
            key={status}
          >
            {status}
          </div>
        ))}
      </div>
      <div>
        <div>
          <div>{}</div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div>
            <div></div>
            <div></div>
          </div>
          <div></div>
        </div>
      </div>
      <div className='flex gap-[8px]'>
        <BaseButton variant='soft' color='red' onClick={handleDecline}>
          거절
        </BaseButton>
        <BaseButton variant='soft' color='blue' onClick={handleApprove}>
          승인
        </BaseButton>
      </div>
      <ConfirmModal />
    </div>
  );
}
