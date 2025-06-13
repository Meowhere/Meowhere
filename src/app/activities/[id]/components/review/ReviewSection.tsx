'use client';

import ReviewCard from './ReviewCard';
import ReviewSummary from './ReviewSummary';
import { getSatisfactionLabel } from '@/src/utils/getSatisfactionLabel';
import { Review } from '@/src/types/review.type';
import { useModal } from '@/src/hooks/useModal';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

interface ReviewSectionProps {
  activityId: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export default function ReviewSection({
  activityId,
  rating,
  reviewCount,
  reviews,
}: ReviewSectionProps) {
  const { openReviewListModal } = useModal();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  // 데스크탑에서는 일단 숨김 (추후 구현 예정)
  if (isDesktop) return null;

  return (
    <section className='px-4 py-6'>
      {/* 후기 요약 */}
      <div className='flex justify-center items-center'>
        <ReviewSummary
          rating={rating}
          reviewCount={reviewCount}
          satisfactionLabel={getSatisfactionLabel(rating)}
        />
      </div>

      {/* 모바일: 슬라이더 형식으로 최대 4개 */}
      {isMobile && (
        <div className='flex gap-4 overflow-x-auto pb-2 snap-x scroll-smooth scrollbar-hide mt-4'>
          {reviews.slice(0, 4).map((review) => (
            <div key={review.id} className='snap-start shrink-0 w-[256px]'>
              <ReviewCard
                nickname={review.user.nickname}
                profileImageUrl={review.user.profileImageUrl}
                createdAt={review.createdAt}
                content={review.content}
                rating={review.rating}
              />
            </div>
          ))}
        </div>
      )}

      {/* 태블릿: 슬라이더 없이 2개 고정 */}
      {isTablet && (
        <div className='flex gap-4 w-full mt-4'>
          {reviews.slice(0, 2).map((review) => (
            <div key={review.id} className='w-full'>
              <ReviewCard
                nickname={review.user.nickname}
                profileImageUrl={review.user.profileImageUrl}
                createdAt={review.createdAt}
                content={review.content}
                rating={review.rating}
              />
            </div>
          ))}
        </div>
      )}

      {/* 후기 전체 보기 버튼 */}
      <button
        className='mt-[24px] w-full px-0 py-[12px] text-sm text-gray-800 bg-gray-100 rounded-[14px] text-center'
        onClick={() =>
          openReviewListModal({
            activityId,
            rating,
            reviewCount,
            satisfactionLabel: getSatisfactionLabel(rating),
          })
        }
      >
        모든 후기 보기
      </button>
    </section>
  );
}
