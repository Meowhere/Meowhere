'use client';
import { useGnb } from '@/src/hooks/useGnb';
import { useRouter } from 'next/navigation';
import RegisterExperienceForm from '../components/RegisterExperienceForm';
import { useCreateActivityMutation } from '@/src/hooks/useCreateActivityMutation';
import { MyActivitiesFormData } from '@/src/types/my-activities.types';

export default function RegisterPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateActivityMutation();

  const handleSubmit = (formData: MyActivitiesFormData) => {
    mutate(formData, {
      onSuccess: () => {
        router.push('/profile/my-activities');
      },
    });
  };

  useGnb({
    title: '내 체험 등록',
    subtitle: '',
    backAction: () => router.back(),
    rightButtons: [
      <button
        key='submit'
        form='register-form'
        type='submit'
        className='text-md font-semibold text-primary-300'
        disabled={isPending}
      >
        {isPending ? '등록 중...' : '등록'}
      </button>,
    ],
  });

  return <RegisterExperienceForm mode='create' onSubmit={handleSubmit} />;
}
