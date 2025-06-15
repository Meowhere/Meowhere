import { useQuery } from '@tanstack/react-query';

import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { formatDateHyphen } from '../utils/date-format';
import { ReservedSchedule } from '../types/reservation.types';

export function useReservedSchedules(activityId: number, date: Date) {
  const formattedDate = formatDateHyphen(date);

  return useQuery<ReservedSchedule[]>({
    queryKey: ['reservedSchedules', activityId, formattedDate],
    queryFn: async () => {
      const res = await fetchFromClient(
        `/my-activities/${activityId}/reserved-schedule?date=${formattedDate}`
      );
      return await res.json();
    },
  });
}
