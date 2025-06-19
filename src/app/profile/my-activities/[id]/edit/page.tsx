'use client';

import { useGnb } from '@/src/hooks/useGnb';
import { useRouter, useParams } from 'next/navigation';
import RegisterExperienceForm from '../../components/RegisterExperienceForm';
import { useUpdateMyActivityMutation } from '@/src/hooks/useUpdateMyActivityMutation';
import { useActivityDetail } from '@/src/hooks/activities/useActivityDetail';
import { useState } from 'react';
import { UpdateMyActivityPayload, MyActivitiesFormData } from '@/src/types/my-activities.types';
import { buildUpdateActivityPayload } from '@/src/utils/my-activities';

export default function EditActivityPage() {
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL에서 activityId 추출
  const activityId = typeof params.id === 'string' ? parseInt(params.id, 10) : undefined;

  // 상세조회 & 수정 훅 호출
  const { data: activityDetail, isLoading, error } = useActivityDetail(activityId!);
  const updateMyActivityMutation = useUpdateMyActivityMutation(activityId);

  useGnb({
    title: '내 체험 수정',
    subtitle: '',
    backAction: () => router.back(),
    rightButtons: [
      <button
        key='submit'
        form='register-form'
        type='submit'
        className='text-md font-semibold text-primary-300'
      >
        수정
      </button>,
    ],
  });

  const handleSubmit = async (formData: MyActivitiesFormData) => {
    if (isSubmitting) return;
    if (!activityDetail) return;
    setIsSubmitting(true);
    try {
      const payload = buildUpdateActivityPayload({
        initialImages: activityDetail.subImages ?? [],
        initialSchedules: activityDetail.schedules ?? [],
        formData,
      });
      console.log(
        '초기:',
        activityDetail.subImages.map((i) => i.imageUrl)
      );
      console.log('현재:', formData.subImageUrls);
      await updateMyActivityMutation.mutateAsync(payload);
      router.push('/profile/my-activities');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 에러, 로딩 상태에 따른 렌더링
  if (error) {
    router.push('/profile/my-activities');
    return null;
  }

  if (isLoading || !activityDetail) {
    return <div className='flex justify-center items-center min-h-screen'>로딩 중...</div>;
  }

  return (
    <RegisterExperienceForm
      mode='edit'
      onSubmit={handleSubmit}
      defaultValues={updateMyActivityMutation.transformActivityToFormData(activityDetail)}
      isSubmitting={isSubmitting}
    />
  );
}
