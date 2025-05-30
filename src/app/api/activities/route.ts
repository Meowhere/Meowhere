import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // 쿼리 파라미터 처리
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const endpoint = `/activities${queryString ? `?${queryString}` : ''}`;

  return await apiProxy(request, endpoint);
}

export async function POST(request: NextRequest) {
  return apiProxy(request, '/activities');
}
