import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchFromClient } from '../lib/fetch/fetchFromClient';

export function useCancelReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reservationId }: { reservationId: number }) => {
      return await fetchFromClient(`/my-reservations/${reservationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'canceled' }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myReservations'],
      });
    },
  });
}
