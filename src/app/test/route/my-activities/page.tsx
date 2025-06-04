import { BASE_API_URL, BASE_URL } from '@/src/constants/api';
import { cookies } from 'next/headers';
import MyActivityTest from './MyActivityTest';
import { fetchFromServer } from '@/src/lib/fetch/fetchFromServer';

async function MyActivities() {
  const cookieStore = await cookies();

  // 내 체험 API test
  const getMyActivities = async () => {
    const res = await fetchFromServer(`/my-activities?size=20`);
    const data = res.json();
    return data;
  };
  const data = await getMyActivities();
  // // 내 체험 월별 예약 현황 조회 API test
  // const getMyActivitiesReservationByMonth = async (activityId: number) => {
  //   const res = await fetch(
  //     `${BASE_URL}/api/my-activities/${activityId}/reservation-dashboard?year=2026&month=12`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         // 서버 컴포넌트에서는 모든 쿠키 전달
  //         Cookie: cookieStore.toString(),
  //       },
  //     }
  //   );
  //   return res.json();
  // };
  // const reservationByMonthData = await getMyActivitiesReservationByMonth(4236);
  // // 내 체험 날짜별 예약 정보 조회 API test
  // const getMyActivitiesReservationByDate = async (id: number) => {
  //   const res = await fetch(
  //     `${BASE_URL}/api/my-activities/${id}/reserved-schedule?date=2026-12-01`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         // 서버 컴포넌트에서는 모든 쿠키 전달
  //         Cookie: cookieStore.toString(),
  //       },
  //     }
  //   );
  //   return res.json();
  // };
  // const reservationByDateData = await getMyActivitiesReservationByDate(4236);
  // // 내 체험 예약 상태별 예약 내역 조회 API test
  // const getMyActivityReservationsByStatus = async (
  //   id: number,
  //   scheduleId: number,
  //   status: string
  // ) => {
  //   const res = await fetch(
  //     `${BASE_URL}/api/my-activities/${id}/reservations?size=10&scheduleId=${scheduleId}&status=${status}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         // 서버 컴포넌트에서는 모든 쿠키 전달
  //         Cookie: cookieStore.toString(),
  //       },
  //     }
  //   );
  //   return res.json();
  // };
  // const reservationByStatus = await getMyActivityReservationsByStatus(
  //   4236,
  //   17335,
  //   'declined' // declined, pending, confirmed
  // );

  return (
    <div className='text-lg'>
      My Activities API Test
      <MyActivityTest />
      <div className='text-md'>내 체험 목록:</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* <div className='text-md'>내 체험 월별 예약 현황 조회:</div>
      <pre>{JSON.stringify(reservationByMonthData, null, 2)}</pre>
      <div className='text-md'>내 체험 날짜별 예약 정보 조회:</div>
      <pre>{JSON.stringify(reservationByDateData, null, 2)}</pre>
      <div className='text-md'>내 체험 예약 상태별 예약 정보 조회:</div>
      <pre>{JSON.stringify(reservationByStatus, null, 2)}</pre> */}
    </div>
  );
}

export default MyActivities;
