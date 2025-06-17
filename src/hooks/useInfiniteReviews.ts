import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { GetReviewsResponse } from '../types/review.type';

const PAGE_SIZE = 4;

export const useInfiniteReviews = (activityId: number) => {
  return useInfiniteQuery({
    queryKey: ['reviews', activityId],
    queryFn: async ({ pageParam = 0 }) => {
      const page = pageParam + 1;

      const res = await fetchFromClient(
        `/activities/${activityId}/reviews?page=${page}&size=${PAGE_SIZE}`
      );

      const data: GetReviewsResponse = await res.json().catch(() => ({
        reviews: [],
        totalCount: 0,
      }));

      const hasNext = page * PAGE_SIZE < data.totalCount;

      return {
        reviews: data.reviews,
        nextPage: hasNext ? pageParam + 1 : undefined,
        hasMore: hasNext,
      };
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.reviews) {
        return undefined;
      }
      return lastPage.nextPage;
    },
    initialPageParam: 0,
    retry: (failureCount, error) => {
      return failureCount < 3;
    },
  });
};
