import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { ActivitiesPage } from '../types/my-activities.types';

const PAGE_SIZE = 5;

const fetchActivities = async ({ pageParam = 0 }) => {
  const page = 1;
  // 커서 기반이면 method=cursor, 페이지네이션은 cursorId 사용!
  let query = `method=cursor&size=${PAGE_SIZE}`;
  if (pageParam) {
    query += `&cursorId=${pageParam}`;
  }
  const res = await fetchFromClient(`/my-activities?${query}`);
  if (!res.ok) throw new Error('체험 리스트 불러오기 실패');
  const data = await res.json();
  return data;
};

export function useInfiniteActivities() {
  return useInfiniteQuery({
    queryKey: ['my-activities'],
    queryFn: fetchActivities,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 5 * 60 * 1000,
    initialPageParam: 0,
    getNextPageParam: (lastPage: ActivitiesPage) => {
      // 마지막 페이지라면 undefined
      if (!lastPage.activities || lastPage.activities.length < PAGE_SIZE) return undefined;
      // 마지막 activity의 id를 cursorId로 사용
      return lastPage.activities[lastPage.activities.length - 1].id;
    },
  });
}
