'use client';

export default function ExperienceDetailSkeleton() {
  return (
    <div className='max-w-[1200px] mx-auto px-4 py-10 animate-pulse'>
      <div className='flex flex-col lg:flex-row gap-12 mb-16'>
        <div className='flex-[1.2] w-full aspect-square bg-gray-200 rounded-2xl' />
        <div className='flex-1 flex flex-col gap-4'>
          <div className='h-6 w-3/4 bg-gray-200 rounded-md' />
          <div className='h-4 w-1/3 bg-gray-200 rounded-md' />
          <div className='h-4 w-1/2 bg-gray-200 rounded-md' />
          <div className='h-10 w-full bg-gray-300 rounded-md mt-4' />
        </div>
      </div>

      <div className='mb-16'>
        <div className='h-6 w-[200px] bg-gray-200 rounded-md mb-4' />
        <div className='w-full h-[240px] bg-gray-200 rounded-xl' />
      </div>
      <div className='mb-16'>
        <div className='h-6 w-[200px] bg-gray-200 rounded-md mb-4' />
        <div className='space-y-3'>
          <div className='h-4 w-full bg-gray-200 rounded-md' />
          <div className='h-4 w-5/6 bg-gray-200 rounded-md' />
          <div className='h-4 w-3/4 bg-gray-200 rounded-md' />
        </div>
      </div>
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
  );
}
