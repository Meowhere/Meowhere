'use client';

import { Schedule } from '@/src/types/schedule.types';
import ScheduleTimeItem from './ScheduleTimeItem';
import { format } from 'date-fns';

interface ScheduleTimeListProps {
  schedules: Schedule[];
  selectedDate: Date | null;
  selectedScheduleId: number | null;
  onSelect: (schedule: Schedule) => void;
  price: number;
}

export default function ScheduleTimeList({
  schedules,
  selectedDate,
  selectedScheduleId,
  onSelect,
}: ScheduleTimeListProps) {
  if (!selectedDate) return null;

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const filtered = schedules.filter((s) => s.date === selectedDateStr);

  return (
    <div className='flex flex-col gap-[12px]'>
      {filtered.map((schedule) => (
        <ScheduleTimeItem
          key={schedule.id}
          schedule={schedule}
          isSelected={selectedScheduleId === schedule.id}
          onSelect={(id, date) => onSelect(schedule)}
          date={selectedDateStr}
        />
      ))}
    </div>
  );
}
