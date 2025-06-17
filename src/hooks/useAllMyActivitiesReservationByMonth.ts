import { useQuery } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { ReservationAnalyticsByMonth } from '@/src/types/analytics-by-month.types';

export function useAllMyActivitiesReservationByMonth(date: Date) {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);

  return useQuery<ReservationAnalyticsByMonth[]>({
    queryKey: ['allMyActivitiesReservationStats', year, month],
    queryFn: async () => {
      // 1. 내 활동 리스트 가져오기
      const activitiesRes = await fetchFromClient('/my-activities');
      const { activities } = await activitiesRes.json();

      const activityIds = activities.map((a: any) => a.id);

      // 2. 각 활동의 예약 통계 데이터 병렬 요청
      const allStats = await Promise.all(
        activityIds.map(async (id: number) => {
          const res = await fetchFromClient(
            `/my-activities/${id}/reservation-dashboard?year=${year}&month=${month}`
          );
          return res.ok ? await res.json() : [];
        })
      );

      // 3. 병합: 날짜별로 예약 수를 합산
      const merged: Record<string, ReservationAnalyticsByMonth> = {};

      allStats.flat().forEach((stat: ReservationAnalyticsByMonth) => {
        const existing = merged[stat.date];
        if (existing) {
          existing.reservations.completed += stat.reservations.completed;
          existing.reservations.confirmed += stat.reservations.confirmed;
          existing.reservations.pending += stat.reservations.pending;
        } else {
          merged[stat.date] = { ...stat };
        }
      });

      return Object.values(merged).sort((a, b) => a.date.localeCompare(b.date));
    },
    staleTime: 1000 * 60 * 5,
  });
}
