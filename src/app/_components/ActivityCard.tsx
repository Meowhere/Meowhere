'use client';

import LikeIcon from '../../components/common/icons/LikeIcon';
import StarFillIcon from '../../components/common/icons/StarFillIcon';
import { useRouter } from 'next/navigation';

export default function ActivityCard({ activity }: { activity: any }) {
  const router = useRouter();

  return (
    <article key={activity.id}>
      <figure className='relative'>
        <img
          src={activity.bannerImageUrl}
          alt={activity.title}
          className='w-full aspect-square object-cover rounded-[20px] cursor-pointer'
          onClick={() => router.push(`/activities/${activity.id}`)}
        />
        <div className='absolute top-[16px] left-[16px] flex items-center text-sm text-gray-500'>
          <div className='flex items-center justify-center gap-[4px] bg-white rounded-full w-[58px] h-[24px] font-medium'>
            <StarFillIcon size={14} className='text-yellow-200' /> {activity.rating.toFixed(1)}
          </div>
        </div>
        <LikeIcon
          showOverlay
          className='absolute top-[16px] right-[16px] w-[32px] h-[32px] text-white'
        />
      </figure>

      <div className='p-[8px] gap-[6px] flex flex-col'>
        <header>
          <h2 className='leading-[1.4] text-sm font-semibold text-gray-800 line-clamp-2'>
            {activity.title}
          </h2>
        </header>

        <section>
          <address className='text-xs leading-none text-gray-500 not-italic'>
            {activity.address}
          </address>
        </section>

        <footer className='leading-none flex justify-between items-center w-full text-[1.1rem] font-normal text-gray-500'>
          <span>{activity.price.toLocaleString()}원 / 인</span>
          <span>{activity.reviewCount}개의 후기</span>
        </footer>
      </div>
    </article>
  );
}
