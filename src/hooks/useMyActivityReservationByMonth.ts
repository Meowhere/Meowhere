import { useQuery } from '@tanstack/react-query';
import { MyActivityReservationsByMonth } from '../types/my-activity-reservation.types';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';

export function useMyActivityReservationByMonth(activityId: number | undefined, date: Date) {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  return useQuery<MyActivityReservationsByMonth[]>({
    queryKey: ['myActivityReservationByMonth', activityId, year, month],
    queryFn: async () => {
      const res = await fetchFromClient(
        `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`
      );
      return res.json();
    },
    enabled: !!activityId,
  });
}
