import React from 'react';
import { usePathname } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import DesktopGNB from './desktop/DesktopGNB';
import SubPageGNB from './components/SubPageGNB';
import MainPageGNB from './components/MainPageGNB';

export default function Navbar() {
  const pathname = usePathname();
  const { isDesktop } = useBreakpoint();

  if (isDesktop) {
    return <DesktopGNB />;
  } else {
    if (pathname === '/') {
      return <MainPageGNB />;
    } else {
      return <SubPageGNB />;
    }
  }
}
