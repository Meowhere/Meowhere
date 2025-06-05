'use client';

import ReservationCalendar from '../my-reservations/components/ReservationCalendar';

// 임시데이터
const sampleData = [
  { date: '2025-05-01', pendingCount: 2, confirmedCount: 1, declinedCount: 3 },
  { date: '2025-05-03', pendingCount: 0, confirmedCount: 2, declinedCount: 1 },
  { date: '2025-05-10', pendingCount: 1, confirmedCount: 0, declinedCount: 0 },
  { date: '2025-05-15', pendingCount: 3, confirmedCount: 2, declinedCount: 0 },
  { date: '2025-05-28', pendingCount: 0, confirmedCount: 0, declinedCount: 5 },
  { date: '2025-06-05', pendingCount: 1, confirmedCount: 0, declinedCount: 5 },
  { date: '2025-06-08', pendingCount: 1, confirmedCount: 2, declinedCount: 5 },
  { date: '2025-06-09', pendingCount: 1, confirmedCount: 2, declinedCount: 0 },
];

export default function ReservationTestPage() {
  return (
    <main className='min-h-screen bg-white px-[20px] pt-[176px] flex justify-center items-start'>
      <div className='w-full max-w-[745px] mx-auto bg-white'>
        <ReservationCalendar statusData={sampleData} />
      </div>
    </main>
  );
}
