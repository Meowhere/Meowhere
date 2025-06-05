'use client';

import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/Footer';
import BNB from '../components/layout/navbar/mobile/BNB';
import { usePathname } from 'next/navigation';
import { useBreakpoint } from '../hooks/useBreakpoint';
import ReactQueryProvider from '../lib/react-query/ReactQueryProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDesktop } = useBreakpoint();

  const showFooter = isDesktop || !pathname.startsWith('/my-page');
  const showBNB = !isDesktop && !pathname.startsWith('/activities');

  return (
    <>
      <ReactQueryProvider>
        <Navbar />
        {children}
        {showBNB && <BNB />}
        {showFooter && <Footer />}
      </ReactQueryProvider>
    </>
  );
}
