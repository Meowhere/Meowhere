'use client';

import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/Footer';
import BNB from '../components/layout/navbar/mobile/BNB';
import { usePathname } from 'next/navigation';
import { useBreakpoint } from '../hooks/useBreakpoint';
import ReactQueryProvider from '../lib/react-query/ReactQueryProvider';
import { useUIStore } from '../store/uiStore';
import ThemeProvider from './activities/[id]/components/common/ThemeProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDesktop } = useBreakpoint();
  const { preventBodyScroll } = useUIStore();

  const showFooter = isDesktop || !pathname.startsWith('/profile');
  const showBNB = !isDesktop && !pathname.startsWith('/activities');

  const getGNBHeight = () => {
    if (pathname === '/') {
      return 'pt-[140px]'; // MainPageGNB (76px) + CategorySection (64px)
    }
    return 'pt-[48px]'; // SubPageGNB 높이
  };

  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <div className={`${preventBodyScroll ? 'overflow-hidden' : ''} h-screen `}>
          <Navbar />
          <main className={getGNBHeight()}>{children}</main>

          {showBNB && <BNB />}
          {showFooter && <Footer />}
        </div>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
