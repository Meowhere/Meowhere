'use client';
import { useRouter } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar';

export default function Profile() {
  const { isDesktop } = useBreakpoint();
  const router = useRouter();

  useEffect(() => {
    if (isDesktop) {
      router.replace('/profile/my-info');
    }
  }, [isDesktop, router]);

  return <Sidebar />;
}
