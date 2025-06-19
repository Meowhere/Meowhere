'use client';

import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/Footer';
import BNB from '../components/layout/navbar/mobile/BNB';
import { usePathname, useSearchParams } from 'next/navigation';
import { useBreakpoint } from '../hooks/useBreakpoint';
import ReactQueryProvider from '../lib/react-query/ReactQueryProvider';
import { useUIStore } from '../store/uiStore';
import UserInitializer from './_components/UserInitializer';
import ThemeProvider from './activities/[id]/components/common/ThemeProvider';
import { Suspense } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDesktop } = useBreakpoint();
  const { preventBodyScroll } = useUIStore();

  const showFooter = isDesktop || !pathname.startsWith('/profile');
  const showBNB = !isDesktop && !pathname.startsWith('/activities');
  const showNavbar = pathname !== '/profile';

  const searchParams = useSearchParams();

  const paramsObj = Object.fromEntries(searchParams.entries());
  const { category, ...otherParams } = paramsObj;
  const hasParams = Object.values(otherParams).some(
    (value) => value !== null && value.trim() !== ''
  );

  const getGNBHeight = () => {
    if (isDesktop) return 'pt-[96px]';
    if (pathname === '/') return 'pt-[140px]';
    return 'pt-[48px]';
  };

  return (
    <ReactQueryProvider>
      <UserInitializer />
      <ThemeProvider>
        <div className={`${preventBodyScroll ? 'overflow-hidden' : ''} h-screen `}>
          {showNavbar && (
            <Suspense
              fallback={
                <div className='w-full h-[72px] flex justify-center items-center'>
                  <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
                </div>
              }
            >
              <Navbar />
            </Suspense>
          )}
          <main className={getGNBHeight()}>{children}</main>
          {showBNB && <BNB />}
          {showFooter && <Footer />}
        </div>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
