'use client';

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
    <div className='rounded-[12px] border border-gray-100 bg-white p-[20px] shadow-sm space-y-[12px]'>
      <div>
        <h2 className='text-lg font-bold text-black mb-[4px]'>{title}</h2>
        <p className='text-sm text-gray-600'>
          ⭐ {rating.toFixed(1)} / 리뷰 {reviewCount}개
        </p>
      </div>

      <div className='h-[1px] bg-gray-200' />

      {isLoading ? (
        <p className='text-sm text-gray-400'>리뷰 불러오는 중...</p>
      ) : reviews.length === 0 ? (
        <p className='text-sm text-gray-400'>리뷰가 아직 없어요.</p>
      ) : (
        <ul className='space-y-[4px]'>
          {reviews.map((review) => (
            <li key={review.id} className='text-sm text-gray-800'>
              “{review.content}”
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
