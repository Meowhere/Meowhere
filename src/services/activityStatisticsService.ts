import { unstable_cache } from 'next/cache';
import { ActivityService } from './activityService';
import { Activity } from '../types/activity.types';

export class ActivityStatisticsService {
  constructor(private activityService: ActivityService) {}

  private getGlobalStatistics = unstable_cache(
    async () => {
      console.log('통계 cache miss, 로딩중');
      const allActivities = await this.activityService.fetchAllActivities();
      const stats = this.calculateGlobalStats(allActivities);
      return stats;
    },

    ['global_activity_statistics'],
    { revalidate: 30 }
  );

  async getStatistics() {
    return await this.getGlobalStatistics();
  }

  private calculateGlobalStats(activities: Activity[]) {
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
}
