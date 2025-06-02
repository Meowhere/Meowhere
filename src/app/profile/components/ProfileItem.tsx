import ArrowButton from '@/src/components/common/buttons/ArrowButton';
import Link from 'next/link';
import { ProfileItemProps } from '@/src/types/profile-menu.types';
import { ICONS, IconType } from '@/src/types/profile-menu.types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function ProfileItem({ href, icon, title }: ProfileItemProps) {
  const { isDesktop } = useBreakpoint();
  return (
    <Link
      href={href}
      className='flex flex-row item-center justify-between hover:bg-gray-50 rounded transition-colors duration-200 active:bg-gray-100 p-3'
    >
      <div className='flex items-center gap-[14px]'>
        <img src={ICONS[icon]} alt={title} />
        <span className='text-lg font-medium text-gray-700'>{title}</span>
      </div>
      {!isDesktop && (
        <div>
          <ArrowButton direction='right' className='w-[30px]' />
        </div>
      )}
    </Link>
  );
}
