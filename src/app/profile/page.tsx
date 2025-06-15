'use client';
import { useRouter } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useEffect } from 'react';
import ProfileItem from './components/ProfileItem';
import ProfileMenuItem from './components/ProfileMenuItem';
import { useThemeStore } from '@/src/store/themeStore';
import { useLogout } from '@/src/hooks/auth/useAuth';

export default function Profile() {
  const { isDesktop } = useBreakpoint();
  const router = useRouter();
  const { theme, setTheme } = useThemeStore();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
    router.push('/');
  };

  useEffect(() => {
    if (isDesktop) {
      router.replace('/profile/my-info');
    }
  }, [isDesktop, router]);

  return (
    <div className='flex flex-col gap-[48px] mx-[24px] mb-[600px] mt-[48px]'>
      {!isDesktop && (
        <header className='flex'>
          <h1 className='text-3xl font-semibold text-gray-800 dark:text-gray-200'>프로필</h1>
        </header>
      )}
      <ProfileItem />
      <div className='flex flex-col gap-[8px]'>
        <ProfileMenuItem href='/profile/my-info' icon='my-info' title='내 정보' />
        <ProfileMenuItem href='/profile/favorites' icon='favorites' title='찜 목록' />
        <ProfileMenuItem href='/profile/my-reservations' icon='my-reservations' title='예약 내역' />
        <ProfileMenuItem href='/profile/my-activities' icon='my-activities' title='내 체험 관리' />
        <ProfileMenuItem href='/profile/reservations' icon='settings' title='내 체험 예약 관리' />
        {!isDesktop && (
          <>
            {theme === 'dark' ? (
              <ProfileMenuItem
                icon='light-mode'
                title='라이트 모드'
                hasArrow={false}
                onClick={() => setTheme('light')}
              />
            ) : (
              <ProfileMenuItem
                icon='dark-mode'
                title='다크 모드'
                hasArrow={false}
                onClick={() => setTheme('dark')}
              />
            )}
            <ProfileMenuItem
              icon='logout'
              title='로그아웃'
              hasArrow={false}
              onClick={handleLogout}
              className='text-red-300 dark:text-dark-red-100 mt-[24px]'
            />
          </>
        )}
      </div>
    </div>
  );
}
