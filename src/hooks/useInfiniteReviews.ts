import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { Review } from '@/src/types/review.type';

interface InfiniteReviewsPage {
  reviews: Review[];
  averageRating: number;
  totalCount: number;
  hasNext: boolean;
  page: number;
  size: number;
}

interface UseInfiniteReviewsParams {
  size?: number;
}

export function useInfiniteReviews(activityId: number, params: UseInfiniteReviewsParams = {}) {
  const { size = 100 } = params;

  return useInfiniteQuery({
    queryKey: ['reviews', 'infinite', activityId, size],
    queryFn: async ({ pageParam = 0 }) => {
      const searchParams = new URLSearchParams({
        page: pageParam.toString(),
        size: size.toString(),
      });

      const res = await fetchFromClient(
        `/activities/${activityId}/reviews?${searchParams.toString()}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await res.json();

      return {
        reviews: Array.isArray(data.reviews) ? data.reviews : [],
        averageRating: data.averageRating ?? 0,
        totalCount: data.totalCount ?? 0,
        hasNext: data.hasNext ?? false,
        page: pageParam,
        size: size,
      } as InfiniteReviewsPage;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 0,
    enabled: !!activityId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
