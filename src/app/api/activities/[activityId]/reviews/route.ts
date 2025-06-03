import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { activityId } = await params;

  const fullPath = `/activities/${activityId}/reviews`;

  return await apiProxy(req, fullPath);
}
