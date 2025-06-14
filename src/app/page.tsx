import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { Activity, Category } from '../types/activity.types';
import PopularActivitiesBanner from './_components/PopularActivitiesBanner';
import ActivityList from './_components/ActivityList';
import DesktopSearchFilters from '../components/layout/navbar/desktop/DesktopSearchFilters';
import DesktopCategorySection from '../components/layout/navbar/desktop/DesktopCategorySection';

export default async function Home({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{
    category: Category;
    keyword: string;
    'min-price': string;
    'max-price': string;
    address: string;
  }>;
}) {
  const searchParams = await searchParamsPromise;
  const category = searchParams.category || '';
  const keyword = searchParams.keyword || '';

  const params = new URLSearchParams({
    method: 'cursor',
    size: '30',
    ...(category && { category }),
    ...(keyword && { keyword }),
  });

  const activitiesResponse = await fetchFromClient(`/activities?${params.toString()}`);

  const activitiesData = await activitiesResponse.json();

  const minPrice = Number(searchParams['min-price'] || 0);
  const maxPrice = Number(searchParams['max-price'] || Infinity);
  const address = searchParams.address || '';

  const activities = activitiesData.activities.filter(
    (item: Activity) =>
      item.price >= minPrice && item.price <= maxPrice && item.address.includes(address)
  );

  return (
    <div className='min-h-screen dark:bg-black'>
      <PopularActivitiesBanner />
      <DesktopSearchFilters isForPage />
      <DesktopCategorySection />
      <ActivityList initialActivities={activities} initialCursor={activitiesData.cursorId} />
    </div>
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
