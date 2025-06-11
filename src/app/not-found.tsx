'use client';
import Image from 'next/image';
import { usePopularActivities } from '../hooks/usePopularActivities';
import RecommendList from './_components/RecommendList';

export default function NotFound() {
  const { data, isError, isLoading } = usePopularActivities(6);

  // 추천 데이터가 있는지 확인
  const hasRecommendations = data && data.activities && data.activities.length > 0;

  return (
    <div className='min-h-screen flex flex-col items-center'>
      <div className='flex flex-col items-center justify-center gap-[12px] lg:gap-[16px] my-[160px]'>
        <div className='relative w-[148px] h-[148px] lg:w-[296px] lg:h-[296px]'>
          <Image
            src='/assets/icons/logo/ico-empty-view-logo.svg'
            alt='empty logo'
            fill
            className='object-contain'
            sizes='82px, (min-width: 1024px) 164px'
          />
        </div>
        <h1 className='font-semibold text-gray-300 text-2xl lg:text-7xl'>준비 중인 공간</h1>
        <div className='flex flex-col items-center text-xs lg:text-sm font-regular text-gray-400'>
          <span>여기는 아직 준비 중이에요.</span>
          <span>다른 체험을 함께 찾아볼까요?</span>
        </div>
      </div>
      <div className='text-center'>
        <h2 className='font-semibold text-gray-300 text-2xl'>이런 체험은 어떠세요?</h2>
        {!isLoading && !isError && hasRecommendations && (
          <RecommendList activities={data.activities} />
        )}
      </div>
    </div>
  );
}
