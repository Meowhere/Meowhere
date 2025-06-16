import { useQuery } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';

export function useSchedule(activityId: number) {
  return useQuery({
    queryKey: ['schedule', activityId],
    queryFn: async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const res = await fetchFromClient(
        `/activities/${activityId}/available-schedule?year=${year}&month=${month}`
      );
      const data = await res.json();
      return Array.isArray(data) ? data : (data?.schedules ?? []);
    },
    enabled: !!activityId,
  });
}
