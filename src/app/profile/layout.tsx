'use client';
import Sidebar from './components/Sidebar';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useBreakpoint();

  return (
    <div className='flex relative gap-[80px] mt-[50px] mb-[100px] max-w-[1200px] mx-auto'>
      {isDesktop && (
        <aside className='sticky w-[328px] h-fit top-[calc(50px+96px)] self-start'>
          <Sidebar />
        </aside>
      )}
      <main className='flex-1 mx-[16px]'>{children}</main>
    </div>
  );
}
