'use client';

import { useMyActivities } from '@/src/hooks/useMyActivities';
import { useQueries } from '@tanstack/react-query';

export function useMonthlyPendingChartData(today: Date) {
  const { myActivities, isLoading: isActivitiesLoading } = useMyActivities(today);

  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);

  const queries = useQueries({
    queries:
      myActivities?.map((activity) => ({
        queryKey: ['myActivityReservationByMonth', activity.id, year, month],
        queryFn: async () => {
          const res = await fetch(
            `/api/my-activities/${activity.id}/reservation-dashboard?year=${year}&month=${month}`
          );
          return res.json();
        },
        enabled: !!activity.id,
      })) ?? [],
  });

  const isLoading = isActivitiesLoading || queries.some((q) => q.isLoading);

  const chartData =
    myActivities
      ?.map((activity, i) => {
        const data = queries[i]?.data ?? [];
        const summary = data.reduce(
          (acc: { pending: number; confirmed: number; completed: number }, day: any) => {
            acc.pending += day.reservations.pending ?? 0;
            acc.confirmed += day.reservations.confirmed ?? 0;
            acc.completed += day.reservations.completed ?? 0;
            return acc;
          },
          { pending: 0, confirmed: 0, completed: 0 }
        );

        return {
          title: activity.title,
          ...summary,
        };
      })
      .filter((item) => item.pending + item.confirmed + item.completed > 0)
      .sort(
        (a, b) => b.pending + b.confirmed + b.completed - (a.pending + a.confirmed + a.completed)
      )
      .slice(0, 5) ?? [];

  return { chartData, isLoading };
}
