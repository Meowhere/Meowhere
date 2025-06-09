'use client';

import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import ActivityCard from './ActivityCard';
import { useEffect, useRef } from 'react';

export default function ActivityList({
  initialActivities,
  initialCursor,
}: {
  initialActivities: any[];
  initialCursor: string | null;
}) {
  const searchParams = useSearchParams();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['activities', searchParams.toString()],
    queryFn: async ({ pageParam }) => {
      console.log('queryFn 실행됨 :', pageParam);

      if (!pageParam) {
        console.log('첫 페이지 요청');
        return { activities: initialActivities, cursorId: initialCursor };
      }

      console.log('추가 요청');

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
        (item: any) =>
          item.price >= minPrice && item.price <= maxPrice && item.address.includes(address)
      );

      return { activities: filteredActivities, cursorId: data.cursorId };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      console.log('getNext 실행됨, cursor:', lastPage.cursorId);
      return lastPage.cursorId;
    },
  });

  useEffect(() => {
    console.log('observer 시작');

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log('자동 로딩');
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
  console.log('렌더링 개수:', allActivities.length);

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-[24px] lg:gap-x-[12px] lg:gap-y-[80px] mt-6 p-[24px] lg:px-[86px]'>
        {allActivities.map((item: any) => (
          <ActivityCard key={item.id} activity={item} />
        ))}
      </div>
      <div className='w-full flex justify-center mt-8'>
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
          >
            {isFetchingNextPage ? '로딩 중...' : '더 보기'}
          </button>
        )}
        {!hasNextPage && <div className='text-gray-500'>더 이상 활동이 없습니다</div>}
        <div ref={sentinelRef} className='h-[1px]' />
      </div>
    </>
  );
}
