import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/assets/icons/logo/ico-logo.svg';
import Typography from '@/public/assets/icons/logo/ico-typography.svg';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function Footer() {
  const { isDesktop } = useBreakpoint();

  return (
    <footer
      className={`${isDesktop ? 'h-[540px]' : 'h-[468px]'} w-full flex flex-col items-center justify-start bg-[#F5F2EC] text-gray-500 overflow-hidden text-xs text-center`}
    >
      <div className='w-full h-9 bg-white rounded-bl-[100px] rounded-br-[100px] shadow-[0px_4px_48px_0px_rgba(0,0,0,0.10)]' />
      <Image
        src={Logo}
        alt='logo'
        className={isDesktop ? 'mt-[112px]' : 'mt-[80px]'}
      />
      <Image
        src={Typography}
        alt='typography'
        width={200}
        className='mt-[18px]'
      />
      <p className='mt-[28px]'>
        코드잇 스프린트 <br />
        프론트엔드 부트캠프 14기 1조
      </p>
      <a
        href='https://github.com/Meowhere/Meowhere'
        target='_blank'
        className='mt-[48px] underline text-gray-400'
      >
        Github
      </a>
      <Link href='/privacy-policy' className='underline mt-[8px] text-gray-400'>
        개인정보처리방침
      </Link>
    </footer>
  );
}
