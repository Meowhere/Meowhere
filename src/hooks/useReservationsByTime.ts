import { useQuery } from '@tanstack/react-query';

import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { ModalReservationStatus, Reservation } from '../types/reservation.types';

export function useReservationsByTime(
  activityId: number,
  scheduleId?: number,
  status?: ModalReservationStatus
) {
  return useQuery<Reservation[]>({
    queryKey: ['reservationsByTime', scheduleId, status], // 쿼리 키가 바뀌면 자동으로 리패칭
    queryFn: async () => {
      const res = await fetchFromClient(
        `/my-activities/${activityId}/reservations?scheduleId=${scheduleId}&status=${status}`
      );
      const json = await res.json();
      return json.reservations;
    },
    enabled: !!scheduleId && !!status,
  });
}
