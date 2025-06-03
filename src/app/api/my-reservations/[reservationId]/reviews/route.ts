import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ reservationId: string }> }
) {
  const { reservationId } = await params;
  const url = new URL(req.url);
  const queryString = url.search;
  const fullPath = `/my-reservations/${reservationId}/reviews${queryString}`;

  return await apiProxy(req, fullPath);
}
