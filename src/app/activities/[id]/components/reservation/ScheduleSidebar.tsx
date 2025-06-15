'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import ReservationBox from '../reservation/ReservationBox';
import ScheduleTimeList from './ScheduleTimeList';
import { ScheduleWithTimes } from '@/src/types/schedule.types';
import ReservationCalendarPicker from '@/src/components/common/calendar/ReservationCalendarPicker';

interface ScheduleSidebarProps {
  price: number;
  schedules: ScheduleWithTimes[];
}

export default function ScheduleSidebar({ price, schedules }: ScheduleSidebarProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<{ id: number; date: string } | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const availableDates = useMemo(() => {
    return schedules.map((schedule) => format(new Date(schedule.date), 'yyyy-MM-dd'));
  }, [schedules]);

  return (
    <aside className='w-full max-w-[380px] bg-white shadow-xl rounded-[16px] border border-gray-200 px-[24px] py-[24px]'>
      <div className='flex flex-col gap-[24px]'>
        <ReservationBox pricePerPerson={price} />

        {/* 날짜 선택 */}
        <div className='flex flex-col gap-[16px]'>
          <p className='text-[2.2rem] font-semibold text-gray-800'>체험 날짜</p>
          <ReservationCalendarPicker
            selectedDate={selectedDate}
            onChange={setSelectedDate}
            availableDates={availableDates}
          />
        </div>

        {/* 시간 리스트 */}
        <ScheduleTimeList
          schedules={schedules}
          selectedDate={selectedDate}
          selectedScheduleId={selectedSchedule?.id ?? null}
          onSelect={setSelectedSchedule}
          price={price}
        />
      </div>
    </aside>
  );
}
