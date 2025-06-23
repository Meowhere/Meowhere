import ReservationCalendar from '../my-reservations/components/ReservationCalendar';

export default function ReservationTestPage() {
  return (
    <main className='bg-white flex justify-center items-start lg:pt-[48px] dark:bg-black'>
      <div className='w-full max-w-[745px] mx-auto bg-white dark:bg-black'>
        <ReservationCalendar />
      </div>
    </main>
  );
}
