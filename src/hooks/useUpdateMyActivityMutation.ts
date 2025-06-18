import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { useToastStore } from '../store/toastStore';
import { UpdateMyActivityPayload } from '../types/my-activities.types';

export function useUpdateMyActivityMutation(activityId?: number) {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: async (payload: UpdateMyActivityPayload) => {
      const res = await fetchFromClient(`my-activities/${activityId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return res.json(); // 성공 시 데이터 반환
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-activities'],
      });
      showToast('success', '수정이 완료되었습니다');
    },
    onError: (error: Error) => {
      const message = error?.message
        ? `수정 실패: ${error.message}`
        : `수정에 실패했습니다. 다시 시도해주세요.`;
      showToast('error', message);
    },
  });
}
