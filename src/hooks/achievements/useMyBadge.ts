import { BadgeLevel } from '@/src/constants/badge.constans';

const STORAGE_KEY = 'meowhere-earned-badges';

export interface StoredBadge {
  category: BadgeLevel;
  earnedAt: string; // ISO 날짜
}

export const getStoredBadges = (): StoredBadge[] => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? (JSON.parse(raw) as StoredBadge[]) : [];
  } catch {
    return [];
  }
};

/**
 * 특정 카테고리 뱃지를 저장
 * 이미 있으면 저장하지 않음
 */
export const storeBadge = (category: BadgeLevel) => {
  const existing = getStoredBadges();

  // 이미 존재하면 early return
  if (existing.some((b) => b.category === category)) return;

  const updated: StoredBadge[] = [
    ...existing,
    {
      category,
      earnedAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  // 로컬스토리지 저장 이후에 이벤트 발생
  window.dispatchEvent(new Event('badge-earned'));
};

export const hasBadge = (category: BadgeLevel): boolean => {
  return getStoredBadges().some((b) => b.category === category);
};

export const clearBadges = () => {
  localStorage.removeItem(STORAGE_KEY);
};
