import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { activityId } = await params;
  return await apiProxy(request, `/activities/${activityId}`);
}
