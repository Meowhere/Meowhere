'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGnb } from '@/src/hooks/useGnb';
import MyInfoForm from './components/MyInfoForm';
import { MyInfoFormRef } from '@/src/types/user.types';
import { useMyInfoQuery, useUpdateMyInfoMutation } from '@/src/hooks/user';
import { UpdateMyInfoPayload } from '@/src/types/user.types';
import { useGnbStore } from '@/src/store/gnbStore';

export default function MyInfoPage() {
  const router = useRouter();
  const formRef = useRef<MyInfoFormRef>(null);
  const [formState, setFormState] = useState({ isDirty: false, isValid: false });
  const { data: user, isLoading, isError } = useMyInfoQuery();
  const updateMyInfoMutation = useUpdateMyInfoMutation();
  const { setRightButtons } = useGnbStore();

  const handleSubmit = (data: any) => {
    if (!user) return;

    const payload: UpdateMyInfoPayload = {};
    if (data.nickname !== user.nickname) payload.nickname = data.nickname;
    if (data.newPassword) payload.newPassword = data.newPassword;

    updateMyInfoMutation.mutate(payload);
  };

  useEffect(() => {
    setRightButtons([
      <button
        key='submit'
        type='button'
        onClick={() => formRef.current?.submit()}
        className='text-md font-semibold text-primary-300 disabled:text-gray-300'
        disabled={updateMyInfoMutation.isPending || !formState.isDirty || !formState.isValid}
      >
        변경
      </button>,
    ]);
  }, [formState, updateMyInfoMutation.isPending]);

  useGnb({
    title: '내정보',
    backAction: () => router.push('/profile'),
    rightButtons: [],
  });

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-[400px]'>
        <div className='flex flex-col gap-[20px] w-full h-[72px] flex justify-center items-center'>
          <div className='w-6 h-6 border-4 border-t-transparent border-primary-200 rounded-full animate-spin' />
        </div>
      </div>
    );
  if (isError || !user)
    return (
      <div className='flex justify-center items-center h-[400px]'>
        <p className='text-gray-400 dark:text-gray-600'>사용자 정보를 불러올 수 없습니다.</p>
      </div>
    );

  return (
    <MyInfoForm
      ref={formRef}
      defaultValues={{
        nickname: user.nickname,
        newPassword: '',
        confirmPassword: '',
      }}
      onSubmit={handleSubmit}
      isSubmitting={updateMyInfoMutation.isPending}
      onFormStateChange={setFormState}
    />
  );
}
