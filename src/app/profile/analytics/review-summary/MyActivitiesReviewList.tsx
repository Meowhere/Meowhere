'use client';

import { useMyActivities } from '@/src/hooks/useMyActivities';
import MyActivityReviewCard from './MyActivityReviewCard';

interface MyActivitiesReviewListProps {
  today: Date;
}

export default function MyActivitiesReviewList({ today }: MyActivitiesReviewListProps) {
  const { myActivities, isLoading, isError } = useMyActivities(today);

  if (isLoading) return <p className='text-gray-500'>체험 목록 불러오는 중...</p>;
  if (isError || !myActivities) return <p className='text-red-500'>불러오기 실패</p>;

  // 평점 높은 순 → 리뷰 수 많은 순 정렬
  const sorted = [...myActivities].sort(
    (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
  );

  return (
    <div className='space-y-6'>
      {sorted.map((activity) => (
        <MyActivityReviewCard
          key={activity.id}
          activityId={activity.id}
          title={activity.title}
          rating={activity.rating}
          reviewCount={activity.reviewCount}
        />
      ))}
    </div>
  );
}
