import { BASE_URL } from '@/src/constants/api';
import CreateActivity from './CreateActivity';

export default async function ActivitiesPage() {
  // 체험 호출 테스트
  const getActivities = async () => {
    const res = await fetch(
      `${BASE_URL}/api/activities?method=offset&page=1&size=20`,
      {
        method: 'GET',
      }
    );
    return res.json();
  };
  const data = await getActivities();
  const activities = data.activities;

  // 체험 아이디로 호출 테스트
  const getActivityById = async (id: number) => {
    const res = await fetch(`${BASE_URL}/api/activities/${id}`, {
      method: 'GET',
    });
    return res.json();
  };
  const activityData = await getActivityById(4236);
  const activity = activityData;

  // 체험 아이디로 스케줄 호출 테스트
  const getSchedule = async (id: number) => {
    const res = await fetch(
      `${BASE_URL}/api/activities/${id}/available-schedule?year=2026&month=12`,
      {
        method: 'GET',
      }
    );
    return res.json();
  };
  const scheduleData = await getSchedule(4236);
  const schedules = scheduleData;

  // 체험 아이디로 리뷰 호출 테스트
  const getReviews = async (id: number) => {
    const res = await fetch(`${BASE_URL}/api/activities/${id}/reviews`, {
      method: 'GET',
    });
    return res.json();
  };
  const reviewData = await getReviews(4236);
  const reviews = reviewData;

  return (
    <div className='space-x-6'>
      <h1>Activity Test</h1>
      <CreateActivity />
      <h2>체험 데이터:</h2>
      <pre>{JSON.stringify(activity, null, 2)}</pre>
      <h2>스케줄 데이터:</h2>
      <pre>{JSON.stringify(schedules, null, 2)}</pre>
      <h2>리뷰 데이터:</h2>
      <pre>{JSON.stringify(reviews, null, 2)}</pre>
      <h2>체험 목록 데이터:</h2>
      <pre>{JSON.stringify(activities, null, 2)}</pre>
    </div>
  );
}
