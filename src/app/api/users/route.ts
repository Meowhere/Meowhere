import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  return await apiProxy(request, '/users');
}
