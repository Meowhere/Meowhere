import ReservationCalendar from '../my-reservations/components/ReservationCalendar';

export default function ReservationTestPage() {
  return (
    <main className='min-h-screen bg-white px-[20px] pt-[176px] flex justify-center items-start'>
      <div className='w-full max-w-[745px] mx-auto bg-white'>
        <ReservationCalendar />
      </div>
    </main>
  );
}
