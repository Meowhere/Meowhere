import { notFound } from 'next/navigation';
import { fetchFromServer } from '@/src/lib/fetch/fetchFromServer';
import ExperienceDetailClient from './components/ExperienceDetailClient';
import { Activity } from '@/src/types/activity.types';
import { ScheduleWithTimes } from '@/src/types/schedule.types';
import { Review } from '@/src/types/review.type';

type ReviewsApiResponse = {
  reviews: Review[];
  reviewStats: {
    totalCount: number;
    averageRating: number;
  };
};

export default async function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const activityId = Number(params.id);
  if (isNaN(activityId)) return notFound();

  try {
    // 각각 독립적으로 데이터 페칭 (병렬 처리하되 에러 격리)
    const fetchActivity = async () => {
      try {
        const res = await fetchFromServer(`/activities/${activityId}`);
        if (!res.ok) return null;
        return (await res.json()) as Activity;
      } catch (e) {
        console.error('Activity 데이터 패칭 실패:', e);
        return null;
      }
    };

    const fetchSchedules = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = String(now.getMonth() + 1).padStart(2, '0');

        const res = await fetchFromServer(
          `/activities/${activityId}/available-schedule?year=${year}&month=${month}`
        );
        if (!res.ok) {
          console.warn('스케줄 응답 실패', res.status);
          return [];
        }

        return (await res.json()) as ScheduleWithTimes[];
      } catch (e) {
        console.error('Schedules 데이터 패칭 실패:', e);
        return [];
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetchFromServer(`/activities/${activityId}/reviews`);
        if (!res.ok) return null;
        return (await res.json()) as ReviewsApiResponse;
      } catch (e) {
        console.error('Reviews 데이터 패칭 실패:', e);
        return null;
      }
    };

    // 병렬로 실행하되 각각 독립적으로 에러 처리
    const [activity, schedules, reviewsData] = await Promise.all([
      fetchActivity(),
      fetchSchedules(),
      fetchReviews(),
    ]);

    // activity가 없으면 404
    if (!activity) return notFound();

    return (
      <ExperienceDetailClient
        activity={activity}
        schedules={schedules}
        reviews={reviewsData?.reviews ?? []}
        reviewStats={
          reviewsData?.reviewStats ?? {
            averageRating: activity.rating || 0,
            totalCount: activity.reviewCount || 0,
          }
        }
      />
    );
  } catch (e) {
    console.error('서버 데이터 패칭 실패:', e);
    return notFound();
  }
}
