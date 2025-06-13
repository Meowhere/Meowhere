'use client';
import Sidebar from './components/Sidebar';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useBreakpoint();

  return (
    <div className='flex gap-[128px] min-h-screen mt-[50px] max-w-[1200px] mx-auto w-full'>
      {isDesktop && (
        <div className='w-[328px]'>
          <Sidebar />
        </div>
      )}
      <main className='flex-1'>{children}</main>
    </div>
  );
}
