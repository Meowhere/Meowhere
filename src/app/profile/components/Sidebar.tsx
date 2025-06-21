import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ProfileItem from './ProfileItem';
import ProfileMenuItem from './ProfileMenuItem';
import { useThemeStore } from '@/src/store/themeStore';
import { useLogout } from '@/src/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const { isDesktop } = useBreakpoint();
  const { theme, setTheme } = useThemeStore();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className='flex flex-col gap-[48px] mx-[24px] mb-[128px] max-lg:mt-[-50px]'>
      {!isDesktop && (
        <header className='flex'>
          <h1 className='text-3xl font-semibold text-gray-800 dark:text-gray-200'>프로필</h1>
        </header>
      )}
      <ProfileItem />
      <div className='flex flex-col gap-[8px]'>
        <ProfileMenuItem href='/profile/my-info' icon='my-info' title='내 정보' />
        <ProfileMenuItem href='/profile/favorites' icon='favorites' title='찜 목록' />
        <ProfileMenuItem href='/profile/reservations' icon='reservations' title='예약 내역' />
        <ProfileMenuItem href='/profile/my-activities' icon='my-activities' title='내 체험 관리' />
        <ProfileMenuItem
          href='/profile/my-reservations'
          icon='my-reservation'
          title='내 체험 예약 관리'
        />
        <ProfileMenuItem href='/profile/analytics' icon='analytics' title='내 체험 통계' />
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
              href='/'
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
