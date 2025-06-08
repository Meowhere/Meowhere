'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { STATUS_STYLE_MAP } from '@/src/constants/calendar';
import '@/src/styles/reservation-calendar.css';

import type {
  StatusData,
  ReservationCalendarProps,
  TileClassNameArgs,
} from '@/src/types/my-reservation-calendar.types';
import { useModal } from '@/src/hooks/useModal';

export default function ReservationCalendar({ statusData }: ReservationCalendarProps) {
  const [value, setValue] = useState<Date>(new Date());
  const { openReservationModal } = useModal();

  // 상태별 표시 content 구성
  const tileContent = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().slice(0, 10);
    const info = statusData.find((d) => d.date === dateStr);
    if (!info) return null;

    const items = [
      { key: 'pending', count: info.pendingCount },
      { key: 'confirmed', count: info.confirmedCount },
      { key: 'declined', count: info.declinedCount },
    ] as const;

    const contents = items.flatMap(({ key, count }) =>
      count > 0
        ? [
            <div
              key={key}
              className={`w-full h-[16px] flex items-center justify-center text-center rounded-full text-[0.9rem] leading-auto font-medium ${STATUS_STYLE_MAP[key as keyof typeof STATUS_STYLE_MAP].colorClass}`}
            >
              {`${STATUS_STYLE_MAP[key as keyof typeof STATUS_STYLE_MAP].label} ${count}`}
            </div>,
          ]
        : []
    );

    if (contents.length === 0) return null;

    return (
      <div className='flex flex-col bottom-[10px] left-0 right-0 px-1 text-center text-xs font-medium gap-[2px]'>
        {contents}
      </div>
    );
  };

  const handleReservation = () => {
    openReservationModal({
      // 필요한 프롭들...
    });
  };

  const tileClassName = ({
    date,
    view,
    activeStartDate,
  }: {
    date: Date;
    view: string;
    activeStartDate: Date;
  }) => {
    const currentMonth = activeStartDate.getMonth();
    const isSameMonth = date.getMonth() === currentMonth;
    const day = date.getDay();

    const base = 'flex flex-col min-h-[86px] pt-[10px] pb-[8px] text-[1.1rem] font-semibold';

    if (!isSameMonth) return `${base} text-gray-400 opacity-40`;
    if (day === 0) return `${base} text-red-300`;
    if (day === 6) return `${base} text-blue-300`;
    return `${base} text-gray-600`;
  };

  return (
    <div className='mx-auto min-w-[327px] w-full'>
      <Calendar
        locale='ko-KR'
        calendarType='gregory'
        formatDay={(_, date) => String(date.getDate())}
        next2Label={null}
        prev2Label={null}
        value={value}
        onChange={(nextValue) => {
          if (nextValue instanceof Date) setValue(nextValue);
          else if (Array.isArray(nextValue) && nextValue[0] instanceof Date) setValue(nextValue[0]);
        }}
        tileContent={tileContent}
        tileClassName={tileClassName}
        onClickDay={handleReservation}
      />
    </div>
  );
}
