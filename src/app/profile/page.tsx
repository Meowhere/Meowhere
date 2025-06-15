'use client';
import { useRouter } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar';

export default function Profile() {
  const { isDesktop } = useBreakpoint();
  const router = useRouter();

  if (typeof window !== 'undefined' && isDesktop) {
    router.replace('/profile/my-info');
    return null;
  }

  return <Sidebar />;
}
