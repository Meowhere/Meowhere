import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { Activity } from '@/src/types/activity.types';
import { unstable_cache } from 'next/cache';

const getGlobalStatistics = unstable_cache(
  async () => {
    console.log('통계 cache miss, 로딩중');
    const allActivities = await fetchAllActivitiesFromServer();
    const stats = calculateGlobalStats(allActivities);
    return stats;
  },

  ['global_activity_statistics'],
  { revalidate: 30 }
);

export async function GET() {
  const statistics = await getGlobalStatistics();
  return Response.json(statistics);
}

async function fetchAllActivitiesFromServer(): Promise<Activity[]> {
  const allActivities = [];
  let page = 1;
  const size = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await fetchFromClient(
      `/activities?method=offset&page=${page}&size=${size}&sort=price_asc`
    );

    if (!response.ok) {
      throw new Error(`API 호출 실패 (${page}p): ${response.status}`);
    }

    const data = await response.json();

    if (data.activities.length > 0) {
      allActivities.push(...data.activities);

      if (allActivities.length >= data.totalCount) {
        hasMore = false;
      } else {
        page++;
      }
    } else {
      hasMore = false;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return allActivities;
}

function calculateGlobalStats(activities: Activity[]) {
  if (!activities || activities.length === 0) {
    return {
      places: [],
      prices: [],
      priceRange: { min: 0, max: 0 },
      totalCount: 0,
    };
  }

  // 지역별 통계
  const placeStats = new Map<string, number>();
  activities.forEach((activity) => {
    if (activity.address) {
      const place = activity.address.split(' ')[0];
      placeStats.set(place, (placeStats.get(place) || 0) + 1);
    }
  });

  // 가격별 통계
  const maxPrice = activities[activities.length - 1].price;
  const minPrice = activities[0].price;
  const GAP_COUNT = 30;

  const priceGap = (maxPrice - minPrice) / GAP_COUNT;

  const priceStats = new Map<number, number>();
  activities.forEach((activity) => {
    if (typeof activity.price === 'number') {
      const section = Math.floor((activity.price - minPrice) / priceGap);
      priceStats.set(section, (priceStats.get(section) || 0) + 1);
    }
  });

  const priceStatsArray = Array(GAP_COUNT)
    .fill(0)
    .map((_, i) => priceStats.get(i) || 0);

  return {
    places: Array.from(placeStats.entries()).sort((a, b) => b[1] - a[1]),
    prices: priceStatsArray,
    priceRange: { min: minPrice, max: maxPrice },
    totalCount: activities.length,
  };
}
