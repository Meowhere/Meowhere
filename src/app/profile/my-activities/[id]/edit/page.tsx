'use client';

import { useGnb } from '@/src/hooks/useGnb';
import { useRouter, useParams } from 'next/navigation';
import RegisterExperienceForm, {
  RegisterExperienceFormRef,
} from '../../components/RegisterExperienceForm';
import { useUpdateMyActivityMutation } from '@/src/hooks/useUpdateMyActivityMutation';
import { useActivityDetail } from '@/src/hooks/activities/useActivityDetail';
import { useState, useRef, useEffect } from 'react';
import { MyActivitiesFormData } from '@/src/types/my-activities.types';
import SkeletonRegisterForm from '../../components/skeleton-ui/SkeletonRegisterForm';
import { useGnbStore } from '@/src/store/gnbStore';
import { useQueryClient } from '@tanstack/react-query';
import { createUpdatePayload } from '@/src/utils/my-activities';

export default function EditActivityPage() {
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<RegisterExperienceFormRef>(null);
  const [formState, setFormState] = useState({ isDirty: false, isValid: false });
  const { setRightButtons } = useGnbStore();
  const queryClient = useQueryClient();

  // URL에서 activityId 추출
  const activityId = typeof params.id === 'string' ? parseInt(params.id, 10) : undefined;

  // 상세조회 & 수정 훅 호출
  const { data: activityDetail, isLoading, error } = useActivityDetail(activityId!);
  const updateMyActivityMutation = useUpdateMyActivityMutation(activityId);

  useEffect(() => {
    setRightButtons([
      <button
        key='submit'
        form='register-form'
        onClick={() => formRef.current?.submit()}
        className='text-md font-semibold text-primary-300 disabled:text-gray-300'
        disabled={updateMyActivityMutation.isPending || !formState.isDirty || !formState.isValid}
      >
        수정
      </button>,
    ]);
  }, [formState, updateMyActivityMutation.isPending, setRightButtons]);
  useGnb({
    title: '내 체험 수정',
    subtitle: '',
    backAction: () => router.back(),
    rightButtons: [],
  });

  const handleSubmit = async (formData: MyActivitiesFormData) => {
    if (isSubmitting) return;
    if (!activityDetail) return;

    setIsSubmitting(true);

    try {
      const payload = createUpdatePayload(formData, activityDetail);

      console.log('📤 PATCH payload:', payload);

      await updateMyActivityMutation.mutateAsync(payload);
      queryClient.invalidateQueries({ queryKey: ['activity', activityId] });
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
    return (
      <div className='w-full flex-1'>
        <SkeletonRegisterForm />
      </div>
    );
  }

  return (
    <RegisterExperienceForm
      ref={formRef}
      mode='edit'
      onSubmit={handleSubmit}
      defaultValues={updateMyActivityMutation.transformActivityToFormData(activityDetail)}
      isSubmitting={isSubmitting}
      onFormStateChange={setFormState}
    />
  );
}
