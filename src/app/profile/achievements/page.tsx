'use client';

import { useGnb } from '@/src/hooks/useGnb';
import { useRouter } from 'next/navigation';

export default function AchievementsPage() {
  const router = useRouter();
  useGnb({ title: '내 업적', backAction: () => router.push('/profile') });
  return <div>AchievementsPage</div>;
}
