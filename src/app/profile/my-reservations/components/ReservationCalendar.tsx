'use client';

import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { STATUS_STYLE_MAP } from '@/src/constants/calendar';
import '@/src/styles/reservation-calendar.css';

import type {
  StatusData,
  ReservationCalendarProps,
  TileClassNameArgs,
} from '@/src/types/my-reservation-calendar.types';
import { useModal } from '@/src/hooks/useModal';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';

export default function ReservationCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2025-12-05'));
  const { openReservationModal } = useModal();
  const [selectedMyActivity, setSelectedMyActivity] = useState<MyActivity>({
    id: 4276,
    userId: 1899,
    address: '서울특별시 강남구 테헤란로 427',
    bannerImageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
    category: '투어',
    createdAt: '2025-06-04T00:49:18.798Z',
    description: '둠칫 둠칫 두둠칫',
    price: 10000,
    rating: 0,
    reviewCount: 0,
    title: '테스트 데이터',
    updatedAt: '2025-06-04T00:49:18.798Z',
  });
  const [myActivities, setMyActivities] = useState<MyActivity[]>([]); // 이걸 드롭다운 컴포넌트에 뿌려줘야 함
  const [myActivityReservationsByMonth, setMyActivityReservationsByMonth] =
    useState<MyActivityReservationsByMonth[]>();

  const getMyActivities = async () => {
    const res = await fetchFromClient('/my-activities');
    const json = await res.json();
    setMyActivities(json.activities);
  };

  const getMyActivityReservationsByMonth = async () => {
    const year = currentDate.getFullYear();
    const month = `0${currentDate.getMonth() + 1}`.slice(-2);
    const res = await fetchFromClient(
      `/my-activities/${selectedMyActivity.id}/reservation-dashboard?year=${year}&month=${month}`
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

    if (!isSameMonth) return `${base} text-gray-400 opacity-40`;
    if (day === 0) return `${base} text-red-300`;
    if (day === 6) return `${base} text-blue-300`;
    return `${base} text-gray-600`;
  };

  useEffect(() => {
    getMyActivities();
    getMyActivityReservationsByMonth();
  }, []);

  return (
    <div className='mx-auto min-w-[327px] w-full'>
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
        tileContent={tileContent}
        tileClassName={tileClassName}
        onClickDay={(value) => handleReservation(selectedMyActivity.id, value)}
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
