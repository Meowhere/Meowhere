'use client';
import ProfileItem from './components/ProfileItem';
import ProfileMenuItem from './components/ProfileMenuItem';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function Profile() {
  const { isDesktop } = useBreakpoint();
  return (
    <div className='flex flex-col gap-[48px] mx-[24px] mb-[600px] mt-[48px]'>
      {!isDesktop && (
        <header className='flex'>
          <h1 className='text-3xl font-semibold text-gray-800'>프로필</h1>
        </header>
      )}
      <ProfileItem />
      <div className='flex flex-col gap-[8px]'>
        <ProfileMenuItem href='/profile/my-info' icon='my-info' title='내 정보' />
        <ProfileMenuItem href='/profile/my-reservations' icon='my-reservations' title='예약 내역' />
        <ProfileMenuItem href='/profile/my-activities' icon='my-activities' title='내 체험 관리' />
        <ProfileMenuItem href='/profile/reservations' icon='settings' title='내 체험 예약 관리' />
      </div>
    </div>
  );
}
