import { useQuery } from '@tanstack/react-query';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { PopularActivitiesResponse } from '../types/activity.types';

export const usePopularActivities = (size: number) => {
  return useQuery<PopularActivitiesResponse>({
    queryKey: ['popular-activities'],
    queryFn: async () => {
      const response = await fetchFromClient(
        `/activities?method=offset&page=1&size=${size}&sort=most_reviewed`
      );
      return response.json();
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분 후 가비지 컬렉션
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
