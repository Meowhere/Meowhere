'use client';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function SkeletonRegisterForm() {
  const { isDesktop } = useBreakpoint();
  return (
    <div className='w-full flex flex-col gap-[48px] lg:gap-[64px] px-[24px] pb-[96px] mb-[300px]'>
      {/* 메인 이미지 업로드 */}
      <div className='flex flex-col gap-[20px]'>
        <div className='w-[100px] h-[32px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
        <div className='w-[160px] aspect-square rounded-[8px] animate-pulse bg-gray-200 dark:bg-gray-600' />
      </div>
      {/* 소개 이미지 업로드 */}
      <div className='flex flex-col gap-[20px]'>
        <div className='w-[100px] h-[32px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
        <div className='w-[160px] aspect-square rounded-[8px] animate-pulse bg-gray-200 dark:bg-gray-600' />
      </div>
      {/* 체험 정보 */}
      <div className='flex flex-col gap-[20px]'>
        <div className='w-[100px] h-[32px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
        <div className='flex flex-col gap-[26px]'>
          <div className='w-full h-[56px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
          <div className='w-full h-[56px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
          <div className='w-full h-[56px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
          <div className='w-full h-[76px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
        </div>
      </div>
      {/* 체험 일정 */}
      <div className='flex flex-col gap-[20px]'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center lg:gap-[18px]'>
            <div className='w-[100px] h-[32px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
            <div className='w-[24px] aspect-square rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
          </div>
          {isDesktop && (
            <div className='w-[176px] h-[44px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
          )}
        </div>
        <div className='w-full h-[56px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
        <div className='w-full h-[56px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
      </div>
      {isDesktop && (
        <div className='relative'>
          <div className='w-[128px] h-[40px] absolute right-0 rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
        </div>
      )}
      {!isDesktop && (
        <div className='w-full h-[56px] rounded animate-pulse bg-gray-200 dark:bg-gray-600' />
      )}
    </div>
  );
}
