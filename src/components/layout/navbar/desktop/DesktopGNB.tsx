import Image from 'next/image';
import DesktopSearchFilters from './DesktopSearchFilters';
import { useGnbStore } from '@/src/store/gnbStore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useModal } from '@/src/hooks/useModal';
import { useLogout, useUser } from '@/src/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useThemeStore } from '@/src/store/themeStore';

export default function DesktopGNB() {
  const { isSearching } = useGnbStore();
  const [showScrollElements, setShowScrollElements] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const { openAuthModal, openNotificationModal, closeModal } = useModal();
  const { theme, toggleTheme } = useThemeStore();
  const [notificationData, setNotificationData] = useState(null);

  const logoutMutation = useLogout();
  const router = useRouter();
  const { data, isLoading } = useUser();

  useEffect(() => {
    function handleDropdownClose() {
      setShowDropdown(false);
    }
    window.addEventListener('click', handleDropdownClose);
    return () => window.removeEventListener('click', handleDropdownClose);
  }, []);

  const handleAuthModal = () => {
    openAuthModal();
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleNotification = () => {
    openNotificationModal({
      data: notificationData,
      onConfirm: () => {
        closeModal();
      },
    });
  };

  function handleClose() {
    console.log('close');
  }
  const dropdownItemsForLoggedIn = [
    {
      type: 'profile',
      label: '프로필',
      onClick: () => {
        router.push('/profile');
      },
      onClose: handleClose,
    },
    {
      type: 'wishlist',
      label: '찜목록',
      onClick: () => {
        router.push('/profile/favorites');
      },
      onClose: handleClose,
    },
    {
      type: 'noti',
      label: '알림',
      onClick: handleNotification,
      onClose: handleClose,
    },
    {
      type: 'theme',
      label: theme === 'light' ? '다크 모드' : '라이트 모드',
      onClick: toggleTheme,
      onClose: handleClose,
    },
    {
      type: 'logout',
      label: '로그아웃',
      onClick: handleLogout,
      onClose: handleClose,
    },
  ];

  const dropdownItemsForLoggedOut = [
    {
      type: 'theme',
      label: theme === 'light' ? '다크 모드' : '라이트 모드',
      onClick: toggleTheme,
      onClose: handleClose,
    },
    {
      type: 'login',
      label: '로그인',
      onClick: handleAuthModal,
      onClose: handleClose,
    },
  ];

  const searchParams = useSearchParams();

  const paramsObj = Object.fromEntries(searchParams.entries());
  const { category, ...otherParams } = paramsObj;
  const hasParams = Object.values(otherParams).some(
    (value) => value !== null && value.trim() !== ''
  );

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== '/') return;
      const scrollThreshold = 600; //페이지 내 SearchFilter 컴포넌트 y축 위치
      setShowScrollElements(hasParams || window.scrollY > scrollThreshold);
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasParams]);

  if (isLoading) {
    return (
      <motion.nav
        className={`${showScrollElements ? 'border-white dark:border-black' : 'border-gray-200 dark:border-gray-700'} fixed top-0 left-0 z-[90] w-full flex items-start justify-center bg-white dark:bg-black border-b px-[64px] pt-[28px]`}
        initial={{
          height: '96px',
        }}
        animate={{
          height: isSearching ? '180px' : '96px',
        }}
        transition={{
          ease: [0, 1, 0, 1],
          duration: 0.5,
        }}
      >
        <div className='flex items-center justify-between w-full max-w-[1200px] h-[40px]'>
          <Link href={'/'} className='cursor-pointer flex items-center gap-[4px]'>
            <Image
              src={'/assets/icons/logo/ico-logo-small.svg'}
              alt='logo'
              width={48}
              height={48}
            />
            <Image
              src={'/assets/icons/logo/ico-typography.svg'}
              alt='logo'
              width={100}
              height={40}
            />
          </Link>

          {pathname === '/' && (
            <motion.div
              initial={{ y: 72, opacity: 0 }}
              key='desktop-search-filters-container'
              animate={{
                y: showScrollElements ? '-50%' : 32,
                opacity: showScrollElements ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0, 0.8, 0.2, 1] }}
            >
              <DesktopSearchFilters />
            </motion.div>
          )}
          <div className='flex items-center gap-2 h-full'>
            <div className='w-6 h-6 border-4 border-t-transparent border-primary-300 rounded-full animate-spin' />
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      className={`${showScrollElements ? 'border-white dark:border-black' : 'border-gray-200 dark:border-gray-700'} fixed top-0 left-0 z-[90] w-full flex items-start justify-center bg-white dark:bg-black border-b px-[64px] pt-[28px]`}
      initial={{
        height: '96px',
      }}
      animate={{
        height: isSearching ? '180px' : '96px',
      }}
      transition={{
        ease: [0, 1, 0, 1],
        duration: 0.5,
      }}
    >
      <div className='flex items-center justify-between w-full max-w-[1200px] h-[40px]'>
        <Link href={'/'} className='cursor-pointer flex items-center gap-[4px]'>
          <Image src={'/assets/icons/logo/ico-logo-small.svg'} alt='logo' width={48} height={48} />
          <Image src={'/assets/icons/logo/ico-typography.svg'} alt='logo' width={100} height={40} />
        </Link>

        {pathname === '/' && (
          <motion.div
            initial={{ y: 72, opacity: 0 }}
            key='desktop-search-filters-container'
            animate={{
              y: showScrollElements ? '-50%' : 32,
              opacity: showScrollElements ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0, 0.8, 0.2, 1] }}
          >
            <DesktopSearchFilters />
          </motion.div>
        )}
        <div
          className='flex items-center gap-2 h-full cursor-pointer relative'
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown((prev) => !prev);
          }}
        >
          <span className='text-md text-gray-600 dark:text-gray-300'>
            {data?.nickname || '로그인'}
          </span>
          {data?.profileImageUrl ? (
            <Image
              src={data.profileImageUrl}
              alt='profile'
              width={40}
              height={40}
              className='rounded-full object-cover w-[40px] h-[40px] object-center'
            />
          ) : (
            <Image src={'/assets/icons/login-profile.svg'} alt='profile' width={40} height={40} />
          )}
          {showDropdown && (
            <div className='absolute top-[calc(100%+8px)] right-0'>
              <DropdownMenu
                onClose={() => console.log('close')}
                items={data ? dropdownItemsForLoggedIn : dropdownItemsForLoggedOut}
                bottomSheetTitle='내 계정'
              />
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
