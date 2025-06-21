'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useGnb } from '@/src/hooks/useGnb';
import { useAllMyActivitiesReservationByMonth } from '@/src/hooks/useAllMyActivitiesReservationByMonth';
import { useMonthlyPendingChartData } from '@/src/hooks/useMonthlyPendingChartData';

import SummaryCards from './reservation-stats/SummaryCards';
import ReservationLineChart from './reservation-stats/ReservationLineChart';
import MyActivitiesReviewList from './review-summary/MyActivitiesReviewList';
import MonthlyPendingChart from './monthly-pending-chart/MonthlyPendingChart';

export default function AnalyticsPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = useMemo(() => new Date(), []);

  const {
    data: analyticsData,
    isLoading,
    isError,
  } = useAllMyActivitiesReservationByMonth(selectedDate);

  const { chartData, isLoading: isPendingChartLoading } = useMonthlyPendingChartData(today);

  useGnb({
    title: '내 체험 통계',
    backAction: () => router.push('/profile'),
  });

  if (isError) {
    return (
      <main className='flex items-center justify-center text-red-500 dark:text-red-300 text-lg'>
        통계 데이터를 불러오는 중 오류가 발생했어요.
      </main>
    );
  }

  return (
    <main className='w-full max-w-[960px] mx-auto px-[20px] pb-[88px]'>
      <h1 className='text-2xl font-bold text-black dark:text-gray-200 mb-[24px]'>
        전체 체험 예약 통계
      </h1>

      {isLoading ? (
        <p className='text-gray-500 dark:text-gray-300'>
          잠시만 기다려 주세요, 예약 현황을 준비 중입니다
        </p>
      ) : (
        <>
          <SummaryCards data={analyticsData ?? []} />
          <ReservationLineChart data={analyticsData ?? []} />
        </>
      )}

      {/* 이번 달 체험별 예약 신청 현황 차트 */}
      <section className='mt-[48px]'>
        <h1 className='text-2xl font-bold text-black dark:text-gray-200 mb-[24px]'>
          이번 달 체험별 예약 신청 현황
        </h1>
        {isPendingChartLoading ? (
          <p className='text-gray-500 dark:text-gray-300'>
            잠시만 기다려 주세요, 체험별 신청 데이터를 불러오고 있어요.
          </p>
        ) : (
          <MonthlyPendingChart data={chartData} />
        )}
      </section>

      {/* 체험별 리뷰 요약 */}
      <section className='mt-[48px]'>
        <h1 className='text-2xl font-bold text-black dark:text-gray-200 mb-[24px]'>
          체험별 리뷰 요약
        </h1>
        <MyActivitiesReviewList today={today} />
      </section>
    </main>
  );
}
