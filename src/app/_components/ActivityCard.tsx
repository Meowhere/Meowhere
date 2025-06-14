'use client';

import { Activity } from '@/src/types/activity.types';
import LikeIcon from '../../components/common/icons/LikeIcon';
import StarFillIcon from '../../components/common/icons/StarFillIcon';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function ActivityCard({ activity }: { activity: Activity }) {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(activity.bannerImageUrl);

  return (
    <article>
      <figure className='relative'>
        <Image
          src={imgSrc}
          alt={activity.title}
          width={375}
          height={375}
          className='w-full aspect-square object-cover rounded-[20px] cursor-pointer'
          onClick={() => router.push(`/activities/${activity.id}`)}
          onError={() => {
            setImgSrc('/assets/icons/logo/ico-image-loading.svg');
          }}
          blurDataURL={'/assets/icons/logo/ico-image-loading.svg'}
        />
        <div className='absolute top-[16px] left-[16px] flex items-center text-sm text-gray-500'>
          <div className='flex items-center justify-center gap-[4px] bg-white rounded-full w-[58px] h-[24px] font-medium'>
            {activity.rating > 0 ? (
              <>
                <StarFillIcon size={14} className='text-yellow-200' /> {activity.rating.toFixed(1)}
              </>
            ) : (
              <span className='text-gray-500 text-[1.1rem]'>평점 없음</span>
            )}
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
            {activity.title || '새로운 체험'}
          </h2>
        </header>

        <section>
          <address className='text-xs leading-none text-gray-500 not-italic'>
            {activity.address || '대한민국'}
          </address>
        </section>

        <footer className='leading-none flex justify-between items-center w-full text-[1.1rem] font-normal text-gray-500'>
          <span>{activity.price ? `${activity.price.toLocaleString()}원 / 인` : '가격 문의'}</span>
          <span>{activity.reviewCount > 0 ? `${activity.reviewCount}개의 후기` : '후기 없음'}</span>
        </footer>
      </div>
    </article>
  );
}
