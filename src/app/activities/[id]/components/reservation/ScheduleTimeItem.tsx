'use client';

import { Schedule } from '@/src/types/schedule.types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';
import { isToday, parseISO } from 'date-fns';

interface ScheduleTimeItemProps {
  schedule: {
    id: number;
    startTime: string;
    endTime: string;
    date: string;
  };
  date?: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onSelect: (schedule: Schedule) => void;
}

export default function ScheduleTimeItem({
  schedule,
  isSelected,
  isDisabled = false,
  onSelect,
}: ScheduleTimeItemProps) {
  const { id, date, startTime = '', endTime = '' } = schedule;
  if (!date) return null;

  const scheduleDate = parseISO(date);
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const now = new Date();

  if (
    isToday(scheduleDate) &&
    (startHour < now.getHours() ||
      (startHour === now.getHours() && startMinute <= now.getMinutes()))
  ) {
    return null;
  }

  const safeDate = date.replaceAll('-', '');
  const inputId = `schedule-${safeDate}-${id}`;

  const [endHour, endMinute] = endTime.split(':').map(Number);

  const formattedStartTime =
    startHour !== undefined && startMinute !== undefined
      ? format(new Date(0, 0, 0, startHour, startMinute), 'aa h:mm', { locale: ko })
      : '';
  const formattedEndTime =
    endHour !== undefined && endMinute !== undefined
      ? format(new Date(0, 0, 0, endHour, endMinute), 'aa h:mm', { locale: ko })
      : '';

  return (
    <div>
      <button
        type='button'
        name='schedule-selection'
        disabled={isDisabled}
        onClick={() => onSelect(schedule)}
        className={clsx(
          'w-full text-left rounded-[10px] p-[14px] transition-all duration-100 border',
          isSelected ? 'bg-gray-100 dark:bg-gray-700' : '',
          isDisabled
            ? 'cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-800 dark:text-gray-500'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
        )}
      >
        <p className='text-sm text-gray-400 dark:text-gray-400 mb-1'>
          {format(new Date(date), 'yyyy년 M월 d일', { locale: ko })}
        </p>

        <p className='text-md font-medium text-gray-800 dark:text-gray-200'>
          {formattedStartTime} ~ {formattedEndTime}
        </p>

        {isDisabled && <p className='text-xs text-red-400 mt-1'>이미 예약한 시간입니다</p>}
      </button>
    </div>
  );
}
