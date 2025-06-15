'use client';

import { useMemo, useState } from 'react';
import Calendar, { OnArgs } from 'react-calendar';

import { useModal } from '@/src/hooks/useModal';
import { useMyActivities } from '@/src/hooks/useMyActivities';
import { useMyActivityReservationByMonth } from '@/src/hooks/useMyActivityReservationByMonth';
import { STATUS_STYLE_MAP } from '@/src/constants/calendar';
import { MyActivity } from '@/src/types/my-activity-reservation.types';
import { DropdownItemButton } from '@/src/types/dropdown.types';

import Dropdown from '@/src/components/common/dropdowns/Dropdown';

import '@/src/styles/reservation-calendar.css';

export default function ReservationCalendar() {
  const { openReservationModal } = useModal();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedMyActivity, setSelectedMyActivity] = useState<MyActivity | null>(null);
  const { myActivities, isLoading } = useMyActivities(currentDate);
  const { data: myActivityReservationsByMonth } = useMyActivityReservationByMonth(
    selectedMyActivity?.id,
    currentDate
  );
  const dropdownItems = useMemo<DropdownItemButton[]>(() => {
    if (!myActivities || !myActivities.length) return [];
    return myActivities.map((activity: MyActivity) => ({
      label: activity.title,
      onClick: () => {
        setSelectedMyActivity(activity);
      },
    }));
  }, [myActivities, currentDate]);

  const handleReservation = (activityId: number, date: Date) => {
    openReservationModal({
      // 필요한 프롭들...
      activityId,
      date,
    });
  };

  const handleActiveStartDateChange = ({ action, activeStartDate, value, view }: OnArgs) => {
    if (!activeStartDate) return;

    setCurrentDate(activeStartDate);
  };

  // 상태별 표시 content 구성
  const tileContent = ({ date }: { date: Date }) => {
    if (!myActivityReservationsByMonth) return;
    const dateStr = date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '-')
      .replace('.', ''); // 결과: '2025-06-10';
    const info = myActivityReservationsByMonth.find((d) => d.date === dateStr);
    if (!info) return null;

    const items = [
      { key: 'pending', count: info.reservations.pending },
      { key: 'confirmed', count: info.reservations.confirmed },
      { key: 'completed', count: info.reservations.completed },
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

    if (!isSameMonth) return `${base} text-gray-300 dark:text-gray-600`;
    if (day === 0) return `${base} text-red-300`;
    if (day === 6) return `${base} text-blue-300`;
    return `${base} text-gray-600 dark:text-gray-400`;
  };

  return (
    <div className='mx-auto min-w-[327px] w-full'>
      <div className='mb-[64px]'>
        <Dropdown
          dropdownItems={dropdownItems}
          selectedValue={selectedMyActivity ? selectedMyActivity.title : '체험을 선택해주세요'}
          bottomSheetTitle='체험명'
          triggerLabel='체험명'
        />
      </div>
      <Calendar
        locale='ko-KR'
        calendarType='gregory'
        formatDay={(_, date) => String(date.getDate())}
        next2Label={null}
        prev2Label={null}
        value={currentDate}
        onChange={(nextValue) => {
          if (nextValue instanceof Date) setCurrentDate(nextValue);
          else if (Array.isArray(nextValue) && nextValue[0] instanceof Date)
            setCurrentDate(nextValue[0]);
        }}
        onActiveStartDateChange={handleActiveStartDateChange}
        tileContent={tileContent}
        tileClassName={tileClassName}
        onClickDay={(value) =>
          selectedMyActivity && handleReservation(selectedMyActivity.id, value)
        }
      />
    </div>
  );
}
