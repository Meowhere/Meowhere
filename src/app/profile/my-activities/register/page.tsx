'use client';
import { useGnb } from '@/src/hooks/useGnb';
import { useRouter } from 'next/navigation';
import RegisterExperienceForm, {
  RegisterExperienceFormRef,
} from '../components/RegisterExperienceForm';
import { useCreateActivityMutation } from '@/src/hooks/useCreateActivityMutation';
import { MyActivitiesFormData } from '@/src/types/my-activities.types';
import SkeletonRegisterForm from '../components/skeleton-ui/SkeletonRegisterForm';
import { useEffect, useState, useRef } from 'react';
import { useGnbStore } from '@/src/store/gnbStore';

export default function RegisterPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateActivityMutation();
  const [isInitializing, setIsInitializing] = useState(true);
  const [formState, setFormState] = useState({ isDirty: false, isValid: false });
  const { setRightButtons } = useGnbStore();

  const formRef = useRef<RegisterExperienceFormRef>(null);

  useEffect(() => {
    // 500ms 정도 후에 실제 Form 보여주기 (너무 짧으면 깜빡임)
    const timeout = setTimeout(() => {
      setIsInitializing(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (formData: MyActivitiesFormData) => {
    mutate(formData, {
      onSuccess: () => {
        router.push('/profile/my-activities');
      },
    });
  };
  useEffect(() => {
    setRightButtons([
      <button
        key='submit'
        type='button'
        onClick={() => {
          console.log('ref: ', formRef.current);
          formRef.current?.submit();
        }}
        className='text-md font-semibold text-primary-300 disabled:text-gray-300'
        disabled={!formState.isDirty || !formState.isValid || isPending}
      >
        등록
      </button>,
    ]);
  }, [formState, isPending]);
  useGnb({
    title: '내 체험 등록',
    subtitle: '',
    backAction: () => router.back(),
    rightButtons: [],
  });

  if (isInitializing) {
    return <SkeletonRegisterForm />;
  }
  return (
    <RegisterExperienceForm
      ref={formRef}
      mode='create'
      onSubmit={handleSubmit}
      onFormStateChange={setFormState}
    />
  );
}
