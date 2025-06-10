'use client';

import clsx from 'clsx';
import { Schedule } from '@/src/types/schedule.types';

interface ScheduleTimeSlotProps {
  schedule: Schedule;
  date: string;
  isSelected: boolean;
  onSelect: (id: number, date: string) => void;
  price: number;
}

const styles = {
  label: clsx(
    'cursor-pointer w-full rounded-[10px] border text-left p-[14px] transition-all duration-200',
    'hover:border-primary-200 hover:bg-primary-25'
  ),
  selected: 'border-primary-500 bg-primary-50',
  unselected: 'border-gray-200',
  timeText: 'text-md font-medium text-gray-800',
  priceText: 'text-sm font-regular text-gray-500',
};

export default function ScheduleTimeSlot({
  schedule,
  date,
  isSelected,
  onSelect,
  price,
}: ScheduleTimeSlotProps) {
  const { id, startTime, endTime } = schedule;
  const inputId = `schedule-${date}-${id}`;

  return (
    <label
      htmlFor={inputId}
      className={clsx(styles.label, isSelected ? styles.selected : styles.unselected)}
    >
      <input
        type='radio'
        id={inputId}
        name='schedule-selection'
        value={id}
        checked={isSelected}
        onChange={() => onSelect(id, date)}
        className='hidden'
      />
      <p className={styles.timeText}>
        오후 {startTime} ~ 오후 {endTime}
      </p>
      <p className={styles.priceText}>{price.toLocaleString()}원 / 인</p>
    </label>
  );
}
