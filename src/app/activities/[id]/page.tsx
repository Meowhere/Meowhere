import { notFound } from 'next/navigation';
import { fetchFromServer } from '@/src/lib/fetch/fetchFromServer';
import ExperienceDetailClient from './components/ExperienceDetailClient';
import { Activity } from '@/src/types/activity.types';

export default async function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const activityId = Number(params.id);
  if (isNaN(activityId)) return notFound();

  try {
    const res = await fetchFromServer(`/activities/${activityId}`);
    if (!res.ok) return notFound();

    const activity: Activity = await res.json();

    return <ExperienceDetailClient activity={activity} />;
  } catch (e) {
    console.error('서버 데이터 패칭 실패:', e);
    return notFound();
  }
}
