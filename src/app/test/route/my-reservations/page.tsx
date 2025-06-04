import { BASE_URL } from '@/src/constants/api';
import { cookies } from 'next/headers';

export default async function MyReservationTestPage() {
  const cookieStore = await cookies();

  const getMyReservations = async (size: number, status?: string) => {
    const res = await fetch(
      `${BASE_URL}/api/my-reservations?size=${size}&${status ? `status=${status}` : ''}`,
      {
        method: 'GET',
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
    return res.json();
  };
  const myReservationData = await getMyReservations(10);

  return (
    <div>
      My Reservation Test Page
      <div>내 예약 목록:</div>
      <pre>{JSON.stringify(myReservationData, null, 2)}</pre>
    </div>
  );
}
