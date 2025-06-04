import ManagementCard from './components/activity-management/ManagementCard';
import ManagementCards from './components/activity-management/ManagementCards';
import NotFoundActivities from './components/NotFoundActivities';

export default function MyActivitiesPage() {
  // 더미 데이터
  const activitiesData: any[] = [];
  activitiesData.push(
    {
      id: 1,
      title: '함께 배우면 즐거운 스트릿 댄스',
      bannerImageUrl: '/assets/icons/test_img.png',
      price: 148000,
      rating: 3.8,
    },
    {
      id: 2,
      title: '함께 배우면 즐거운 스트릿 댄스',
      bannerImageUrl: '/assets/icons/test_img.png',
      price: 148000,
      rating: 3.8,
    },
    {
      id: 3,
      title: '함께 배우면 즐거운 스트릿 댄스',
      bannerImageUrl: '/assets/icons/test2_img.png',
      price: 148000,
      rating: 3.8,
    },
    {
      id: 4,
      title: '함께 배우면 즐거운 스트릿 댄스',
      bannerImageUrl: '/assets/icons/test_img.png',
      price: 148000,
      rating: 3.8,
    },
    {
      id: 5,
      title: '함께 배우면 즐거운 스트릿 댄스',
      bannerImageUrl: '/assets/icons/test2_img.png',
      price: 148000,
      rating: 3.8,
    },
    {
      id: 6,
      title: '함께 배우면 즐거운 스트릿 댄스',
      bannerImageUrl: '/assets/icons/test_img.png',
      price: 148000,
      rating: 3.8,
    },
    {
      id: 7,
      title: '함께 배우면 즐거운 스트릿 댄스',
      bannerImageUrl: '/assets/icons/test_img.png',
      price: 148000,
      rating: 3.8,
    },
    {
      id: 8,
      title: '함께 배우면 즐거운 스트릿 댄스',
      bannerImageUrl: '/assets/icons/test_img.png',
      price: 148000,
      rating: 3.8,
    }
  );
  // 실제 데이터는 API 호출 등을 통해 가져올 수 있습니다.
  return (
    <div className='flex flex-col items-center mx-[24px] my-[112px] h-[calc(100vh-200px)]'>
      {activitiesData.length === 0 ? (
        <NotFoundActivities />
      ) : (
        <ManagementCards activities={activitiesData} />
      )}
    </div>
  );
}
