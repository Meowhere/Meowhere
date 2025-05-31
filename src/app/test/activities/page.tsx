import { BASE_URL } from '@/src/constants/api';
import { Activity } from '@/src/types/activity.types';
import CreateActivity from './CreateActivity';

export default async function ActivitiesPage() {
  const getActivities = async () => {
    const res = await fetch(
      `${BASE_URL}/api/activities?method=offset&page=1&size=20`,
      {
        method: 'GET',
      }
    );
    return res.json();
  };

  const getActivityById = async (id: number) => {
    const res = await fetch(`${BASE_URL}/api/activities/${id}`, {
      method: 'GET',
    });
    return res.json();
  };

  const data = await getActivities();
  const activities = data.activities;

  const activityData = await getActivityById(4225);
  const activity = activityData;

  // console.log(activities);
  return (
    <div>
      Activity Test
      <CreateActivity />
      <div>체험 데이터:</div>
      <pre>{JSON.stringify(activity, null, 2)}</pre>
      <div>체험 목록 데이터:</div>
      <pre>{JSON.stringify(activities, null, 2)}</pre>
    </div>
  );
}
