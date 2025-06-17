import { ActivityService } from '@/src/services/activityService';
import { ActivityStatisticsService } from '@/src/services/activityStatisticsService';

const activityService = new ActivityService();
const activityStatisticsService = new ActivityStatisticsService(activityService);

export async function GET() {
  const statistics = await activityStatisticsService.getStatistics();
  return Response.json(statistics);
}
