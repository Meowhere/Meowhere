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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteReviews(activityId);

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

  const reviews = data?.pages.flatMap((page) => page.reviews) ?? [];

  return (
    <div className='overflow-y-auto px-[12px] scrollbar-hide'>
      <div className='flex justify-between items-center pt-[24px] pb-[12px]'>
        <span className='text-[2.2rem] font-semibold text-gray-800'>
          후기 {reviewCount.toLocaleString()}개
        </span>
        <div className='flex flex-row items-center gap-[4px]'>
          <StarFillIcon size={18} className='text-yellow-200' />
          <span className='text-[2.2rem] font-semibold text-gray-800'>
            {Number(rating).toFixed(1)}
          </span>
        </div>
      </div>

      {reviews.map((review, idx) => (
        <div key={review.id} className='pt-[12px]'>
          <ReviewCard
            nickname={review.user.nickname}
            profileImageUrl={review.user.profileImageUrl}
            createdAt={review.createdAt}
            content={review.content}
            rating={review.rating}
            variant='list'
          />
          {idx !== reviews.length - 1 && <Divider className='my-[16px]' />}
        </div>
      ))}

      {isFetchingNextPage && (
        <div className='flex flex-col items-center py-[24px] space-y-[8px]'>
          <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
          <p className='text-sm text-gray-500 animate-pulse'>후기를 불러오는 중입니다...</p>
        </div>
      )}

      {!hasNextPage && (
        <p className='text-center text-sm text-gray-400 py-2'>모든 후기를 확인하셨습니다.</p>
      )}

      <div ref={observerRef} className='h-[4px]' />
    </div>
  );
}
