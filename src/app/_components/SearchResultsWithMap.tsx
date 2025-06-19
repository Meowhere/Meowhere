'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Activity } from '../../types/activity.types';
import SearchResultMap from './SearchResultMap';
import ActivityList from './ActivityList';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

interface SearchResultsWithMapProps {
  initialActivities: Activity[];
  initialCursor: string | null;
}

export default function SearchResultsWithMap({
  initialActivities,
  initialCursor,
}: SearchResultsWithMapProps) {
  const [allActivities, setAllActivities] = useState<Activity[]>(initialActivities);
  const prevActivitiesRef = useRef<Activity[]>([]);
  const { isDesktop } = useBreakpoint();

  console.log(
    'SearchResultsWithMap: 렌더링, initialActivities 길이:',
    initialActivities.length,
    'allActivities 길이:',
    allActivities.length
  );

  // 초기 데이터가 변경될 때 (새로운 검색/필터) 상태 리셋
  useEffect(() => {
    console.log('SearchResultsWithMap: initialActivities 변경, 길이:', initialActivities.length);
    setAllActivities(initialActivities);
    prevActivitiesRef.current = initialActivities;
  }, [initialActivities]);

  // useCallback으로 함수 메모이제이션 + 중복 업데이트 방지
  const handleActivitiesUpdate = useCallback((newActivities: Activity[]) => {
    const prevLength = prevActivitiesRef.current.length;
    const newLength = newActivities.length;

    console.log(
      'SearchResultsWithMap: handleActivitiesUpdate 호출, prevLength:',
      prevLength,
      'newLength:',
      newLength
    );

    // 길이가 다르면 확실히 다른 데이터 (무한스크롤)
    if (prevLength !== newLength) {
      console.log('SearchResultsWithMap: 길이 변경으로 allActivities 업데이트');
      setAllActivities(newActivities);
      prevActivitiesRef.current = newActivities;
      return;
    }

    // 길이가 같으면 마지막 몇 개 요소의 ID만 비교 (성능 최적화)
    if (newLength > 0) {
      const prevLastIds = prevActivitiesRef.current.slice(-5).map((a) => a.id);
      const newLastIds = newActivities.slice(-5).map((a) => a.id);

      if (JSON.stringify(prevLastIds) !== JSON.stringify(newLastIds)) {
        console.log('SearchResultsWithMap: ID 변경으로 allActivities 업데이트');
        setAllActivities(newActivities);
        prevActivitiesRef.current = newActivities;
      } else {
        console.log('SearchResultsWithMap: 동일한 데이터로 업데이트 스킵');
      }
    }
  }, []);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {isDesktop ? (
        <SearchResultMap activities={allActivities} className='lg:order-2' />
      ) : (
        <div className='relative overflow-hidden'>
          <div className='w-[48px] h-[6px] bg-gray-200 absolute bottom-[24px] left-1/2 -translate-x-1/2 z-30 rounded-full' />
          <div className='w-full h-[48px] bg-white absolute bottom-0 left-0 z-20 rounded-t-full gnb-shadow' />
          <SearchResultMap activities={allActivities} className='lg:order-2' />
        </div>
      )}
      <ActivityList
        initialActivities={initialActivities}
        initialCursor={initialCursor}
        onActivitiesUpdate={handleActivitiesUpdate}
        isSearching={true}
        className='lg:order-1'
      />
    </div>
  );
}
