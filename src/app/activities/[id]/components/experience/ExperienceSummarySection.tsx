'use client';

import StarFillIcon from '@/src/components/common/icons/StarFillIcon';

const dummyExperience = {
  title: '함께 배우면 즐거운 스트릿 댄스',
  rating: 4.9,
  reviewCount: 239,
  location: '서울 중구 충무로길 100 10F',
};

export default function ExperienceSummarySection() {
  return (
    <section className='p-4 max-w-4xl mx-auto'>
      <div className='text-center gap-8'>
        <h2 className='text-2xl font-bold'>{dummyExperience.title}</h2>
        <div className='flex items-center justify-center gap-4 mt-1 text-md text-gray-600'>
          <StarFillIcon className='width={16} height={16} text-yellow-200' />
          <div className='flex items-baseline gap-4 mt-1'>
            <span className='text-[1.4rem] font-medium text-gray-600'>
              {dummyExperience.rating}
            </span>
            <span className='text-[1.2rem] font-regular text-gray-500'>
              {dummyExperience.reviewCount}개의 후기
            </span>
          </div>
        </div>
        <p className='mt-1 text-md font-regular text-gray-600'>{dummyExperience.location}</p>
      </div>
    </section>
  );
}
