import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ activityId: string; reservationId: string }> }
) {
  const { activityId, reservationId } = await params;

  const fullPath = `/my-activities/${activityId}/reservations/${reservationId}`;

  return await apiProxy(req, fullPath);
}
