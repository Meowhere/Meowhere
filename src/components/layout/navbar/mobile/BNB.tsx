import { usePathname } from 'next/navigation';
import SearchIcon from '@/src/components/common/icons/SearchIcon';
import LikeIcon from '@/src/components/common/icons/LikeIcon';
import NotificationIcon from '@/src/components/common/icons/NotificationIcon';
import UserIcon from '@/src/components/common/icons/UserIcon';
import { useModal } from '@/src/hooks/useModal';
import Link from 'next/link';
import { useUser } from '@/src/hooks/auth/useAuth';
// import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient'; forREAL

export default function BNB() {
  const pathname = usePathname();
  const { openNotificationModal, openAuthModal, closeModal } = useModal();
  const { data } = useUser();

  const handleAuthModal = () => {
    openAuthModal();
  };

  // const notificationData = fetchFromClient('/my-notifications'); forREAL
  const notificationData = {
    cursorId: 0,
    notifications: [
      {
        id: 1,
        teamId: 'string',
        userId: 0,
        content: '무슨무슨 알림이 승인되었습니다',
        createdAt: '2025-06-14T06:04:32.504Z',
        updatedAt: '2025-06-14T06:04:32.504Z',
        deletedAt: '2025-06-14T06:04:32.504Z',
      },
      {
        id: 2,
        teamId: 'string',
        userId: 0,
        content: '무슨무슨 알림이 거절되었습니다',
        createdAt: '2025-06-14T06:14:32.504Z',
        updatedAt: '2025-06-14T06:14:32.504Z',
        deletedAt: '2025-06-14T06:14:32.504Z',
      },
    ],
    totalCount: 2,
  }; //forTEST

  const handleNotification = () => {
    openNotificationModal({
      data: notificationData,
      onConfirm: () => {
        console.log('취소됨');
        closeModal();
      },
    });
  };
  return (
    <nav
      aria-label='페이지 네비게이션'
      className='fixed bottom-0 left-0 h-[88px] w-full bg-white border-t border-gray-200 flex items-start justify-center text-xs py-6 px-[64px] z-30'
    >
      {data ? (
        <div className='flex justify-between w-full max-w-[500px] min-w-[128px]'>
          <Link
            className={`${
              pathname === '/' ? 'text-primary-300' : 'text-gray-500'
            } flex flex-col items-center justify-center gap-1 w-[78px]`}
            href='/'
          >
            <SearchIcon />
            <span>검색</span>
          </Link>

          <Link
            className={`${
              pathname === '/favorites' ? 'text-primary-300' : 'text-gray-500'
            } flex flex-col items-center justify-center gap-1 w-[78px]`}
            href='/profile/favorites'
          >
            <LikeIcon />
            <span>찜목록</span>
          </Link>

          <button
            className='text-gray-500 flex flex-col items-center justify-center gap-1 w-[78px]'
            onClick={handleNotification}
          >
            <NotificationIcon hasBadge={true} /> {/* TODO: 알림 표시 여부 추가 */}
            <span>알림</span>
          </button>
          <Link
            className={`${
              pathname.startsWith('/profile') ? 'text-primary-300' : 'text-gray-500'
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
              pathname === '/' ? 'text-primary-300' : 'text-gray-500'
            } flex flex-col items-center justify-center gap-1 w-[78px]`}
            href='/'
          >
            <SearchIcon />
            <span>검색</span>
          </Link>

          <button
            className='flex flex-col items-center justify-center gap-1 w-[78px]'
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
