import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { Activity } from '../types/activity.types';

export class ActivityService {
  async fetchAllActivities(): Promise<Activity[]> {
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
}
