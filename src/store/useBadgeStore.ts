// src/store/useBadgeStore.ts
import { create } from 'zustand';

export type BadgeLevel = 'art' | 'food' | 'sport' | 'tour' | 'travel' | 'wellbeing' | null;

interface BadgeStore {
  earnedBadge: BadgeLevel;
  setEarnedBadge: (badge: BadgeLevel) => void;
  clearEarnedBadge: () => void;
}

export const useBadgeStore = create<BadgeStore>((set) => ({
  earnedBadge: null,
  setEarnedBadge: (badge) => set({ earnedBadge: badge }),
  clearEarnedBadge: () => set({ earnedBadge: null }),
}));
