import ManagementCard from './ManagementCard';
import { MyActivitiesProps } from '@/src/types/my-activities.types';

interface ManagementCardsProps {
  activities: MyActivitiesProps[];
}

export default function ManagementCards({ activities }: ManagementCardsProps) {
  return (
    <div className='flex flex-col w-full h-[]'>
      {activities.map((activity) => (
        <ManagementCard key={activity.id} {...activity} />
      ))}
    </div>
  );
}
