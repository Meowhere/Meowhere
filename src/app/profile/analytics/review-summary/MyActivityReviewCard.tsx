'use client';

import StarFillIcon from '@/src/components/common/icons/StarFillIcon';
import { useReviews } from '@/src/hooks/activities/useReviews';

interface MyActivityReviewCardProps {
  activityId: number;
  title: string;
  rating: number;
  reviewCount: number;
}

interface Review {
  id: number;
  content: string;
}

export default function MyActivityReviewCard({
  activityId,
  title,
  rating,
  reviewCount,
}: MyActivityReviewCardProps) {
  const { data, isLoading } = useReviews(activityId);
  const reviews: Review[] = data?.reviews?.slice(0, 2) ?? [];

  return (
    <div className='rounded-[12px] border border-gray-100 dark:border-gray-300 bg-white dark:bg-gray-800 p-[20px] space-y-[12px]'>
      <h2 className='text-lg font-bold text-gray-700 dark:text-gray-100 mb-[4px]'>{title}</h2>
      <div className='flex items-center gap-[4px] text-sm text-gray-600 dark:text-gray-400'>
        <StarFillIcon className='w-[16px] h-[16px] text-yellow-200' />
        <span>
          {rating.toFixed(1)} · 리뷰 {reviewCount}개
        </span>
      </div>
      <div className='h-[1px] bg-gray-200 dark:bg-gray-400' />
      {isLoading ? (
        <p className='text-sm text-gray-400 dark:text-gray-400'>리뷰 불러오는 중...</p>
      ) : reviews.length === 0 ? (
        <p className='text-sm text-gray-400 dark:text-gray-400'>리뷰가 아직 없어요.</p>
      ) : (
        <ul className='space-y-[4px]'>
          {reviews.map((review) => (
            <li key={review.id} className='text-sm text-gray-700 dark:text-gray-200'>
              “{review.content}”
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
