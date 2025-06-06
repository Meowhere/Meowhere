'use client';

import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/Footer';
import BNB from '../components/layout/navbar/mobile/BNB';
import { usePathname } from 'next/navigation';
import { useBreakpoint } from '../hooks/useBreakpoint';
import ReactQueryProvider from '../lib/react-query/ReactQueryProvider';
import { useUIStore } from '../store/uiStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDesktop } = useBreakpoint();
  const { preventBodyScroll } = useUIStore();

  const showFooter = isDesktop || !pathname.startsWith('/my-page');
  const showBNB = !isDesktop && !pathname.startsWith('/activities');

  return (
    <div className={`${preventBodyScroll ? 'overflow-hidden' : ''}`}>
      <ReactQueryProvider>
        <Navbar />
        {children}
        {showBNB && <BNB />}
        {showFooter && <Footer />}
      </ReactQueryProvider>
    </div>
  );
}
