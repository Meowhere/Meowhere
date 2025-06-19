'use client';
import RatingLabel from './RatingLabel';
import { MyActivitiesProps } from '@/src/types/my-activities.types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Image from 'next/image';
import ManagementDropdown from './ManagementDropdown';
import { useRouter } from 'next/navigation';

export default function ManagementCard({
  id,
  title,
  bannerImageUrl,
  price,
  rating,
  ...rest
}: MyActivitiesProps) {
  const { isDesktop } = useBreakpoint();
  const router = useRouter();

  const handleClick = () => {
    router.push(`profile/activities/${id}`);
  };

  return (
    <div className='flex justify-between border-b border-gray-200 dark:border-gray-700 last:border-b-0 py-[24px] w-full'>
      <div
        className='flex flex-row items-center justify-center gap-[10px] lg:gap-[14px] cursor-pointer'
        onClick={handleClick}
      >
        <Image
          src={bannerImageUrl}
          alt={title}
          width={isDesktop ? 98 : 84}
          height={isDesktop ? 98 : 84}
          className='rounded-[8px] lg:rounded-[10px] object-cover object-center aspect-[1/1]'
        />
        <div className='flex flex-col gap-[12px] lg:gap-[18px] lg:h-[98px]'>
          <RatingLabel rating={rating} />
          <div className='flex flex-col justify-between gap-[12px]'>
            <p className='text-lg font-semibold text-gray-800 dark:text-gray-200 leading-none'>
              {title}
            </p>
            <span className='text-sm font-regular text-gray-600 dark:text-gray-400 leading-none'>
              ₩{price.toLocaleString()} /인
            </span>
          </div>
        </div>
      </div>
      <ManagementDropdown title={title} activityId={id} />
    </div>
  );
}
