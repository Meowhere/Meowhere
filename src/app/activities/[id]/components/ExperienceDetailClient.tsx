'use client';

import ExperienceResponsiveLayout from './ExperienceResponsiveLayout';
import { Activity } from '@/src/types/activity.types';

export default function DetailClient({ activity }: { activity: Activity }) {
  return (
    <ExperienceResponsiveLayout
      activity={activity}
      schedules={[]}
      reviews={[]}
      reviewStats={{
        rating: activity.rating || 0,
        count: activity.reviewCount || 0,
      }}
    />
  );
}
