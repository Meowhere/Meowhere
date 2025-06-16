import { useQuery } from '@tanstack/react-query';

import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { MyActivitiesResponse } from '../types/my-activity-reservation.types';

export function useMyActivities(date: Date) {
  const query = useQuery<MyActivitiesResponse>({
    queryKey: ['myActivities', date],
    queryFn: async (): Promise<MyActivitiesResponse> => {
      const res = await fetchFromClient('/my-activities');
      return res.json();
    },
  });

  return {
    ...query,
    myActivities: query.data?.activities,
    cursorId: query.data?.cursorId,
    totalCount: query.data?.totalCount,
  };
}
