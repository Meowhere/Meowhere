import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchFromClient } from '../lib/fetch/fetchFromClient';

export function useUpdateReservation(activityId: number, scheduleId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: 'confirmed' | 'declined';
    }) => {
      return await fetchFromClient(`/my-activities/${activityId}/reservations/${reservationId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      // 시간 리스트 쿼리 무효화(invalidate) -> 최신 데이터 fetch
      queryClient.invalidateQueries({
        queryKey: ['reservationsByTime', scheduleId],
      });

      // 캘린더 쿼리 무효화(invalidate) -> 최신 데이터 fetch
      const now = new Date();
      const year = now.getFullYear();
      const month = `0${now.getMonth() + 1}`.slice(-2);

      queryClient.invalidateQueries({
        queryKey: ['myActivityReservationByMonth', activityId, year, month],
      });
    },
  });
}
