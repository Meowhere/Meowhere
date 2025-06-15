'use client';

import { Schedule } from '@/src/types/schedule.types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';

interface ScheduleTimeItemProps {
  schedule: {
    id: number;
    startTime: string;
    endTime: string;
    date: string;
  };
  date?: string;
  isSelected: boolean;
  onSelect: (id: number, date: string) => void;
}

export default function ScheduleTimeItem({
  schedule,
  date,
  isSelected,
  onSelect,
}: ScheduleTimeItemProps) {
  const { id, startTime = '', endTime = '' } = schedule;

  // date가 없으면 렌더링하지 않음
  if (!date) return null;

  const safeDate = date.replaceAll('-', '');
  const inputId = `schedule-${safeDate}-${id}`;

  const [startHour, startMinute] = startTime.split(':').map(Number);
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
        id={inputId}
        name='schedule-selection'
        onClick={() => onSelect(id, date)}
        className={clsx(
          'w-full text-left rounded-[10px] border p-[14px] transition-all duration-200',
          isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200',
          'hover:border-primary-200 hover:bg-primary-25'
        )}
      >
        <p className='text-sm text-gray-400 mb-1'>
          {format(new Date(date), 'yyyy년 M월 d일', { locale: ko })}
        </p>

        <p className='text-md font-medium text-gray-800'>
          {formattedStartTime} ~ {formattedEndTime}
        </p>
      </button>
    </div>
  );
}
