'use client';

export default function ExperienceDetailSkeleton() {
  return (
    <>
      {/* 데스크탑 */}
      <div className='hidden lg:block'>
        <div className='max-w-[1200px] mx-auto flex gap-[48px] px-4 mt-[64px] justify-center items-center'>
          {/* 이미지 */}
          <div className='flex-[1.2] w-full aspect-square bg-gray-200 rounded-2xl' />
          {/* 정보 */}
          <div className='flex-1 relative flex flex-col gap-6'>
            <div className='flex flex-row gap-2 absolute items-center justify-center top-[2px] right-[2px] z-10'>
              <div className='w-8 h-8 bg-gray-200 rounded-full' />
              <div className='w-8 h-8 bg-gray-200 rounded-full' />
              <div className='w-8 h-8 bg-gray-200 rounded-full' />
            </div>
            {/* 요약 세션 */}
            <div className='mt-10 space-y-3'>
              <div className='h-6 w-2/3 bg-gray-200 rounded-md' />
              <div className='h-4 w-1/3 bg-gray-200 rounded-md' />
              <div className='h-4 w-1/2 bg-gray-200 rounded-md' />
            </div>
            {/* 예약 */}
            <div className='mt-8 w-full max-w-[500px] mx-auto px-[8px] pt-[8px]'>
              <div className='flex justify-between items-center'>
                <div className='h-6 w-1/3 bg-gray-200 rounded-md' />
                <div className='h-10 w-[120px] bg-gray-300 rounded-full' />
              </div>
            </div>
          </div>
        </div>
        <div className='max-w-[1200px] mx-auto px-4 flex flex-col gap-[48px] mt-[80px]'>
          <div className='h-[1px] w-full bg-gray-100 mb-8' />
          {/* 위치 */}
          <div>
            <div className='h-6 w-[200px] bg-gray-200 rounded-md mb-4' />
            <div className='w-full h-[240px] bg-gray-200 rounded-xl' />
          </div>
          {/* 설명 */}
          <div>
            <div className='h-6 w-[200px] bg-gray-200 rounded-md mb-4' />
            <div className='space-y-3'>
              <div className='h-4 w-full bg-gray-200 rounded-md' />
              <div className='h-4 w-5/6 bg-gray-200 rounded-md' />
              <div className='h-4 w-3/4 bg-gray-200 rounded-md' />
            </div>
          </div>
          {/* 리뷰 */}
          <div>
            <div className='h-6 w-[200px] bg-gray-200 rounded-md mb-4' />
            <div className='space-y-6'>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className='border border-gray-200 p-4 rounded-xl space-y-2 bg-white'>
                  <div className='h-4 w-1/4 bg-gray-200 rounded-md' />
                  <div className='h-4 w-5/6 bg-gray-200 rounded-md' />
                  <div className='h-4 w-2/3 bg-gray-200 rounded-md' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 모바일 태블릿 */}
      <div className='lg:hidden w-full lg:max-w-4xl lg:mx-auto px-[16px] md:px-[24px] flex flex-col gap-[48px] animate-pulse'>
        <div className='w-full aspect-square bg-gray-200 rounded-2xl' />
        <div className='flex flex-col gap-[24px]'>
          <div className='space-y-3'>
            <div className='h-6 w-2/3 bg-gray-200 rounded-md' />
            <div className='h-4 w-1/3 bg-gray-200 rounded-md' />
            <div className='h-4 w-1/2 bg-gray-200 rounded-md' />
          </div>
          <div className='flex flex-row gap-[24px] items-center justify-center'>
            <div className='w-6 h-6 bg-gray-200 rounded-full' />
            <div className='w-6 h-6 bg-gray-200 rounded-full' />
          </div>
        </div>
        <div className='h-[1px] w-full bg-gray-100 mb-8' />
        {/* 위치 */}
        <div className='flex flex-col gap-[24px]'>
          <div className='h-6 w-[200px] bg-gray-200 rounded-md mb-4' />
          <div className='w-full h-[240px] bg-gray-200 rounded-xl' />
        </div>
        <div className='h-[1px] w-full bg-gray-100 mb-8' />
        {/* 설명 */}
        <div className='flex flex-col gap-[24px]'>
          <div className='h-6 w-[200px] bg-gray-200 rounded-md mb-4' />
          <div className='space-y-3'>
            <div className='h-4 w-full bg-gray-200 rounded-md' />
            <div className='h-4 w-5/6 bg-gray-200 rounded-md' />
            <div className='h-4 w-3/4 bg-gray-200 rounded-md' />
          </div>
        </div>
        <div className='h-[1px] w-full bg-gray-100 mb-8' />
        {/* 리뷰 */}
        <div className='flex flex-col gap-[24px]'>
          <div className='h-6 w-[200px] bg-gray-200 rounded-md mb-4' />
          <div className='space-y-6'>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className='border border-gray-200 p-4 rounded-xl space-y-2 bg-white'>
                <div className='h-4 w-1/4 bg-gray-200 rounded-md' />
                <div className='h-4 w-5/6 bg-gray-200 rounded-md' />
                <div className='h-4 w-2/3 bg-gray-200 rounded-md' />
              </div>
            ))}
          </div>
        </div>
        {/* 예약 */}
        <div className='w-full max-w-[500px] mx-auto px-[8px] pt-[8px] mt-8'>
          <div className='flex justify-between items-center'>
            <div className='h-6 w-1/3 bg-gray-200 rounded-md' />
            <div className='h-10 w-[120px] bg-gray-300 rounded-full' />
          </div>
        </div>
      </div>
    </>
  );
}
