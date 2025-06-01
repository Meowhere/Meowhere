import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { activityId } = await params;

  // URL에서 쿼리 스트링 부분만 추출
  const url = new URL(req.url);
  const queryString = url.search;

  const fullPath = `/activities/${activityId}/available-schedule${queryString}`;

  return await apiProxy(req, fullPath);
}
