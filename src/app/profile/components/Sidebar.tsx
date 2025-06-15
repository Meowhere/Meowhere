import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ProfileItem from './ProfileItem';
import ProfileMenuItem from './ProfileMenuItem';

export default function Sidebar() {
  const { isDesktop } = useBreakpoint();
  return (
    <div className='flex flex-col gap-[48px] mx-[24px] my-[48px]'>
      {!isDesktop && (
        <header className='flex'>
          <h1 className='text-3xl font-semibold text-gray-800'>프로필</h1>
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
      </div>
    </div>
  );
}
