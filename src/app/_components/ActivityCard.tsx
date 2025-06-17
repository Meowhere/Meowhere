'use client';

import { Activity } from '@/src/types/activity.types';
import LikeIcon from '../../components/common/icons/LikeIcon';
import StarFillIcon from '../../components/common/icons/StarFillIcon';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useFavoritesStore } from '@/src/store/favoritesStore';
import { useState } from 'react';
import { useThemeStore } from '@/src/store/themeStore';

interface ActivityCardProps {
  activity: Activity;
  showLikeButton?: boolean;
}

export default function ActivityCard({ activity, showLikeButton }: ActivityCardProps) {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const { theme } = useThemeStore();
  const baseImageUrl =
    theme === 'light'
      ? '/assets/icons/logo/ico-image-loading.svg'
      : '/assets/icons/logo/ico-image-loading-dark.svg';

  const currentImgSrc = isUsingFallback ? baseImageUrl : activity.bannerImageUrl;
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(activity);
  };
  
  return (
    <article>
      <figure className='relative'>
        <div className='w-full aspect-square rounded-[20px] overflow-hidden'>
          <Image
            src={currentImgSrc}
            alt={activity.title}
            width={375}
            height={375}
            className='cursor-pointer hover:scale-105 transition-soft w-full aspect-square object-cover'
            onClick={() => router.push(`/activities/${activity.id}`)}
            onError={() => {
              setIsUsingFallback(true);
            }}
            blurDataURL={baseImageUrl}
          />
        </div>
        <div className='absolute top-[16px] left-[16px] flex items-center text-sm text-gray-500 dark:text-gray-400'>
          <div className='flex items-center justify-center gap-[4px] bg-white dark:bg-gray-800 rounded-full w-[58px] h-[24px] font-medium'>
            {activity.rating > 0 ? (
              <>
                <StarFillIcon size={14} className='text-yellow-200' />
                <span className='text-gray-900 dark:text-white'>{activity.rating.toFixed(1)}</span>
              </>
            ) : (
              <span className='text-gray-500 dark:text-gray-400 text-[1.1rem]'>평점 없음</span>
            )}
          </div>
        </div>
        {showLikeButton && (
          <LikeIcon
            showOverlay
            isFilled={isFavorite(activity.id)}
            onClick={handleLikeClick}
            className='absolute top-[16px] right-[16px] w-[32px] h-[32px] text-white cursor-pointer'
          />
        )}
      </figure>

      <div className='p-[8px] gap-[6px] flex flex-col'>
        <header>
          <h2 className='leading-[1.4] text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2'>
            {activity.title || '새로운 체험'}
          </h2>
        </header>

        <section>
          <address className='text-xs leading-none text-gray-500 dark:text-gray-400 not-italic'>
            {activity.address || '대한민국'}
          </address>
        </section>

        <footer className='leading-none flex justify-between items-center w-full text-[1.1rem] font-normal text-gray-500 dark:text-gray-400'>
          <span>{activity.price ? `${activity.price.toLocaleString()}원 / 인` : '가격 문의'}</span>
          <span>{activity.reviewCount > 0 ? `${activity.reviewCount}개의 후기` : '후기 없음'}</span>
        </footer>
      </div>
    </article>
  );
}
