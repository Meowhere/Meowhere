import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToastStore } from '@/src/store/toastStore';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';

export function useDeleteActivity() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: async (activityId: string | number) => {
      return await fetchFromClient(`my-activities/${activityId}`, { method: 'DELETE' });
    },

    onSuccess: () => {
      showToast('success', '삭제가 완료되었습니다');
      queryClient.invalidateQueries({ queryKey: ['my-activities'] });
    },

    onError: (error: Error) => {
      const message = error?.message
        ? `삭제 실패: ${error.message}`
        : '삭제에 실패했습니다. 다시 시도해주세요.';
      showToast('error', message);
    },
  });
}
