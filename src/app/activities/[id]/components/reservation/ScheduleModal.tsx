'use client';

import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useState } from 'react';
import CounterButton from '../common/CounterButton';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useConfirmModal } from '@/src/hooks/useConfirmModal';
import { useModal } from '@/src/hooks/useModal';
import { useRouter } from 'next/navigation';
import ScheduleList from './ScheduleList';
import { Schedule } from '@/src/types/schedule.types';

export interface ScheduleModalProps {
  price: number;
  schedules: Schedule[];
}

export default function ScheduleModal({ price, schedules }: ScheduleModalProps) {
  const [count, setCount] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState<{ id: number; date: string } | null>(
    null
  );
  const { openConfirmModal, ConfirmModal } = useConfirmModal();
  const { closeModal } = useModal();
  const router = useRouter();

  const handleScheduleSelect = (id: number, date: string) => {
    setSelectedSchedule({ id, date });
  };

  const handleReserve = async () => {
    if (!selectedSchedule) {
      alert('예약할 날짜를 선택해주세요.');
      return;
    }

    try {
      // API 요청 데이터 준비
      const reservationData = {
        scheduleId: selectedSchedule.id,
        date: selectedSchedule.date,
        headCount: count,
        totalPrice: price * count,
      };

      // TODO: API 연동 시 아래 주석을 해제하고 사용
      /*
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('예약 처리 중 오류가 발생했습니다.');
      }
      */

      openConfirmModal({
        message: '예약이 완료되었습니다.',
        confirmText: '확인',
        onConfirm: () => {
          // TODO: API 연동 시 아래 주석을 해제하고 사용
          // router.push('/reservations');
          console.log('예약 데이터:', reservationData);
          closeModal();
        },
      });
    } catch (error) {
      alert('예약 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className='flex max-h-[80vh] flex-col gap-[24px] overflow-y-scroll scrollbar-hide p-[12px] pb-[120px]'>
        <div className='flex flex-col gap-[24px]'>
          <p className='text-[2.2rem] font-semibold text-gray-800'>인원</p>
          <div className='flex items-center justify-between'>
            <span>{count}명</span>
            <CounterButton
              count={count}
              onIncrease={() => setCount((prev) => Math.min(prev + 1, 10))}
              onDecrease={() => setCount((prev) => Math.max(prev - 1, 1))}
              min={1}
              max={10}
            />
          </div>
        </div>

        <ScheduleList
          schedules={schedules}
          selectedSchedule={selectedSchedule}
          onScheduleSelect={handleScheduleSelect}
          price={price}
        />
      </div>

      <div className='fixed bottom-0 left-0 w-full px-[24px] py-[20px] bg-white border-t border-gray-100 z-50'>
        <div className='flex items-center justify-between w-full gap-[12px]'>
          <div className='flex flex-col gap-[4px] min-w-0'>
            <p className='text-sm font-regular text-gray-500 truncate'>
              {selectedSchedule
                ? `${format(new Date(selectedSchedule.date + 'T00:00:00+09:00'), 'M월 d일', {
                    locale: ko,
                  })}, ${count}명`
                : '날짜, 인원 수'}
            </p>
            <p className='text-[2rem] font-semibold text-gray-800 truncate'>
              {(price * count).toLocaleString()}원
            </p>
          </div>
          <BaseButton
            className='w-[128px] h-[42px] rounded-[10px]'
            onClick={handleReserve}
            disabled={!selectedSchedule}
          >
            예약하기
          </BaseButton>
        </div>
      </div>

      <ConfirmModal />
    </>
  );
}
