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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '체험 등록에 실패했습니다.');
      }

      return res.json();
    },
    onSuccess: () => {
      showToast('success', '등록이 완료되었습니다');
    },
    onError: (error: Error) => {
      const message = error?.message
        ? `체험 등록 실패: ${error.message}`
        : '체험 등록에 실패했습니다. 입력하신 내용을 확인하고 다시 시도해주세요.';
      showToast('error', message);
      console.error('체험 등록 에러:', error);
    },
  });
}
