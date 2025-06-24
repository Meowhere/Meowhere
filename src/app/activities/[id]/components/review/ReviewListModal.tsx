'use client';

import { useRef, useEffect } from 'react';
import { useInfiniteReviews } from '@/src/hooks/useInfiniteReviews';
import ReviewCard from './ReviewCard';
import Divider from '../common/Divider';
import StarFillIcon from '@/src/components/common/icons/StarFillIcon';

export interface ReviewListModalProps {
  activityId: number;
  rating: number;
  reviewCount: number;
  satisfactionLabel: string;
}

export default function ReviewListModal({ activityId, reviewCount, rating }: ReviewListModalProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteReviews(
    activityId,
    { size: 10 }
  );

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 중복 제거를 위한 로직 추가
  const allReviews = data?.pages?.flatMap((page) => page?.reviews || []) ?? [];
  const uniqueReviews = allReviews.filter(
    (review, index, array) => array.findIndex((r) => r.id === review.id) === index
  );

  console.log('🔍 Debug Info:', {
    pages: data?.pages?.length,
    allReviewsCount: allReviews.length,
    uniqueReviewsCount: uniqueReviews.length,
    hasNextPage,
    isFetchingNextPage,
  });

  // 초기 로딩 중이면 로딩 스피너 반환
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-[70vh]'>
        <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
        <p className='mt-4 text-sm text-gray-500 dark:text-gray-400 animate-pulse'>
          후기를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-[70vh] max-h-[70vh] overflow-hidden'>
      <div className='flex justify-between items-center px-[16px] pt-[24px] pb-[12px] shrink-0'>
        <span className='text-[2.2rem] font-semibold text-gray-800 dark:text-gray-200'>
          후기 {reviewCount.toLocaleString()}개
        </span>
        <div className='flex items-center gap-[4px]'>
          <StarFillIcon size={18} className='text-yellow-200' />
          <span className='text-[2.2rem] font-semibold text-gray-800 dark:text-gray-200'>
            {Number(rating).toFixed(1)}
          </span>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto px-[16px] pt-[16px] scrollbar-hide'>
        {uniqueReviews.map((review, idx) => (
          <div key={review.id} className='pb-[16px]'>
            <ReviewCard
              nickname={review.user.nickname}
              profileImageUrl={review.user.profileImageUrl}
              createdAt={review.createdAt}
              content={review.content}
              rating={review.rating}
              variant='list'
            />
            {idx !== uniqueReviews.length - 1 && <Divider className='my-[16px]' />}
          </div>
        ))}

        {isFetchingNextPage && (
          <div className='flex flex-col items-center py-[24px] space-y-[8px]'>
            <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
            <p className='text-sm text-gray-500 dark:text-gray-400 animate-pulse'>
              후기를 불러오는 중입니다...
            </p>
          </div>
        )}

        {!hasNextPage && uniqueReviews.length > 0 && (
          <p className='text-center text-sm text-gray-400 dark:text-gray-500 py-4'>
            모든 후기를 확인했어요
          </p>
        )}

        <div ref={observerRef} className='h-[4px]' />
      </div>
    </div>
  );
}
