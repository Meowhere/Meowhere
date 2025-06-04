import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { activityId } = await params;

  const url = new URL(req.url);
  const queryString = url.search;

  const fullPath = `/my-activities/${activityId}/reservation-dashboard${queryString}`;

  return await apiProxy(req, fullPath);
}
