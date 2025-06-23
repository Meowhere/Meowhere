'use client';

import { useEffect, useState } from 'react';
import { getStoredBadges, StoredBadge } from '@/src/hooks/achievements/useMyBadge';
import { BADGE_LIST, BadgeInfo } from '@/src/constants/badge.constans';
import BadgeViewer from './BadgeViewer';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useModal } from '@/src/hooks/useModal';

export default function AllBadgeList() {
  const [earned, setEarned] = useState<StoredBadge[]>([]);
  const { isDesktop } = useBreakpoint();
  const { openBadgeDetailModal } = useModal();

  useEffect(() => {
    const updateBadges = () => {
      const stored = getStoredBadges();
      setEarned(stored);
    };

    updateBadges();

    window.addEventListener('badge-earned', updateBadges);
    return () => window.removeEventListener('badge-earned', updateBadges);
  }, []);

  const renderBadge = (badge: BadgeInfo) => {
    const owned = earned.find((b) => b.category === badge.category);
    const isEarned = !!owned;

    return (
      <div
        key={badge.category}
        className='flex flex-col w-[115px] items-center text-center gap-[19px]'
      >
        <div
          className={`w-[120px] h-[120px] flex items-center justify-center overflow-hidden rounded-full ${
            isEarned ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
          }`}
          onClick={
            isEarned ? () => openBadgeDetailModal(badge.category, owned?.earnedAt) : undefined
          }
        >
          <BadgeViewer
            imageUrl={
              isEarned
                ? badge.imageUrl // 획득한 경우: 뱃지 이미지
                : '/assets/badge/badge-locked.png' // 미획득: 회색 잠금 이미지
            }
            alt={badge.title}
            size={96}
          />
        </div>
        <div className='text-center mt-1'>
          <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>
            {isEarned ? badge.title : '미획득'}
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400 font-regular'>
            {isEarned
              ? new Date(owned.earnedAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              : `'${badge.label}' 체험 후 획득`}
          </p>
        </div>
      </div>
    );
  };

  return isDesktop ? (
    <div className='grid grid-cols-3 gap-x-[80px] gap-y-[48px] w-fit justify-items-start'>
      {BADGE_LIST.map(renderBadge)}
    </div>
  ) : (
    <div className='flex flex-wrap justify-center gap-x-[40px] gap-y-[32px]'>
      {BADGE_LIST.map(renderBadge)}
    </div>
  );
}
