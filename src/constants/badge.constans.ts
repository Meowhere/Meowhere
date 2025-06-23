export const badgeOrder = ['art', 'food', 'sport', 'tour', 'travel', 'wellbeing'] as const;

export type BadgeLevel = (typeof badgeOrder)[number];

export interface BadgeInfo {
  category: BadgeLevel;
  title: string;
  label: string;
  imageUrl: string;
  description: string;
}

export const BADGE_LIST: BadgeInfo[] = [
  {
    category: 'art',
    title: '예술가의 발톱',
    label: '문화 예술',
    imageUrl: '/assets/badge/badge-art.png',
    description: '물감보다 감성이 앞서는 나, 갤러리 대신 골목 전시회가 더 좋아요.',
  },
  {
    category: 'food',
    title: '맛의 사냥꾼',
    label: '음식',
    imageUrl: '/assets/badge/badge-food.png',
    description: '입맛 까다로운 고양이처럼, 오늘도 한입으로 세계 여행 중!',
  },
  {
    category: 'sport',
    title: '날쌘 집사',
    label: '스포츠',
    imageUrl: '/assets/badge/badge-sport.png',
    description: '고양이의 민첩함은 기본, 오늘도 운동장 위를 질주합니다!',
  },
  {
    category: 'tour',
    title: '길 위의 여행자',
    label: '투어',
    imageUrl: '/assets/badge/badge-tour.png',
    description: '길 잃은 여행자? 아니죠, 나는 그 동네 주민입니다.',
  },
  {
    category: 'travel',
    title: '골목 탐정',
    label: '여행',
    imageUrl: '/assets/badge/badge-travel.png',
    description: '이 구역 숨은 맛집과 포토존은 이미 내 발바닥에 저장돼 있어요.',
  },
  {
    category: 'wellbeing',
    title: '조용한 햇살',
    label: '웰빙',
    imageUrl: '/assets/badge/badge-wellbeing.png',
    description: '따뜻한 햇살 아래 스트레칭 한 번, 고요한 순간이 최고의 힐링이죠.',
  },
];

// 빠른 매핑용: 체험 카테고리 명 → BadgeLevel
export const categoryBadgeMap: Record<string, BadgeLevel> = {
  문화예술: 'art',
  음식: 'food',
  스포츠: 'sport',
  투어: 'tour',
  관광: 'travel',
  웰빙: 'wellbeing',
};
