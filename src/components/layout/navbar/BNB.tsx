import { usePathname } from 'next/navigation';
import SearchIcon from '@/src/components/common/icons/SearchIcon';
import LikeIcon from '@/src/components/common/icons/LikeIcon';
import NotificationIcon from '@/src/components/common/icons/NotificationIcon';
import UserIcon from '@/src/components/common/icons/UserIcon';
import { useModal } from '@/src/hooks/useModal';
import Link from 'next/link';

export default function BNB() {
  const pathname = usePathname();
  const { review, closeModal } = useModal();

  const handleReview = () => {
    review({
      title: '대충 수많은 알림들',
      schedules: null,
      headCount: 12,
      price: 100000,
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

        {/* 찜목록, 이후 구현 예정 */}
        <Link
          className={`${
            pathname === '/favorites' ? 'text-primary-300' : 'text-gray-500'
          } flex flex-col items-center justify-center gap-1 w-[78px]`}
          href='/favorites'
        >
          <LikeIcon />
          <span>찜목록</span>
        </Link>

        {/* 알림, 이후 구현 예정 */}
        <button
          className='text-gray-500 flex flex-col items-center justify-center gap-1 w-[78px]'
          onClick={handleReview}
        >
          <NotificationIcon hasBadge={true} />
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
    </nav>
  );
}
