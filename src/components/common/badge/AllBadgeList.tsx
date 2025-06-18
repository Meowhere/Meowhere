'use client';

import { useMyBadge } from '@/src/hooks/useMyBadge';
import Image from 'next/image';
import clsx from 'clsx';
import { badgeInfo, badgeOrder } from '@/src/constants/badge.constans';

export default function AllBadgeList() {
  const { badge, completedCount } = useMyBadge();
  const currentLevel = badge ? badgeOrder.indexOf(badge) : -1;

  return (
    <div className='flex flex-col items-center gap-4'>
      <p className='text-lg font-bold text-primary-300'>총 {completedCount}회 체험 완료!</p>

      <div className='flex gap-6'>
        {badgeOrder.map((key, index) => {
          const { label, image } = badgeInfo[key];
          const unlocked = index <= currentLevel;

          return (
            <div key={key} className='flex flex-col items-center text-center gap-1'>
              <Image
                src={image}
                alt={label}
                width={64}
                height={64}
                className={clsx(
                  'transition duration-300',
                  unlocked ? 'opacity-100' : 'opacity-40 grayscale'
                )}
              />
              <span
                className={clsx('text-sm', unlocked ? 'text-black font-semibold' : 'text-gray-400')}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
