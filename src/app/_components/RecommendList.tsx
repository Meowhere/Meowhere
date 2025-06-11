import { Activity } from '@/src/types/activity.types';
import ActivityCard from './ActivityCard';

export default function RecommendList({ activities }: { activities: Activity[] }) {
  return (
    <div className='grid grid-cols-1 '>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
