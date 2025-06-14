'use client';
import { Activity } from '@/src/types/activity.types';
import Image from 'next/image';
import RatingLabel from '../../my-activities/components/activity-management/RatingLabel';
import LikeIcon from '@/src/components/common/icons/LikeIcon';
import { useFavoritesStore } from '@/src/store/favoritesStore';
import Link from 'next/link';

export default function FavoriteCard({ activity }: { activity: Activity }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(activity);
  };

  return (
    <Link href={`/activities/${activity.id}`}>
      <div className='flex justify-between border-b border-gray-200 last:border-b-0 py-[24px] w-full'>
        <div className='flex flex-row items-center justify-center gap-[10px] lg:gap-[14px]'>
          <div className='relative w-[84px] h-[84px] lg:w-[96px] lg:h-[96px]'>
            <Image
              src={activity.bannerImageUrl}
              alt={activity.title}
              fill
              className='object-cover object-center aspect-[1/1] rounded-[10px]'
              sizes='(min-width: 1024px) 96px, 84px'
            />
          </div>

          <div className='flex flex-col gap-[12px] lg:gap-[18px] lg:h-[98px]'>
            <RatingLabel rating={activity.rating} />
            <div className='flex flex-col justify-between gap-[12px]'>
              <p className='text-lg font-semibold text-gray-800 leading-none'>{activity.title}</p>
              <span className='text-sm font-regular text-gray-600 leading-none'>
                ₩{activity.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className='relative'>
          <LikeIcon
            showOverlay
            isFilled={isFavorite(activity.id)}
            onClick={handleLikeClick}
            className='absolute top-0 right-[16px] w-[32px] h-[32px] text-gray-300 cursor-pointer'
          />
        </div>
      </div>
    </Link>
  );
}
