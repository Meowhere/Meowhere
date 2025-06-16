import { useQuery } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { Activity } from '@/src/types/activity.types';

export function useActivityDetail(activityId: number) {
  return useQuery({
    queryKey: ['activity', activityId],
    queryFn: async (): Promise<Activity> => {
      const res = await fetchFromClient(`/activities/${activityId}`);
      return res.json();
    },
    enabled: !!activityId,
  });
}
