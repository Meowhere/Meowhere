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

    onError: () => {
      showToast('error', '삭제 실패했습니다');
    },
  });
}
