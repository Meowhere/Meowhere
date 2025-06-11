import Image from 'next/image';
import DesktopSearchFilters from './DesktopSearchFilters';
import { useGnbStore } from '@/src/store/gnbStore';
import { motion } from 'framer-motion';

export default function DesktopGNB() {
  const { isSearching } = useGnbStore();
  return (
    <motion.nav
      className='fixed top-0 left-0 z-[90] w-full flex items-start justify-center bg-white border-b border-gray-200 px-[64px] pt-[28px]'
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
        <Image src={'/assets/icons/logo/ico-typography.svg'} alt='logo' width={100} height={40} />
        <DesktopSearchFilters />
        <div className='flex items-center gap-2 h-full'>
          <span className='text-md text-gray-600'>로그인</span>
          <Image src={'/assets/icons/login-profile.svg'} alt='logo' width={40} height={40} />
        </div>
      </div>
    </motion.nav>
  );
}
