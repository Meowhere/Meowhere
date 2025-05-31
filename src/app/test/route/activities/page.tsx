import { BASE_URL } from '@/src/constants/api';
import { Activity } from '@/src/types/activity.types';
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
  const activityData = await getActivityById(4225);
  const activity = activityData;

  // 체험 아이디로 스케줄 호출 테스트
  const getSchedule = async (id: number) => {
    const res = await fetch(
      `${BASE_URL}/api/activities/${id}/available-schedule?year=2025&month=01`,
      {
        method: 'GET',
      }
    );
    return res.json();
  };
  const scheduleData = await getSchedule(4225);
  const schedules = scheduleData;

  return (
    <div>
      <h1>Activity Test</h1>
      <CreateActivity />
      <h2>체험 데이터:</h2>
      <pre>{JSON.stringify(activity, null, 2)}</pre>
      <h2>스케줄 데이터:</h2>
      <pre>{JSON.stringify(schedules, null, 2)}</pre>
      <h2>체험 목록 데이터:</h2>
      <pre>{JSON.stringify(activities, null, 2)}</pre>
    </div>
  );
}
