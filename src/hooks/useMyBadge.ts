// import { useMyReservations } from './useMyReservations';
// import { useMemo, useEffect } from 'react';
// import { useBadgeStore } from '@/src/store/useBadgeStore';

// export type BadgeLevel = 'kitten' | 'curious' | 'expert' | 'professor' | 'god' | null;

// export function useMyBadge() {
//   const { reservations } = useMyReservations('confirmed', 100); // 최대 100개까지 가져오자
//   const { setEarnedBadge } = useBadgeStore();

//   const now = new Date();

//   const completedCount = useMemo(() => {
//     return reservations.filter((res) => {
//       const end = new Date(`${res.date}T${res.endTime}`);
//       return end < now;
//     }).length;
//   }, [reservations]);

//   const badge: BadgeLevel = useMemo(() => {
//     if (completedCount >= 30) return 'god';
//     if (completedCount >= 20) return 'professor';
//     if (completedCount >= 10) return 'expert';
//     if (completedCount >= 5) return 'curious';
//     if (completedCount >= 1) return 'kitten';
//     return null;
//   }, [completedCount]);

//   // 이전 뱃지와 비교 -> 상태 저장
//   useEffect(() => {
//     const previous = localStorage.getItem('lastBadge');
//     if (badge && badge !== previous) {
//       localStorage.setItem('lastBadge', badge);
//       setEarnedBadge(badge);
//     }
//   }, [badge]);

//   return { badge, completedCount };
// }

import { useEffect, useMemo } from 'react';
import { useBadgeStore } from '@/src/store/useBadgeStore';

export type BadgeLevel = 'kitten' | 'curious' | 'expert' | 'professor' | 'god' | null;

// ✅ 테스트용 더미 데이터 (완료된 체험이라고 가정)
const dummyCompletedReservations = Array.from({ length: 11 }, (_, i) => ({
  date: `2024-06-${String(i + 1).padStart(2, '0')}`,
  endTime: '18:00',
  status: 'confirmed',
}));

export function useMyBadge() {
  const { setEarnedBadge } = useBadgeStore();

  const now = new Date();

  const completedCount = useMemo(() => {
    return dummyCompletedReservations.filter((res) => {
      const end = new Date(`${res.date}T${res.endTime}`);
      return end < now;
    }).length;
  }, []);

  const badge: BadgeLevel = useMemo(() => {
    if (completedCount >= 30) return 'god';
    if (completedCount >= 20) return 'professor';
    if (completedCount >= 10) return 'expert';
    if (completedCount >= 5) return 'curious';
    if (completedCount >= 1) return 'kitten';
    return null;
  }, [completedCount]);

  // ✅ 이전 뱃지와 비교하여 획득 시 상태 저장
  useEffect(() => {
    const previous = localStorage.getItem('lastBadge');
    if (badge && badge !== previous) {
      localStorage.setItem('lastBadge', badge);
      setEarnedBadge(badge);
    }
  }, [badge]);

  return { badge, completedCount };
}
