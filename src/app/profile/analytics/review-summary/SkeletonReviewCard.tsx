'use client';

export default function SkeletonReviewCard() {
  return (
    <div className='shimmer rounded-[12px] border border-gray-100 dark:border-gray-300 bg-white dark:bg-gray-800 p-[20px] space-y-[12px]'>
      <div className='h-[20px] w-[50%] bg-gray-200 dark:bg-gray-300 rounded' />

      <div className='h-[16px] w-[30%] bg-gray-200 dark:bg-gray-300 rounded' />

      <div className='h-[1px] bg-gray-200 dark:bg-gray-300 ' />

      <div className='space-y-[6px]'>
        <div className='h-[14px] w-full bg-gray-200 dark:bg-gray-300 rounded' />
        <div className='h-[14px] w-[80%] bg-gray-200 dark:bg-gray-300 rounded' />
      </div>
    </div>
  );
}
