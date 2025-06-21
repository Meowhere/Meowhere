'use client';

/* 트리거 역할만 수행 */

import { useBadgeStore } from '@/src/store/useBadgeStore';
import { useEffect } from 'react';
import { useModal } from '@/src/hooks/useModal';

export default function BadgeEarnedModal() {
  const { earnedBadge } = useBadgeStore();
  const { openBadgeEarnedModal } = useModal();

  useEffect(() => {
    if (earnedBadge) {
      openBadgeEarnedModal();
    }
  }, [earnedBadge]);

  return null;
}
