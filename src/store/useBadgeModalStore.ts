import { create } from 'zustand';
import { BadgeLevel } from '@/src/constants/badge.constans';

interface BadgeModalState {
  badge?: { category: BadgeLevel; earnedAt?: string };
  open: (category: BadgeLevel, earnedAt?: string) => void;
  close: () => void;
}

export const useBadgeModalStore = create<BadgeModalState>((set) => ({
  badge: undefined,
  open: (category, earnedAt) => set({ badge: { category, earnedAt } }),
  close: () => set({ badge: undefined }),
}));
