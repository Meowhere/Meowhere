import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFromClient } from '../../lib/fetch/fetchFromClient';
import { useToastStore } from '@/src/store/toastStore';

export const useUploadProfileImageMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetchFromClient('users/me/image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
      showToast('success', '프로필 이미지를 변경했습니다');
    },
    onError: (error: Error) => {
      const message = error?.message
        ? `이미지 업로드 실패: ${error.message}`
        : `업로드에 실패했습니다. 다시 시도해주세요`;
      showToast('error', message);
    },
  });
};
