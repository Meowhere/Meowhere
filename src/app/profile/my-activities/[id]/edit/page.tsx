'use client';
import { useGnb } from '@/src/hooks/useGnb';
import { useRouter } from 'next/navigation';
import RegisterExperienceForm from '../../components/RegisterExperienceForm';
import { useUpdateMyActivityMutation } from '@/src/hooks/useUpdateMyActivityMutation';
import { MyActivitiesFormData, UpdateMyActivityPayload } from '@/src/types/my-activities.types';
import { mapToApiPayload } from '@/src/utils/my-activities';

export default function EditActivityPage() {
  const router = useRouter();
  const { mutate } = useUpdateMyActivityMutation();

  const handleSubmit = (formData: MyActivitiesFormData) => {
    // formData를 UpdateMyActivityPayload 형식으로 변환
    const payload = mapToApiPayload(formData, 'edit') as UpdateMyActivityPayload;

    mutate(payload, {
      onSuccess: () => {
        router.push('/profile/my-activities');
      },
    });
  };

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

  return <RegisterExperienceForm mode='edit' onSubmit={handleSubmit} />;
}
