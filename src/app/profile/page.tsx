'use client';
import { useRouter } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Sidebar from './components/Sidebar';

export default function Profile() {
  const { isDesktop, hasMounted } = useBreakpoint();
  const router = useRouter();
  //  임시로 만든 방법 : 로딩 중 sidebar가 두 번 뜸
  if (hasMounted && isDesktop) {
    router.replace('/profile/my-info');
    return null;
  } else if (!isDesktop) return <Sidebar />;
  else return null;
}
