'use client';

import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import ActivityCard from './ActivityCard';
import { useEffect, useRef } from 'react';
import { Activity } from '@/src/types/activity.types';
import { useUser } from '@/src/hooks/auth/useAuth';
import CheckedInCircle from '@/src/components/common/icons/CheckedInCircle';

export default function ActivityList({
  initialActivities,
  initialCursor,
  onActivitiesUpdate,
  isSearching = false,
}: {
  initialActivities: Activity[];
  initialCursor: string | null;
  onActivitiesUpdate?: (activities: Activity[]) => void;
  isSearching?: boolean;
}) {
  const searchParams = useSearchParams();
  const { data: userData } = useUser();
  const showLikeButton = userData && Object.keys(userData).length > 0;

  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } =
    useInfiniteQuery({
      queryKey: ['activities', searchParams.toString()],
      queryFn: async ({ pageParam }) => {
        if (!pageParam) {
          return { activities: initialActivities, cursorId: initialCursor };
        }

        const category = searchParams.get('category') || '';
        const keyword = searchParams.get('keyword') || '';

        const params = new URLSearchParams({
          method: 'cursor',
          cursorId: pageParam,
          size: '30',
          ...(category && { category }),
          ...(keyword && { keyword }),
        });

        const response = await fetchFromClient(`/activities?${params.toString()}`);
        const data = await response.json();

        const minPrice = Number(searchParams.get('min-price') || 0);
        const maxPrice = Number(searchParams.get('max-price') || Infinity);
        const address = searchParams.get('address') || '';

        const filteredActivities = data.activities.filter(
          (item: Activity) =>
            item.price >= minPrice && item.price <= maxPrice && item.address.includes(address)
        );

        return { activities: filteredActivities, cursorId: data.cursorId };
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        return lastPage.cursorId;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const sentinel = sentinelRef.current;

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allActivities = data?.pages.flatMap((page) => page.activities) || [];
  const isInitialLoading = isLoading || (isFetching && !data?.pages.length);

  // allActivities가 변경될 때마다 부모 컴포넌트에게 알림
  const prevAllActivitiesRef = useRef<Activity[]>([]);

  useEffect(() => {
    // 이전 데이터와 비교해서 실제로 변경된 경우에만 업데이트
    if (onActivitiesUpdate && allActivities.length > 0) {
      const prevLength = prevAllActivitiesRef.current.length;
      const currentLength = allActivities.length;

      // 길이가 다른 경우에만 업데이트 (무한스크롤로 데이터 추가된 경우)
      if (prevLength !== currentLength) {
        onActivitiesUpdate(allActivities);
        prevAllActivitiesRef.current = [...allActivities]; // 새로운 배열로 복사
      }
    }
  }, [allActivities]); // onActivitiesUpdate를 dependency에서 제외해서 무한루프 방지

  return (
    <div>
      {isInitialLoading ? (
        <div className='w-full flex justify-center pt-[128px] pb-[24px]'>
          <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
        </div>
      ) : (
        <div
          className={`${!isSearching ? 'xl:grid-cols-5 2xl:grid-cols-7' : ''} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[12px] lg:gap-y-[80px] mt-6 p-[24px] lg:px-[86px] gap-[24px]`}
        >
          {allActivities.map((item: Activity) => (
            <ActivityCard key={item.id} activity={item} showLikeButton={showLikeButton} />
          ))}
        </div>
      )}
      {/* {isFetching && <ActivityListSkeleton count={7} />} */}
      {!hasNextPage && !isFetching && (
        <div className='w-full flex justify-center pt-[128px] pb-[24px]'>
          <span className='text-gray-500 dark:text-gray-400 text-xs flex items-center gap-[8px]'>
            <CheckedInCircle className='w-[16px] h-[16px]' />
            모든 체험을 확인했어요
          </span>
        </div>
      )}
      <div ref={sentinelRef} className='h-[1px]' />
    </div>
  );
}
