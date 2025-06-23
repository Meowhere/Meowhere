import { useEffect } from 'react';
import { useBadgeStore } from '@/src/store/useBadgeStore';
import { getStoredBadges, storeBadge } from '@/src/hooks/achievements/useMyBadge';
import { useMyReservations } from '@/src/hooks/useMyReservations';
import { categoryBadgeMap } from '@/src/constants/badge.constans';
import { Activity } from '@/src/types/activity.types';

export const useBadgeChecker = () => {
  const { setEarnedBadge } = useBadgeStore();
  const { reservations } = useMyReservations('completed');

  useEffect(() => {
    if (!reservations || reservations.length === 0) return;

    const now = new Date();
    const stored = getStoredBadges();
    const earnedCategories = stored.map((b) => b.category);

    for (const r of reservations) {
      const isCompleted = new Date(`${r.date}T${r.endTime}`) < now;
      if (!isCompleted) continue;

      const activity = r.activity as Activity;
      const badgeLevel = categoryBadgeMap[activity.category];

      if (!badgeLevel || earnedCategories.includes(badgeLevel)) continue;

      storeBadge(badgeLevel);
      setEarnedBadge(badgeLevel);
      break;
    }
  }, [reservations, setEarnedBadge]);
};
