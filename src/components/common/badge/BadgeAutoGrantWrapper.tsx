'use client';

import { useEffect } from 'react';
import { useCompletedCategories } from '@/src/hooks/achievements/useCompletedCategories';
import { categoryBadgeMap } from '@/src/constants/badge.constans';
import { hasBadge, storeBadge, getStoredBadges } from '@/src/hooks/achievements/useMyBadge';
import { useModal } from '@/src/hooks/useModal';

export default function BadgeAutoGrantWrapper() {
  const completedCategories = useCompletedCategories();
  const { openBadgeDetailModal } = useModal();

  // 자동 뱃지 지급 로직 (기존)
  useEffect(() => {
    if (!completedCategories || completedCategories.size === 0) return;

    completedCategories.forEach((category) => {
      const badgeLevel = categoryBadgeMap[category];
      if (!badgeLevel) return;

      if (!hasBadge(badgeLevel)) {
        storeBadge(badgeLevel);
        const updated = getStoredBadges().find((b) => b.category === badgeLevel);
        openBadgeDetailModal(badgeLevel, updated?.earnedAt);
      }
    });
  }, [completedCategories]);

  // 수동 트리거 시 모달 띄우기 (badge-earned 이벤트 감지)
  useEffect(() => {
    const onBadgeEarned = () => {
      const badges = getStoredBadges();
      const latest = badges.sort(
        (a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime()
      )[0];
      if (latest) {
        openBadgeDetailModal(latest.category, latest.earnedAt);
      }
    };

    window.addEventListener('badge-earned', onBadgeEarned);
    return () => window.removeEventListener('badge-earned', onBadgeEarned);
  }, []);

  // 개발용 testBadge 함수 등록 (콘솔에서 호출 가능)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    (window as any).testBadge = (category: string) => {
      storeBadge(category as any); // BadgeLevel 캐스팅
      window.dispatchEvent(new Event('badge-earned'));
    };
  }

  return null;
}
