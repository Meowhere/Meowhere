'use client';

import { format, parseISO, isToday, addDays, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useState } from 'react';
import CounterButton from '../common/CounterButton';
import CalendarButton from '../common/CalendarButton';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import clsx from 'clsx';

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ScheduleModalProps {
  price: number;
  schedules: Schedule[];
}

export default function ScheduleModal({ price, schedules }: ScheduleModalProps) {
  const [count, setCount] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState<{ id: number; date: string } | null>(
    null
  );

  const groupedByDate = schedules.reduce(
    (acc, schedule) => {
      (acc[schedule.date] = acc[schedule.date] || []).push(schedule);
      return acc;
    },
    {} as Record<string, Schedule[]>
  );

  const formattedDate = (dateStr: string) => {
    const parsed = parseISO(dateStr);
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const dayAfterTomorrow = addDays(today, 2);

    let label = '';
    if (isToday(parsed)) {
      label = '(오늘)';
    } else if (isSameDay(parsed, tomorrow)) {
      label = '(내일)';
    } else if (isSameDay(parsed, dayAfterTomorrow)) {
      label = '(모레)';
    } else {
      const weekday = format(parsed, 'eeee', { locale: ko });
      label = `(${weekday})`;
    }
    return `${format(parsed, 'yy. MM. dd')} ${label}`;
  };

  return (
    <>
      {/* 본문 영역 */}
      <div className='flex max-h-[80vh] flex-col gap-[24px] overflow-y-scroll scrollbar-hide p-[12px] pb-[120px]'>
        {/* 인원 선택 */}
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

        {/* 날짜 및 시간 리스트 */}
        <div className='flex flex-col gap-[16px]'>
          <div className='flex items-center justify-between'>
            <p className='text-[2.2rem] font-semibold text-gray-800 mt-[16px]'>체험 날짜</p>
            <CalendarButton onClick={() => void 0} />
          </div>
          {Object.entries(groupedByDate).map(([date, timeSlots]) => (
            <div key={date}>
              <p className='mb-[12px] text-lg font-semibold text-gray-800'>{formattedDate(date)}</p>
              <div className='flex flex-col gap-[12px]'>
                {timeSlots.map(({ id, startTime, endTime }) => {
                  const isSelected = selectedSchedule?.id === id;
                  const inputId = `schedule-${date}-${id}`;
                  return (
                    <label
                      key={id}
                      htmlFor={inputId}
                      className={clsx(
                        'cursor-pointer w-full rounded-[10px] border text-left p-[14px] transition-colors',
                        isSelected ? 'border-primary-500' : 'border-gray-200',
                        'hover:border-primary-200'
                      )}
                    >
                      <input
                        type='radio'
                        id={inputId}
                        name={`schedule-${date}`}
                        value={id}
                        checked={isSelected}
                        onChange={() => setSelectedSchedule({ id, date })}
                        className='hidden'
                      />
                      <p className='text-md font-medium text-gray-800'>
                        오후 {startTime} ~ 오후 {endTime}
                      </p>
                      <p className='text-sm font-regular text-gray-500'>
                        {price.toLocaleString()}원 / 인
                      </p>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 고정 영역 */}
      <div className='fixed bottom-0 left-0 w-full px-[24px] py-[20px] bg-white border-t border-gray-100 z-50'>
        <div className='flex items-center justify-between w-full gap-[12px]'>
          <div className='flex flex-col gap-[4px] min-w-0'>
            <p className='text-sm font-regular text-gray-500 truncate'>
              {selectedSchedule
                ? `${format(parseISO(selectedSchedule.date), 'M월 d일', { locale: ko })}, ${count}명`
                : '날짜, 인원 수'}
            </p>
            <p className='text-[2rem] font-semibold text-gray-800 truncate'>
              {(price * count).toLocaleString()}원
            </p>
          </div>
          <BaseButton className='w-[128px] h-[42px] rounded-[10px]'>예약하기</BaseButton>
        </div>
      </div>
    </>
  );
}
