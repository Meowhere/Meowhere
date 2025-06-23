import { useQuery } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';

export const useMyReservedScheduleIds = (activityId: number) => {
  return useQuery<number[]>({
    queryKey: ['my-reserved-schedules', activityId],
    queryFn: async () => {
      const res = await fetchFromClient(`/my-reservations`);
      if (!res.ok) throw new Error('예약 정보 조회 실패');

      const data = await res.json();
      const reservations = data.reservations ?? [];

      return reservations
        .filter((r: any) => r.activity?.id === activityId)
        .map((r: any) => r.scheduleId);
    },
  });
};
