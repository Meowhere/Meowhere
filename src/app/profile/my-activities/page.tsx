'use client';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import ManagementCards from './components/activity-management/ManagementCards';
import { useGnb } from '@/src/hooks/useGnb';
import { useRouter } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useInfiniteActivities } from '@/src/hooks/useInfiniteActivities';
import SkeletonActivitiesList from './components/skeleton-ui/SkeletonActivitiesList';
import NoActivities from '../components/NoActivities';

export default function MyActivitiesPage() {
  const router = useRouter();
  const { isDesktop } = useBreakpoint();
  useGnb({
    title: '내 체험 관리',
    subtitle: '',
    backAction: () => router.push('/profile'),
    rightButtons: [
      <Link
        key='register'
        className='text-md font-semibold text-primary-300'
        href='/profile/my-activities/register'
      >
        새 체험
      </Link>,
    ],
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteActivities();

  // 바닥 감지 ref
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // id 기준 중복 제거
  const activities = data?.pages.flatMap((page) => page.activities) ?? [];

  // 실제 데이터는 API 호출 등을 통해 가져올 수 있습니다.
  return (
    <div className='relative flex flex-col'>
      {isLoading ? (
        <SkeletonActivitiesList />
      ) : activities.length === 0 ? (
        <NoActivities
          title='등록된'
          urlPath='/profile/my-activities/register'
          buttonTitle='체험 등록하러 가기'
        />
      ) : (
        <div>
          {isDesktop && (
            <div className='absolute right-0 w-[128px]'>
              <BaseButton
                variant='primary'
                className='text-md font-semibold'
                onClick={() => router.push('/profile/my-activities/register')}
              >
                새 체험
              </BaseButton>
            </div>
          )}
          <ManagementCards activities={activities} />

          {/* 무한 스크롤 하단 */}
          {isFetchingNextPage && (
            <div className='flex flex-col items-center py-[24px] space-y-[8px]'>
              <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
              <p className='text-sm text-gray-500 dark:text-gray-400 animate-pulse'>
                체험을 불러오는 중입니다...
              </p>
            </div>
          )}

          {!hasNextPage && (
            <p className='text-center text-sm text-gray-400 dark:text-gray-500 py-2'>
              모든 체험을 확인하셨습니다.
            </p>
          )}

          <div ref={observerRef} className='h-[4px]' />
        </div>
      )}
    </div>
  );
}
