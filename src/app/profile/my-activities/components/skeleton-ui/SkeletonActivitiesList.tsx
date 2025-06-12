import SkeletonActivities from './SkeletonActivities';

export default function SkeletonActivitiesList() {
  return (
    <div>
      {[...Array(6)].map((_, idx) => (
        <div key={idx} className='mb-[48px]'>
          <SkeletonActivities />
        </div>
      ))}
    </div>
  );
}
