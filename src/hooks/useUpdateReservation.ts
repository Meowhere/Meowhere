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
      queryClient.invalidateQueries({
        queryKey: ['reservationsByTime', scheduleId, status],
      });
    },
  });
}
