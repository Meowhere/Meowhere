import { fetchFromClient } from '../lib/fetch/fetchFromClient';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Category } from '../types/activity.types';
import PopularActivitiesBanner from './_components/PopularActivitiesBanner';
import ActivityCard from './_components/ActivityCard';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    category: Category;
    keyword: string;
    'min-price': string;
    'max-price': string;
    address: string;
  };
}) {
  const popularResponse = await fetchFromClient(
    `/activities?method=offset&page=1&size=5&sort=most_reviewed`
  );
  const popularData = await popularResponse.json();
  const popularActivities = popularData.activities;

  const category = searchParams.category || '';
  const keyword = searchParams.keyword || '';

  const activitiesResponse = await fetchFromClient(
    `/activities?method=offset&page=1&size=100&${
      category ? `category=${category}` : ''
    }&${keyword ? `keyword=${keyword}` : ''}`
  );

  const activitiesData = await activitiesResponse.json();

  const minPrice = Number(searchParams['min-price'] || 0);
  const maxPrice = Number(searchParams['max-price'] || Infinity);
  const address = searchParams.address || '';

  const activities = activitiesData.activities.filter(
    (item: any) =>
      item.price >= minPrice && item.price <= maxPrice && item.address.includes(address)
  );

  // useEffect(() => {
  //   setBackAction(null);
  // }, []);

  return (
    <>
      {/* <GNBController /> */}
      <PopularActivitiesBanner popularActivities={popularActivities} />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-[24px] mt-6 p-[24px]'>
        {activities.map((item: any) => (
          <ActivityCard key={item.id} activity={item} />
        ))}
      </div>
    </>
  );
}

// {
//   "id": 4256,
//   "userId": 1899,
//   "title": "테스트 데이터",
//   "description": "둠칫 둠칫 두둠칫",
//   "category": "투어",
//   "price": 10000,
//   "address": "서울특별시 강남구 테헤란로 427",
//   "bannerImageUrl": "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png",
//   "rating": 0,
//   "reviewCount": 0,
//   "createdAt": "2025-06-02T23:28:17.145Z",
//   "updatedAt": "2025-06-02T23:28:17.145Z"
// },
