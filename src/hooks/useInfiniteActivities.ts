import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';

const PAGE_SIZE = 6;

const fetchActivities = async ({ pageParam = 0 }) => {
  const res = await fetchFromClient(`my-activities?size=${PAGE_SIZE}&cursorId=${pageParam}`);
  if (!res.ok) throw new Error('체험 리스트 불러오기 실패');
  return res.json();
};

export function useInfiniteActivities() {
  return useInfiniteQuery({
    queryKey: ['my-activities'],
    queryFn: fetchActivities,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.activities || lastPage.activities.length < PAGE_SIZE) return undefined;
      return lastPage.activities[lastPage.activities.length - 1].id;
    },
  });
}
