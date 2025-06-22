'use client';
import { useRouter } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Sidebar from './components/Sidebar';
import { useEffect } from 'react';

export default function Profile() {
  const { isDesktop, hasMounted } = useBreakpoint();
  const router = useRouter();

  useEffect(() => {
    if (hasMounted && isDesktop) {
      router.replace('/profile/my-info');
    }
  }, [hasMounted, isDesktop]);

  if (!hasMounted) return null;
  if (!isDesktop) return <Sidebar />;
  else return null;
}
