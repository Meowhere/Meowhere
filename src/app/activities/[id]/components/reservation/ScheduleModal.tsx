'use client';

import { parseISO, format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useState, useMemo } from 'react';
import CounterButton from '../common/CounterButton';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useModal } from '@/src/hooks/useModal';
import ScheduleTimeList from './ScheduleTimeList';
import { ScheduleWithTimes } from '@/src/types/schedule.types';
import ReservationCalendarPicker from '@/src/components/common/calendar/ReservationCalendarPicker';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { useToastStore } from '@/src/store/toastStore';

export interface ScheduleModalProps {
  price: number;
  schedules: ScheduleWithTimes[];
  activityId: number;
}

export default function ScheduleModal({ price, schedules, activityId }: ScheduleModalProps) {
  const [count, setCount] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState<{ id: number; date: string } | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { closeModal } = useModal();
  const { showToast } = useToastStore();

  const availableDates = useMemo(() => {
    return schedules.map((schedule) => format(parseISO(schedule.date), 'yyyy-MM-dd'));
  }, [schedules]);

  const handleReserve = async () => {
    if (!selectedSchedule) {
      showToast('error', '예약할 날짜를 선택해주세요.');
      return;
    }

    try {
      const reservationData = {
        scheduleId: selectedSchedule.id,
        headCount: count,
      };

      await fetchFromClient(`activities/${activityId}/reservations`, {
        method: 'POST',
        body: JSON.stringify(reservationData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      closeModal();
      showToast('success', '예약이 완료되었습니다');
    } catch (error) {
      closeModal();
      showToast('error', '체험 등록에 실패했습니다');
    }
  };

  const formattedSummary = selectedSchedule
    ? `${format(parseISO(selectedSchedule.date), 'M월 d일', { locale: ko })}, ${count}명`
    : '날짜, 인원 수';

  const formattedPrice = (price * count).toLocaleString();

  return (
    <>
      <div className='flex flex-col max-h-[80vh] gap-[24px] overflow-y-auto p-[12px] scrollbar-hide pb-[120px]'>
        <div className='flex flex-col max-h-[80vh] gap-[24px] overflow-y-auto p-[12px] scrollbar-hide pb-[120px]'>
          {/* 인원 선택 */}
          <div className='flex flex-col gap-[24px] mb-[24px]'>
            <p className='text-[2.2rem] font-semibold text-gray-800 dark:text-gray-200'>인원</p>
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

          {/* 날짜 선택 */}
          <p className='text-[2.2rem] font-semibold text-gray-800'>체험 날짜</p>
          <ReservationCalendarPicker
            selectedDate={selectedDate}
            onChange={setSelectedDate}
            availableDates={availableDates}
          />

          {/* 시간 선택 */}
          <ScheduleTimeList
            schedules={schedules}
            selectedDate={selectedDate}
            selectedScheduleId={selectedSchedule?.id ?? null}
            onSelect={setSelectedSchedule}
            price={price}
          />
        </div>
      </div>

      {/* 예약 요약 + 예약 버튼 */}
      <div
        className='
          fixed bottom-0 left-0 w-full 
          px-[24px] py-[20px] 
          bg-white dark:bg-gray-800 
          border-t border-gray-100 dark:border-gray-700 
          z-50 
          md:rounded-b-[20px] md:shadow-[0_0_12px_rgba(0,0,0,0.08)]
        '
      >
        <div className='flex items-center justify-between w-full gap-[12px]'>
          <div className='flex flex-col gap-[4px]'>
            <p className='text-sm font-regular text-gray-500 dark:text-gray-400 truncate'>
              {formattedSummary}
            </p>
            <p className='text-[2rem] font-semibold text-gray-800 dark:text-gray-200 truncate'>
              {formattedPrice}원
            </p>
          </div>
          <BaseButton
            className='max-w-[128px] w-[128px] h-[42px] rounded-[10px]'
            onClick={handleReserve}
            disabled={!selectedSchedule}
          >
            예약하기
          </BaseButton>
        </div>
      </div>
    </>
  );
}
