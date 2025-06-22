'use client';

import clsx from 'clsx';
import { Schedule } from '@/src/types/schedule.types';
import { format, parseISO, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ScheduleTimeSlotProps {
  schedule: Schedule;
  date: string;
  isSelected: boolean;
  onSelect: (id: number, date: string) => void;
  price: number;
}

export default function ScheduleTimeSlot({
  schedule,
  date,
  isSelected,
  onSelect,
  price,
}: ScheduleTimeSlotProps) {
  const { id, startTime, endTime } = schedule;
  const inputId = `schedule-${date.replaceAll('-', '')}-${id}`;

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const formattedStartTime = format(new Date(0, 0, 0, startHour, startMinute), 'aa h:mm', {
    locale: ko,
  });
  const formattedEndTime = format(new Date(0, 0, 0, endHour, endMinute), 'aa h:mm', {
    locale: ko,
  });

  const scheduleDate = parseISO(date);
  const now = new Date();

  const isExpired =
    isToday(scheduleDate) &&
    (startHour < now.getHours() ||
      (startHour === now.getHours() && startMinute <= now.getMinutes()));

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        'cursor-pointer w-full rounded-[10px] border text-left p-[14px] transition-all duration-200',
        isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200 dark:border-gray-600',
        isExpired && 'opacity-40 cursor-not-allowed'
      )}
    >
      <input
        type='radio'
        id={inputId}
        name='schedule-selection'
        value={id}
        checked={isSelected}
        onChange={() => !isExpired && onSelect(id, date)}
        disabled={isExpired}
        className='hidden'
      />
      <p className='text-md font-medium text-gray-800 dark:text-gray-200'>
        {formattedStartTime} ~ {formattedEndTime}
      </p>
      <p className='text-sm font-regular text-gray-500 dark:text-gray-400'>
        {price.toLocaleString()}원 / 인
      </p>
    </label>
  );
}
