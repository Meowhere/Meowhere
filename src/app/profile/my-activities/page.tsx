'use client';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import ManagementCards from './components/activity-management/ManagementCards';
import NotFoundActivities from './components/NotFoundActivities';
import { useGnb } from '@/src/hooks/useGnb';
import { useRouter } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Link from 'next/link';
import { DUMMY_DATA } from './components/DummyData';
import { useEffect, useState, useRef } from 'react';

export default function MyActivitiesPage() {
  const router = useRouter();
  const { isDesktop } = useBreakpoint();
  useGnb({
    title: '내 체험 관리',
    subtitle: '',
    backAction: () => router.back(),
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

  // 무한스크롤에 보여줄 개수 설정 (한 번에 4개씩)
  const PAGE_SIZE = 6;
  const [page, setPage] = useState(1);

  // 실제로 화면에 보일 데이터 (더미에서 n개씩 잘라서 보여줌)
  const visibleActivities = DUMMY_DATA.slice(0, page * PAGE_SIZE);

  // 바닥 감지 ref
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 다음 페이지 존재 여부
  const hasNextPage = visibleActivities.length < DUMMY_DATA.length;
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          setIsFetchingNextPage(true);
          setTimeout(() => {
            // 실제 API라면 fetch 후에 setPage
            setPage((prev) => prev + 1);
            setIsFetchingNextPage(false);
          }, 800); // 로딩 감성용 0.8초 delay
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

  // 실제 데이터는 API 호출 등을 통해 가져올 수 있습니다.
  return (
    <div className='relative flex flex-col mx-[24px] my-[112px]'>
      {visibleActivities.length === 0 ? (
        <NotFoundActivities />
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
          <ManagementCards activities={visibleActivities} />

          {/* 무한 스크롤 하단 */}
          {isFetchingNextPage && (
            <div className='flex flex-col items-center py-[24px] space-y-[8px]'>
              <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
              <p className='text-sm text-gray-500 animate-pulse'>체험을 불러오는 중입니다...</p>
            </div>
          )}

          {!hasNextPage && (
            <p className='text-center text-sm text-gray-400 py-2'>모든 체험을 확인하셨습니다.</p>
          )}

          <div ref={observerRef} className='h-[4px]' />
        </div>
      )}
    </div>
  );
}
