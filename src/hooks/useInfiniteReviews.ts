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
      const data: GetReviewsResponse = await res.json();

      const hasNext = page * PAGE_SIZE < data.totalCount;

      return {
        reviews: data.reviews,
        nextCursor: hasNext ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};
