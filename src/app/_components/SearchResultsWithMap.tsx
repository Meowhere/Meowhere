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

  // 초기 데이터가 변경 시 리셋
  useEffect(() => {
    setAllActivities(initialActivities);
    prevActivitiesRef.current = initialActivities;
  }, [initialActivities]);

  // 중복 업데이트 방지
  const handleActivitiesUpdate = useCallback((newActivities: Activity[]) => {
    const prevLength = prevActivitiesRef.current.length;
    const newLength = newActivities.length;

    // 무한스크롤 업데이트
    if (prevLength !== newLength) {
      setAllActivities(newActivities);
      prevActivitiesRef.current = newActivities;
      return;
    }

    // 무한스크롤 업데이트 중복 방지
    if (newLength > 0) {
      const prevLastIds = prevActivitiesRef.current.slice(-5).map((a) => a.id);
      const newLastIds = newActivities.slice(-5).map((a) => a.id);

      if (JSON.stringify(prevLastIds) !== JSON.stringify(newLastIds)) {
        setAllActivities(newActivities);
        prevActivitiesRef.current = newActivities;
      }
    }
  }, []);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {isDesktop ? (
        <SearchResultMap activities={allActivities} className='lg:order-2' />
      ) : (
        <div className='relative overflow-hidden'>
          <div className='w-[48px] h-[6px] bg-gray-200 dark:bg-gray-700 absolute bottom-[24px] left-1/2 -translate-x-1/2 z-20 rounded-full' />
          <div className='w-full h-[48px] bg-white dark:bg-black absolute bottom-0 left-0 z-[11] rounded-t-full gnb-shadow' />
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
