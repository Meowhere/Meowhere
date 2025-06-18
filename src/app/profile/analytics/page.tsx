'use client';

import { useMemo, useState } from 'react';

import { useAllMyActivitiesReservationByMonth } from '@/src/hooks/useAllMyActivitiesReservationByMonth';
import SummaryCards from './components/SummaryCards';
import ReservationLineChart from './components/ReservationLineChart';
import MyActivitiesReviewList from './review-summary/MyActivitiesReviewList';
import MonthlyPendingChart from './monthly-pending-chart/MonthlyPendingChart';
import { useMonthlyPendingChartData } from '@/src/hooks/useMonthlyPendingChartData';

export default function AnalyticsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [today] = useState(() => new Date());

  const {
    data: analyticsData,
    isLoading,
    isError,
  } = useAllMyActivitiesReservationByMonth(selectedDate);

  const { chartData, isLoading: isPendingChartLoading } = useMonthlyPendingChartData(today);

  if (isError) {
    return (
      <main className='flex items-center justify-center text-red-500 text-lg'>
        통계 데이터를 불러오는 중 오류가 발생했어요.
      </main>
    );
  }

  return (
    <main className='w-full max-w-[960px] mx-auto px-[20px] pb-[88px]'>
      <h1 className='text-2xl font-bold text-black mb-[24px]'>전체 체험 예약 통계</h1>

      {isLoading ? (
        <p className='text-gray-500'>로딩 중...</p>
      ) : (
        <>
          <SummaryCards data={analyticsData ?? []} />
          <ReservationLineChart data={analyticsData ?? []} />
        </>
      )}

      {/* 이번 달 체험별 예약 신청 현황 차트 */}
      {!isPendingChartLoading && <MonthlyPendingChart data={chartData} />}

      {/* 체험별 리뷰 요약 */}
      <section className='mt-[48px]'>
        <h1 className='text-2xl font-bold text-black mb-[24px]'>체험별 리뷰 요약</h1>
        <MyActivitiesReviewList today={today} />
      </section>
    </main>
  );
}
