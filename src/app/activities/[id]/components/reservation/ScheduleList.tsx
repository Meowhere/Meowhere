'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { formatScheduleDate } from '@/src/utils/date';
import { groupSchedulesByDate } from '@/src/utils/schedule';
import CalendarButton from '../common/CalendarButton';
import ScheduleTimeSlot from './ScheduleTimeSlot';
import { Schedule, SelectedSchedule } from '@/src/types/schedule.types';

interface ScheduleListProps {
  schedules: Schedule[];
  selectedSchedule: SelectedSchedule | null;
  onScheduleSelect: (id: number, date: string) => void;
  price: number;
}

const styles = {
  container: 'flex flex-col gap-[16px]',
  header: 'flex items-center justify-between',
  title: 'text-[2.2rem] font-semibold text-gray-800 mt-[16px]',
  dateGroup: 'mb-[12px] text-lg font-semibold text-gray-800',
  timeSlots: 'flex flex-col gap-[12px]',
};

export default function ScheduleList({
  schedules,
  selectedSchedule,
  onScheduleSelect,
  price,
}: ScheduleListProps) {
  const groupedByDate = groupSchedulesByDate(schedules);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>체험 날짜</p>
        <CalendarButton onClick={() => void 0} />
      </div>
      {Object.entries(groupedByDate).map(([date, timeSlots]) => (
        <div key={date}>
          <p className={styles.dateGroup}>{formatScheduleDate(date)}</p>
          <div className={styles.timeSlots}>
            {timeSlots.map((schedule) => (
              <ScheduleTimeSlot
                key={`${date}-${schedule.id}`}
                schedule={schedule}
                date={date}
                isSelected={selectedSchedule?.id === schedule.id}
                onSelect={onScheduleSelect}
                price={price}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
