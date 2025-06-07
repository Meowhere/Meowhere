'use client';

import ReviewCard from './ReviewCard';
import ReviewSummary from './ReviewSummary';
import { getSatisfactionLabel } from '@/src/utils/getSatisfactionLabel';
import { Review } from '@/src/types/review.type';
import VerticalDivider from '../common/VerticleDivider';

interface ReviewSectionProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
  onOpenModal?: () => void;
}

export default function ReviewSection({
  rating,
  reviewCount,
  reviews,
  onOpenModal,
}: ReviewSectionProps) {
  const previewReviews = reviews.slice(0, 4);

  return (
    <section className='px-4 py-6'>
      <div className='flex justify-center items-center'>
        <ReviewSummary
          rating={rating}
          reviewCount={reviewCount}
          satisfactionLabel={getSatisfactionLabel(rating)}
        />
      </div>

      <div className='flex gap-4 overflow-x-auto pb-2 snap-x scroll-smooth scrollbar-hide'>
        {previewReviews.map((review, idx) => (
          <div key={review.id} className='flex items-stretch'>
            <div className='snap-start shrink-0 w-[256px] mr-[12px]'>
              <ReviewCard
                nickname={review.user.nickname}
                profileImageUrl={review.user.profileImageUrl}
                createdAt={review.createdAt}
                content={review.content}
                rating={review.rating}
              />
            </div>

            {idx !== previewReviews.length - 1 && <VerticalDivider className='ml-[12px]' />}
          </div>
        ))}
      </div>

      <button
        className='mt-[24px] w-full px-0 py-[12px] text-sm text-gray-800 bg-gray-100 rounded-[14px] text-center'
        onClick={onOpenModal}
      >
        모든 후기 보기
      </button>
    </section>
  );
}
