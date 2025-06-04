import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // URL에서 쿼리 스트링 부분만 추출
  const url = new URL(req.url);
  const queryString = url.search;

  const fullPath = queryString
    ? `/my-notifications${queryString}`
    : `/my-notifications`;

  return await apiProxy(req, fullPath);
}
