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

  return (
    <section className='p-[4px]'>
      {/* 데스크탑 */}
      {isDesktop && (
        <div className='w-full flex flex-col items-start px-0'>
          <div className='w-full mx-0 gap-[24px]'>
            {/* 요약 */}
            <div>
              <ReviewSummary
                rating={rating}
                reviewCount={reviewCount}
                satisfactionLabel={getSatisfactionLabel(rating)}
              />
            </div>

            <div className='grid grid-cols-2 w-full gap-[16px]'>
              {reviews.slice(0, 4).map((review) => (
                <ReviewCard
                  key={review.id}
                  nickname={review.user.nickname}
                  profileImageUrl={review.user.profileImageUrl}
                  createdAt={review.createdAt}
                  content={review.content}
                  rating={review.rating}
                />
              ))}
            </div>

            <div className='w-full flex justify-center mt-[32px]'>
              <button
                className='px-6 py-[12px] w-full max-w-[500px] text-sm text-gray-800 bg-gray-100 rounded-full hover:bg-gray-200 transition'
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
            </div>
          </div>
        </div>
      )}

      {/* 모바일 */}
      {isMobile && (
        <>
          <div className='flex justify-center items-center'>
            <ReviewSummary
              rating={rating}
              reviewCount={reviewCount}
              satisfactionLabel={getSatisfactionLabel(rating)}
            />
          </div>

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

          <div className='w-full flex justify-center mt-[32px]'>
            <button
              className='w-full max-w-[500px] px-6 py-[12px] text-sm text-gray-800 bg-gray-100 rounded-full hover:bg-gray-200 transition'
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
          </div>
        </>
      )}

      {/* 태블릿 */}
      {isTablet && (
        <>
          <div className='flex justify-center items-center'>
            <ReviewSummary
              rating={rating}
              reviewCount={reviewCount}
              satisfactionLabel={getSatisfactionLabel(rating)}
            />
          </div>

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
        </>
      )}
    </section>
  );
}
