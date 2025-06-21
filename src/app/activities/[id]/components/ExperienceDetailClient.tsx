'use client';

import ExperienceResponsiveLayout from './ExperienceResponsiveLayout';
import { Activity } from '@/src/types/activity.types';
import { ScheduleWithTimes } from '@/src/types/schedule.types';
import { Review } from '@/src/types/review.type';

export default function ExperienceDetailClient({
  activity,
  schedules,
  reviews,
  reviewStats,
}: {
  activity: Activity;
  schedules: ScheduleWithTimes[];
  reviews: Review[];
  reviewStats: { totalCount: number; averageRating: number };
}) {
  return (
    <ExperienceResponsiveLayout
      activity={activity}
      schedules={schedules}
      reviews={reviews}
      reviewStats={{
        rating: reviewStats.averageRating || 0,
        count: reviewStats.totalCount || 0,
      }}
    />
  );
}
