import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ reservationId: string }> }
) {
  const { reservationId } = await params;
  const fullPath = `/my-reservations/${reservationId}/reviews`;

  return await apiProxy(req, fullPath);
}
