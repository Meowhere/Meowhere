'use client';
import ProfileMenuItem from './components/ProfileMenuItem';

export default function Profile() {
  return (
    <div>
      <div>
        <ProfileMenuItem href='/profile/my-info' icon='my-info' title='내 정보' />
        <ProfileMenuItem href='/profile/my-reservations' icon='my-reservations' title='예약 내역' />
        <ProfileMenuItem
          href='/profile/my-activities'
          icon='my-activities'
          title='예약 요청 관리'
        />
        <ProfileMenuItem href='/profile/reservations' icon='settings' title='체험 수정하기' />
      </div>
    </div>
  );
}
