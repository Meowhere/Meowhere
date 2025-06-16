'use client';

import { Schedule, ScheduleWithTimes } from '@/src/types/schedule.types';
import ScheduleTimeItem from './ScheduleTimeItem';
import { format } from 'date-fns';

interface ScheduleTimeListProps {
  schedules: ScheduleWithTimes[];
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
      {filtered.flatMap((schedule) =>
        schedule.times.map((time) => (
          <ScheduleTimeItem
            key={`${schedule.date}-${time.id}`}
            schedule={{ ...time, date: schedule.date }}
            isSelected={selectedScheduleId === time.id}
            onSelect={(schedule) => onSelect(schedule)}
            date={schedule.date}
          />
        ))
      )}
    </div>
  );
}
