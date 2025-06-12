'use client';

import { useEffect, useState } from 'react';
import Calendar, { OnArgs } from 'react-calendar';
import { STATUS_STYLE_MAP } from '@/src/constants/calendar';
import '@/src/styles/reservation-calendar.css';

import { useModal } from '@/src/hooks/useModal';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { DropdownItemButton } from '@/src/types/dropdown-menu.types';
import Dropdown from '@/src/components/common/dropdowns/Dropdown';

export default function ReservationCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { openReservationModal } = useModal();
  const [selectedMyActivity, setSelectedMyActivity] = useState<MyActivity | null>(null);
  const [myActivities, setMyActivities] = useState<MyActivity[]>([]); // 이걸 드롭다운 컴포넌트에 뿌려줘야 함
  const [myActivityReservationsByMonth, setMyActivityReservationsByMonth] =
    useState<MyActivityReservationsByMonth[]>();
  const [dropdownItems, setDropdownItems] = useState<DropdownItemButton[]>([]);

  const getMyActivities = async (date: Date) => {
    const res = await fetchFromClient('/my-activities');
    const json = await res.json();
    setMyActivities(json.activities);

    if (!myActivities.length) {
      const dropdownItemsResult: DropdownItemButton[] = json.activities.map(
        (activity: MyActivity) => ({
          label: activity.title,
          onClick: () => {
            setSelectedMyActivity(activity);
            getMyActivityReservationsByMonth(activity.id, date);
          },
        })
      );
      setDropdownItems(dropdownItemsResult);
    }
  };

  const getMyActivityReservationsByMonth = async (activityId: number, date: Date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const res = await fetchFromClient(
      `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`
    );
    const json = await res.json();
    setMyActivityReservationsByMonth(json);
  };

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

    if (!isSameMonth) return `${base} text-gray-300`;
    if (day === 0) return `${base} text-red-300`;
    if (day === 6) return `${base} text-blue-300`;
    return `${base} text-gray-600`;
  };

  useEffect(() => {
    getMyActivities(currentDate);
  }, [currentDate]);

  return (
    <div className='mx-auto min-w-[327px] w-full'>
      <div className='mb-[64px]'>
        <Dropdown
          dropdownItems={dropdownItems}
          triggerLabel='체험명'
          selectedValue={selectedMyActivity ? selectedMyActivity.title : '체험을 선택해주세요'}
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

interface MyActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface MyActivityReservationsByMonth {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}
