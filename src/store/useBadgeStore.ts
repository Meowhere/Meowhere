import { create } from 'zustand';

type BadgeLevel = 'kitten' | 'curious' | 'expert' | 'professor' | 'god' | null;

interface BadgeStore {
  earnedBadge: BadgeLevel | null;
  setEarnedBadge: (badge: BadgeLevel) => void;
  clearEarnedBadge: () => void;
}

export const useBadgeStore = create<BadgeStore>((set) => ({
  earnedBadge: null,
  setEarnedBadge: (badge) => set({ earnedBadge: badge }),
  clearEarnedBadge: () => set({ earnedBadge: null }),
}));
