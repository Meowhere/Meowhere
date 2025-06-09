import { useInfiniteQuery } from '@tanstack/react-query';
import { dummyReviews } from '../app/activities/[id]/data/dummyReviews';

const PAGE_SIZE = 4;

export const useInfiniteReviews = (activityId: number) => {
  return useInfiniteQuery({
    queryKey: ['reviews', activityId],
    queryFn: async ({ pageParam = 0 }) => {
      // await new Promise((res) => setTimeout(res, 1500));

      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      if (start >= dummyReviews.length) {
        return {
          reviews: [],
          nextCursor: undefined,
        };
      }

      const data = dummyReviews.slice(start, end);
      const hasNext = end < dummyReviews.length;

      return {
        reviews: data,
        nextCursor: hasNext ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};
