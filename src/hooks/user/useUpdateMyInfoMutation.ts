// hooks/useUpdateMyInfoMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchMe } from '../../services/userService';
import { useToastStore } from '@/src/store/toastStore';

export const useUpdateMyInfoMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: patchMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
      showToast('success', '정보 수정이 완료되었습니다');
    },
    onError: (error: Error) => {
      const message = error?.message
        ? `수정실패 : ${error.message}`
        : `수정에 실패했습니다. 다시 시도해주세요.`;
      showToast('error', message);
    },
  });
};
