import ManagementCard from './ManagementCard';
import { MyActivitiesProps } from '@/src/types/my-activities.types';

interface ManagementCardsProps {
  activities: MyActivitiesProps[];
}

export default function ManagementCards({ activities }: ManagementCardsProps) {
  if (activities.length === 0) {
    return <div className='py-20 text-center text-gray-400'>등록된 활동이 없습니다.</div>;
    // 또는 NotFoundActivities 컴포넌트 사용
  }

  return (
    <div className='flex flex-col w-full h-[]'>
      {activities.map((activity) => (
        <ManagementCard key={activity.id} {...activity} />
      ))}
    </div>
  );
}
