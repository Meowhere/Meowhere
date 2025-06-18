'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Activity } from '../../types/activity.types';
import SearchResultMap from './SearchResultMap';
import ActivityList from './ActivityList';

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

  // 초기 데이터가 변경될 때 (새로운 검색/필터) 상태 리셋
  useEffect(() => {
    setAllActivities(initialActivities);
    prevActivitiesRef.current = initialActivities;
  }, [initialActivities]);

  // useCallback으로 함수 메모이제이션 + 중복 업데이트 방지
  const handleActivitiesUpdate = useCallback((newActivities: Activity[]) => {
    const prevLength = prevActivitiesRef.current.length;
    const newLength = newActivities.length;

    // 길이가 다르면 확실히 다른 데이터
    if (prevLength !== newLength) {
      setAllActivities(newActivities);
      prevActivitiesRef.current = newActivities;
      return;
    }

    // 길이가 같으면 마지막 몇 개 요소의 ID만 비교 (성능 최적화)
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
    <div className='grid grid-cols-2 gap-4'>
      <ActivityList
        initialActivities={initialActivities}
        initialCursor={initialCursor}
        onActivitiesUpdate={handleActivitiesUpdate}
        isSearching={true}
      />
      <SearchResultMap activities={allActivities} />
    </div>
  );
}
