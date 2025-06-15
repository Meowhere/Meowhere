import ArrowButton from '@/src/components/common/buttons/ArrowButton';
import Link from 'next/link';
import { ProfileMenuItemProps, ICONS } from '@/src/types/profile-menu.types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function ProfileMenuItem({
  href,
  icon,
  title,
  onClick,
  className,
  hasArrow = true,
}: ProfileMenuItemProps) {
  const { isDesktop } = useBreakpoint();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href || '#;'}
      className={clsx(
        'flex flex-row items-center justify-between px-[24px] py-[12px] rounded-[10px] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 p-3  text-gray-700 dark:text-gray-300',
        isActive && 'bg-gray-100 dark:bg-gray-700',
        className
      )}
      onClick={onClick}
    >
      <div className='flex items-center gap-[14px]'>
        <img src={ICONS[icon]} alt={title} />
        <span className='text-lg font-medium'>{title}</span>
      </div>
      {!isDesktop && hasArrow && (
        <div>
          <ArrowButton direction='right' size={18} className='w-[24px] h-[24px]' />
        </div>
      )}
    </Link>
  );
}
