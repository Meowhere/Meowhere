import { useQuery } from '@tanstack/react-query';

import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { MyReservationResponse, MyReservationStatus } from '../types/profile-reservation.types';

export function useMyReservations(
  status: MyReservationStatus,
  size: number = 5,
  cursorId?: number
) {
  const query = useQuery<MyReservationResponse>({
    queryKey: ['myReservations', status],
    queryFn: async (): Promise<MyReservationResponse> => {
      const res = await fetchFromClient(
        `/my-reservations?size=${size}${cursorId ? `&cursorId=${cursorId}` : ''}${status !== 'all' ? `&status=${status}` : ''}`
      );
      return res.json();
    },
  });

  return {
    ...query,
    reservations: query.data?.reservations ?? [],
    cursorId: query.data?.cursorId,
    totalCount: query.data?.totalCount,
  };
}
