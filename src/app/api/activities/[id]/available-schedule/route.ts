import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // URL에서 쿼리 스트링 부분만 추출
  const url = new URL(req.url);
  const queryString = url.search;

  const fullPath = `/activities/${id}/available-schedule${queryString}`;

  return await apiProxy(req, fullPath);
}
