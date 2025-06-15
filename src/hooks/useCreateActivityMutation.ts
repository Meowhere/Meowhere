import { useMutation } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { MyActivitiesFormData } from '@/src/types/my-activities.types';
import { useToastStore } from '../store/toastStore';

export function useCreateActivityMutation() {
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: async (formData: MyActivitiesFormData) => {
      const res = await fetchFromClient('activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return res.json(); // 성공 시 데이터 반환
    },
    onSuccess: () => {
      showToast('success', '등록이 완료되었습니다');
    },
    onError: (error: Error) => {
      const message = error?.message
        ? `등록 실패: ${error.message}`
        : `등록에 실패했습니다. 다시 시도해주세요.`;
      showToast('error', message);
    },
  });
}
