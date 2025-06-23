import ReservationCalendar from '../my-reservations/components/ReservationCalendar';

export default function ReservationTestPage() {
  return (
    <main className='w-full bg-white flex justify-center items-start lg:pt-[48px] dark:bg-gray-900 '>
      <div className='w-full max-w-[745px] mx-auto bg-white dark:bg-gray-900'>
        <ReservationCalendar />
      </div>
    </main>
  );
}
