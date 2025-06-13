import { useInfiniteQuery } from '@tanstack/react-query';
import { dummyReviews } from '../app/activities/[id]/data/dummyReviews';
// TODO: API 연동 후 실제 데이터로 교체

const PAGE_SIZE = 4;

/**
 * 특정 체험활동에 대한 후기 목록을 무한 스크롤 형태로 가져오는 커스텀 훅
 * @param activityId - 후기를 가져올 체험활동의 ID
 * @returns React Query의 useInfiniteQuery 결과 (data, fetchNextPage, hasNextPage 등)
 */

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
