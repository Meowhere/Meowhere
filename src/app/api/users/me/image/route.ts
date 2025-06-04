import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const fullPath = `/users/me/image`;

  return await apiProxy(req, fullPath);
}
