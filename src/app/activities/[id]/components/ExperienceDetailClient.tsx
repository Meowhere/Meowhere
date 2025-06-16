'use client';

import { useActivityDetail } from '@/src/hooks/activities/useActivityDetail';
import { useSchedule } from '@/src/hooks/activities/useSchedule';
import { useReviews } from '@/src/hooks/activities/useReviews';
import ExperienceResponsiveLayout from './ExperienceResponsiveLayout';
import ExperienceDetailSkeleton from './common/ExperienceDetailSkeleton';

export default function ExperienceDetailClient({ activityId }: { activityId: number }) {
  const {
    data: activity,
    isLoading: loadingActivity,
    error: errorActivity,
  } = useActivityDetail(activityId);
  const {
    data: schedules,
    isLoading: loadingSchedules,
    error: errorSchedules,
  } = useSchedule(activityId);
  const {
    data: reviewData,
    isLoading: loadingReviews,
    error: errorReviews,
  } = useReviews(activityId);

  const isLoading = loadingActivity || loadingSchedules || loadingReviews;
  const isError = errorActivity || errorSchedules || errorReviews;

  if (isLoading) {
    return <ExperienceDetailSkeleton />;
  }

  if (isError || !activity || !schedules || !reviewData) {
    return <div className='text-center py-10 text-red-500'>데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <ExperienceResponsiveLayout
      activity={activity}
      schedules={schedules}
      reviews={reviewData.reviews}
      reviewStats={reviewData.reviewStats}
    />
  );
}
