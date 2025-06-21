'use client';

import { useState } from 'react';
import { useMyActivities } from '@/src/hooks/useMyActivities';
import MyActivityReviewCard from './MyActivityReviewCard';
import BaseButton from '@/src/components/common/buttons/BaseButton';

interface MyActivitiesReviewListProps {
  today: Date;
}

export default function MyActivitiesReviewList({ today }: MyActivitiesReviewListProps) {
  const { myActivities, isLoading, isError } = useMyActivities(today);
  const [visibleCount, setVisibleCount] = useState(10); // 처음 10개 보여주기

  if (isLoading)
    return (
      <p className='text-gray-500 dark:text-gray-400'>
        잠시만 기다려 주세요, 리뷰 데이터를 불러오고 있어요.
      </p>
    );
  if (isError || !myActivities) return <p className='text-red-300'>불러오기 실패</p>;

  const sorted = [...myActivities].sort(
    (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
  );

  // 평점 높은 순 → 리뷰 수 많은 순 정렬
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className='space-y-6'>
      {sorted.slice(0, visibleCount).map((activity) => (
        <MyActivityReviewCard
          key={activity.id}
          activityId={activity.id}
          title={activity.title}
          rating={activity.rating}
          reviewCount={activity.reviewCount}
        />
      ))}

      {visibleCount < sorted.length && (
        <div className='mt-[16px] flex justify-center'>
          <BaseButton
            variant='outline'
            className='w-auto px-[28px] text-md hover:bg-gray-100 dark:hover:bg-gray-700'
            onClick={handleLoadMore}
          >
            더보기
          </BaseButton>
        </div>
      )}
    </div>
  );
}
