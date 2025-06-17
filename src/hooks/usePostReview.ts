import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchFromClient } from '../lib/fetch/fetchFromClient';

export function usePostReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reservationId,
      rating,
      content,
    }: {
      reservationId: number;
      rating: number;
      content: string;
    }) => {
      return await fetchFromClient(`/my-reservations/${reservationId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, content }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myReservations'],
      });
    },
  });
}
