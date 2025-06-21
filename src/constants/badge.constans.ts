export const badgeInfo = {
  kitten: { label: '아깽', image: '/assets/icons/badge/kitten.svg' },
  curious: { label: '호기심냥', image: '/assets/icons/badge/curious.svg' },
  expert: { label: '냥냥전문가', image: '/assets/icons/badge/expert.svg' },
  professor: { label: '냥냥교수', image: '/assets/icons/badge/professor.svg' },
  god: { label: '냥신', image: '/assets/icons/badge/god.svg' },
};

export const badgeOrder = ['kitten', 'curious', 'expert', 'professor', 'god'] as const;

export type BadgeLevel = keyof typeof badgeInfo;
