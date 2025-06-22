import { usePathname } from 'next/navigation';
import SearchIcon from '@/src/components/common/icons/SearchIcon';
import LikeIcon from '@/src/components/common/icons/LikeIcon';
import NotificationIcon from '@/src/components/common/icons/NotificationIcon';
import UserIcon from '@/src/components/common/icons/UserIcon';
import { useModal } from '@/src/hooks/useModal';
import Link from 'next/link';
import { useUser } from '@/src/hooks/auth/useAuth';
import { useThemeStore } from '@/src/store/themeStore';
import { useNotifications } from '@/src/hooks/useNotifications';

export default function BNB() {
  const pathname = usePathname();
  const { openNotificationModal, openAuthModal, closeModal } = useModal();
  const { data } = useUser();
  const { theme } = useThemeStore();
  const { data: notificationData } = useNotifications();

  const handleAuthModal = () => {
    openAuthModal();
  };

  const handleNotification = () => {
    openNotificationModal({
      onConfirm: () => {
        closeModal();
      },
    });
  };
  return (
    <nav
      aria-label='페이지 네비게이션'
      className='fixed bottom-0 left-0 h-[88px] w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 flex items-start justify-center text-xs py-6 px-[64px] z-20'
    >
      {data ? (
        <div className='flex justify-between w-full max-w-[500px] min-w-[128px]'>
          <Link
            className={`${
              pathname === '/' ? 'text-primary-300' : 'text-gray-500 dark:text-gray-400'
            } flex flex-col items-center justify-center gap-1 w-[78px]`}
            href='/'
          >
            <SearchIcon />
            <span>검색</span>
          </Link>

          <Link
            className={`${
              pathname === '/favorites' ? 'text-primary-300' : 'text-gray-500 dark:text-gray-400'
            } flex flex-col items-center justify-center gap-1 w-[78px]`}
            href='/profile/favorites'
          >
            <LikeIcon />
            <span>찜목록</span>
          </Link>

          <button
            className='text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center gap-1 w-[78px]'
            onClick={handleNotification}
          >
            <NotificationIcon
              hasBadge={notificationData && notificationData?.totalCount > 0}
              backgroundColor={theme === 'light' ? '#FFFFFF' : '#1D1A17'}
            />
            <span>알림</span>
          </button>
          <Link
            className={`${
              pathname.startsWith('/profile')
                ? 'text-primary-300'
                : 'text-gray-500 dark:text-gray-400'
            } flex flex-col items-center justify-center gap-1 w-[78px]`}
            href='/profile'
          >
            <UserIcon />
            <span>프로필</span>
          </Link>
        </div>
      ) : (
        <div className='flex justify-between w-full max-w-[240px] min-w-[128px]'>
          <Link
            className={`${
              pathname === '/' ? 'text-primary-300' : 'text-gray-500 dark:text-gray-400'
            } flex flex-col items-center justify-center gap-1 w-[78px]`}
            href='/'
          >
            <SearchIcon />
            <span>검색</span>
          </Link>

          <button
            className='flex flex-col items-center justify-center gap-1 w-[78px] text-gray-500 dark:text-gray-400'
            onClick={handleAuthModal}
          >
            <UserIcon />
            <span>로그인</span>
          </button>
        </div>
      )}
    </nav>
  );
}
