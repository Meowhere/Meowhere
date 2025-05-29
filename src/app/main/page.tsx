'use client';

import { useRouter } from 'next/navigation';
import ArrowButton from '@/src/components/common/buttons/ArrowButton';

export default function MainPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center text-black">
      <h1 className="text-2xl">뒤로가기</h1>

      <ArrowButton direction="left" onClick={() => router.back()} />
    </main>
  );
}
