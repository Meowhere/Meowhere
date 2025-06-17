import { useQuery } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';

export function useReviews(activityId: number) {
  return useQuery({
    queryKey: ['reviews', activityId],
    queryFn: async () => {
      const res = await fetchFromClient(`/activities/${activityId}/reviews`);
      const data = await res.json();
      return {
        reviews: Array.isArray(data.reviews) ? data.reviews : [],
        reviewStats: {
          rating: data.averageRating ?? 0,
          count: data.totalCount ?? 0,
        },
      };
    },
    enabled: !!activityId,
  });
}
