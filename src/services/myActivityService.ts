import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';

export const deleteActivity = async (activityId: number): Promise<void> => {
  const res = await fetchFromClient(`/my-activities/${activityId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message ?? '체험 삭제 중 오류가 발생했습니다.');
  }
};
