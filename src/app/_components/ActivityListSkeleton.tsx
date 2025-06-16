export default function ActivityListSkeleton({ count = 14 }: { count: number }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-[24px] lg:gap-x-[12px] lg:gap-y-[80px] mt-6 p-[24px] lg:px-[86px]'>
      {Array.from({ length: count }).map((_, i) => (
        <ActivityCardSkeleton key={i} />
      ))}
    </div>
  );
}

function ActivityCardSkeleton() {
  return (
    <article>
      <figure className='relative'>
        <div className='w-full aspect-square rounded-[20px] overflow-hidden bg-gray-200 dark:bg-gray-700 shimmer' />
      </figure>

      <div className='p-[8px] gap-[6px] flex flex-col'>
        <div className='h-[32px] bg-gray-200 dark:bg-gray-700 rounded shimmer' />
        <div className='h-[16px] bg-gray-200 dark:bg-gray-700 rounded shimmer w-3/4' />
      </div>
    </article>
  );
}
