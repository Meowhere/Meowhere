'use client';

import { useGnb } from '@/src/hooks/useGnb';
import { useRouter } from 'next/navigation';
import BadgeAutoGrantWrapper from '@/src/components/common/badge/BadgeAutoGrantWrapper';
import AllBadgeList from '@/src/components/common/badge/AllBadgeList';

export default function AchievementsPage() {
  const router = useRouter();
  useGnb({ title: '내 업적', backAction: () => router.push('/profile') });
  return (
    <div className='px-4 pt-[100px] bg-white dark:bg-black min-h-screen'>
      <BadgeAutoGrantWrapper /> {/* 뱃지 조건 만족 시 자동 부여 + 모달 */}
      <AllBadgeList /> {/* 전체 뱃지 목록 (획득 여부에 따라 스타일 다르게 표시) */}
    </div>
  );
}
