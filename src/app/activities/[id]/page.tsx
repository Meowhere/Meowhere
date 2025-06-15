import { fetchFromServer } from '@/src/lib/fetch/fetchFromServer';
import ExperienceResponsiveLayout from './components/ExperienceResponsiveLayout';
import { Activity } from '@/src/types/activity.types';

// viewport metadata
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

interface Props {
  params: Promise<{ id?: string }>;
}

export default async function ExperienceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const activityId = Number(resolvedParams.id);

  // 체험 상세 정보 가져오기
  const getActivityById = async (id: number): Promise<Activity> => {
    const res = await fetchFromServer(`/activities/${id}`);
    return res.json();
  };

  const activity = await getActivityById(activityId);

  // 스케줄 정보 가져오기
  const getSchedule = async (id: number) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');

    const res = await fetchFromServer(
      `/activities/${id}/available-schedule?year=${year}&month=${month}`
    );

    return res.json();
  };

  const scheduleData = await getSchedule(activityId);
  const schedules = Array.isArray(scheduleData) ? scheduleData : (scheduleData?.schedules ?? []);

  // 리뷰 정보 가져오기
  const getReviews = async (id: number) => {
    const res = await fetchFromServer(`/activities/${id}/reviews`);
    return res.json();
  };

  const reviewData = await getReviews(activityId);
  const reviews = Array.isArray(reviewData.reviews) ? reviewData.reviews : [];
  const reviewStats = {
    rating: reviewData.averageRating ?? 0,
    count: reviewData.totalCount ?? 0,
  };

  return (
    <main className='min-h-screen pt-[56px] pb-[160px] px-[16px] md:px-[24px]'>
      <ExperienceResponsiveLayout
        activity={activity}
        schedules={schedules}
        reviews={reviews}
        reviewStats={reviewStats}
      />
    </main>
  );
}
