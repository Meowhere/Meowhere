'use client';

import StarFillIcon from '@/src/components/common/icons/StarFillIcon';

interface ExperienceSummarySectionProps {
  title: string;
  rating: string;
  reviewCount: number;
  address: string;
}

export default function ExperienceSummarySection({
  title,
  rating,
  reviewCount,
  address,
}: ExperienceSummarySectionProps) {
  return (
    <section className='p-4 max-w-4xl mx-auto'>
      <div className='text-center gap-8'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <div className='flex items-center justify-center gap-4 mt-1 text-md text-gray-600'>
          <StarFillIcon className='width={16} height={16} text-yellow-200' />
          <div className='flex items-baseline gap-4 mt-1'>
            <span className='text-[1.4rem] font-medium text-gray-600'>{rating}</span>
            <span className='text-[1.2rem] font-regular text-gray-500'>{reviewCount}개의 후기</span>
          </div>
        </div>
        <p className='mt-1 text-md font-regular text-gray-600'>{address}</p>
      </div>
    </section>
  );
}
