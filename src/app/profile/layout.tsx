'use client';
import Profile from './page';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useBreakpoint();

  return (
    <div className='flex gap-[128px] min-h-screen mt-[100px] max-w-[1200px] mx-auto w-full'>
      {isDesktop && (
        <div className='w-[328px]'>
          <Profile />
        </div>
      )}
      <main className='flex-1'>{children}</main>
    </div>
  );
}
