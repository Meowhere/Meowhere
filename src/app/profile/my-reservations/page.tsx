import ReservationCalendar from '../my-reservations/components/ReservationCalendar';

export default function ReservationTestPage() {
  return (
    <main className='bg-white px-[24px] flex justify-center items-start lg:pt-[48px] dark:bg-gray-900 '>
      {/* 프로필 사이드 바 구현 후 스타일 수정 필요 */}
      <div className='w-full max-w-[745px] mx-auto bg-white dark:bg-gray-900'>
        <ReservationCalendar />
      </div>
    </main>
  );
}
