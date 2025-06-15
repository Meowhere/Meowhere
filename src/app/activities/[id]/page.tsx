import { BASE_URL } from '@/src/constants/api';
import { fetchFromServer } from '@/src/lib/fetch/fetchFromServer';
import ExperienceResponsiveLayout from './components/ExperienceResponsiveLayout';
import { Activity } from '@/src/types/activity.types';

interface Props {
  params: { id: string };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const activityId = Number(params.id);

  // 체험 상세 데이터 호출
  const getActivityById = async (id: number): Promise<Activity> => {
    const res = await fetchFromServer(`/activities/${id}`);
    return res.json();
  };

  const activity = await getActivityById(activityId);

  // 체험 스케줄 데이터 호출
  const getSchedule = async (id: number) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const res = await fetch(
      `${BASE_URL}/api/activities/${id}/available-schedule?year=${year}&month=${month}`,
      {
        method: 'GET',
      }
    );

    return res.json();
  };

  const scheduleData = await getSchedule(activityId);
  const schedules = Array.isArray(scheduleData) ? scheduleData : (scheduleData.schedules ?? []);

  return (
    <main className='min-h-screen pt-[56px] pb-[160px] px-[16px] md:px-[24px]'>
      <ExperienceResponsiveLayout activity={activity} schedules={schedules} />
    </main>
  );
}
