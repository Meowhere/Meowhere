import StarFillIcon from '@/src/components/common/icons/StarFillIcon';

interface ExperienceSummarySectionProps {
  title: string;
  rating: string;
  reviewCount: number;
  address: string;
  category?: string;
}

export default function ExperienceSummarySection({
  title,
  rating,
  reviewCount,
  address,
  category,
}: ExperienceSummarySectionProps) {
  return (
    <section className='p-4 flex flex-col text-center lg:text-left'>
      <div className='flex flex-col'>
        <span className='text-md font-medium text-gray-600 dark:text-gray-400 mb-[12px]'>
          {category}
        </span>

        <h2 className='text-2xl font-bold mb-[16px] text-gray-700 dark:text-gray-200'>{title}</h2>

        <div className='flex items-center gap-[6px] text-md text-gray-600 dark:text-gray-400 justify-center lg:justify-start mb-[12px]'>
          <StarFillIcon className='w-[16px] h-[16px] text-yellow-200' />
          <div className='flex items-baseline gap-[6px]'>
            <span className='text-[1.4rem] font-medium text-gray-600 dark:text-gray-400'>
              {rating}
            </span>
            <span className='text-[1.2rem] font-regular text-gray-500 dark:text-gray-400'>
              {reviewCount}개의 후기
            </span>
          </div>
        </div>

        <p className='text-md font-regular text-gray-600 dark:text-gray-400'>{address}</p>
      </div>
    </section>
  );
}
