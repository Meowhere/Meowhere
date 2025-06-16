import { useQuery } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { Activity } from '@/src/types/activity.types';

export function useActivityDetail(id: number) {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: async (): Promise<Activity> => {
      const res = await fetchFromClient(`/activities/${id}`);
      return res.json();
    },
    enabled: !!id,
  });
}
