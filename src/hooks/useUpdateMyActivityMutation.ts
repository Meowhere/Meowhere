import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { useToastStore } from '../store/toastStore';
import { MyActivitiesFormData, UpdateMyActivityPayload } from '../types/my-activities.types';
import { Activity, SubImage } from '../types/activity.types';

// Activity 타입에서 MyActivitiesFormData 타입으로 변환하는 유틸리티 함수
const transformActivityToFormData = (activity: Activity): MyActivitiesFormData => ({
  title: activity.title,
  description: activity.description,
  category: activity.category,
  price: activity.price,
  address: activity.address,
  bannerImageUrl: activity.bannerImageUrl,
  subImageUrls: activity.subImages.map((img: SubImage) => img.imageUrl),
  schedules: activity.schedules.map(({ id, ...schedule }) => schedule),
});

export function useUpdateMyActivityMutation(activityId?: number) {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return {
    transformActivityToFormData,
    ...useMutation({
      mutationFn: async (payload: UpdateMyActivityPayload) => {
        const res = await fetchFromClient(`my-activities/${activityId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        return res.json();
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
    }),
  };
}
