'use client';

import ExperienceResponsiveLayout from './ExperienceResponsiveLayout';
import { Activity } from '@/src/types/activity.types';
import { ScheduleWithTimes } from '@/src/types/schedule.types';
import { Review } from '@/src/types/review.type';
export interface ExperienceDetailClientProps {
  activity: Activity; // 체험 상세 정보
  schedules: ScheduleWithTimes[]; // 예약 가능 스케줄
  reviews: Review[]; // 체험 리뷰 목록
  reviewStats: { totalCount: number; averageRating: number }; // 리뷰 통계
}

export default function ExperienceDetailClient({
  activity,
  schedules,
  reviews,
  reviewStats,
}: ExperienceDetailClientProps) {
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
