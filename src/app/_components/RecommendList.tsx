import { Activity } from '@/src/types/activity.types';
import ActivityCard from './ActivityCard';

interface RecommendListProps {
  activities: Activity[];
}

export default function RecommendList({ activities }: RecommendListProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-[24px] lg:gap-x-[12px] lg:gap-y-[80px] mt-[32px]'>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
