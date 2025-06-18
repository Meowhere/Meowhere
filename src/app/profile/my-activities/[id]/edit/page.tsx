'use client';
import { useGnb } from '@/src/hooks/useGnb';
import { useRouter } from 'next/navigation';
import RegisterExperienceForm from '../../components/RegisterExperienceForm';
import { useCreateActivityMutation } from '@/src/hooks/useCreateActivityMutation';
import { MyActivitiesFormData } from '@/src/types/my-activities.types';

export default function EditActivityPage() {
  const router = useRouter();
  const { mutate } = useCreateActivityMutation();

  const handleSubmit = (formData: MyActivitiesFormData) => {
    mutate(formData, {
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
