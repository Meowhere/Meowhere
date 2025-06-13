'use client';

import { formatScheduleDate } from '@/src/utils/date';
import { groupSchedulesByDate } from '@/src/utils/schedule';
import ScheduleTimeSlot from './ScheduleTimeSlot';
import { Schedule, SelectedSchedule } from '@/src/types/schedule.types';

interface ScheduleListProps {
  schedules: Schedule[];
  selectedSchedule: SelectedSchedule | null;
  onScheduleSelect: (id: number, date: string) => void;
  price: number;
}

export default function ScheduleList({
  schedules,
  selectedSchedule,
  onScheduleSelect,
  price,
}: ScheduleListProps) {
  const groupedByDate = groupSchedulesByDate(schedules);

  return (
    <div className='flex flex-col gap-[16px]'>
      <div className='flex items-center justify-between'>
        <p className='text-[2.2rem] font-semibold text-gray-800 mt-[16px]'>체험 날짜</p>
      </div>
      {Object.entries(groupedByDate).map(([date, timeSlots]) => (
        <div key={date}>
          <p className='mb-[12px] text-lg font-semibold text-gray-800'>
            {formatScheduleDate(date)}
          </p>
          <div className='flex flex-col gap-[12px]'>
            {timeSlots.map((schedule) => {
              const uniqueKey = `${date}-${schedule.startTime}-${schedule.endTime}`;

              return (
                <ScheduleTimeSlot
                  key={uniqueKey}
                  schedule={schedule}
                  date={date}
                  isSelected={selectedSchedule?.id === schedule.id}
                  onSelect={onScheduleSelect}
                  price={price}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
