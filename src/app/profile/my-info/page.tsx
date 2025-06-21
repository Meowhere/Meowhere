'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import Input from '@/src/components/common/inputs/Input';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useMyInfoQuery, useUpdateMyInfoMutation } from '@/src/hooks/user';
import { UpdateMyInfoPayload } from '@/src/types/user.types';

const myInfoSchema = z
  .object({
    nickname: z
      .string()
      .transform((val) => val.trim().replace(/\s+/g, ' '))
      .pipe(
        z
          .string()
          .min(1, '닉네임은 2자 이상 입력해주세요.')
          .max(10, '닉네임은 10자 이하로 입력해주세요.')
      ),
    newPassword: z
      .string()
      .min(8, '비밀번호는 8자 이상 입력해주세요.')
      .max(30, '비밀번호는 30자 이하로 입력해주세요.')
      .refine((val) => !/\s/.test(val), '비밀번호에 공백을 포함할 수 없습니다.')
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      // 비밀번호 입력 시, 확인 값이 일치하는지 검사
      if (data.newPassword && data.confirmPassword !== data.newPassword) {
        return false;
      }
      return true;
    },
    {
      path: ['confirmPassword'],
      message: '비밀번호가 일치하지 않습니다.',
    }
  );

type MyInfoForm = z.infer<typeof myInfoSchema>;

export default function MyInfoPage() {
  const { isDesktop } = useBreakpoint();

  // 쿼리 훅
  const { data: user, isLoading, isError } = useMyInfoQuery();
  // 뮤테이션 훅
  const updateMyInfoMutation = useUpdateMyInfoMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<MyInfoForm>({
    resolver: zodResolver(myInfoSchema),
    defaultValues: {
      nickname: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const nicknameValue = watch('nickname');
  const pwValue = watch('newPassword', '');
  const pwConfirmValue = watch('confirmPassword', '');

  // user 데이터 받아오면 폼에 set
  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname,
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user, reset]);

  const onSubmit = (data: MyInfoForm) => {
    // user가 없으면 아무 것도 보내지 않음
    if (!user) return;

    const payload: UpdateMyInfoPayload = {};

    // 비밀번호, 닉네임 중 변경된 값만 PATCH에 넘기기
    if (data.nickname !== user.nickname) payload.nickname = data.nickname;
    if (data.newPassword) payload.newPassword = data.newPassword;

    updateMyInfoMutation.mutate(payload);
  };

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
    <form
      className='flex flex-col gap-[64px] mt-[48px] mx-[24px] mb-[600px]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-[16px]'>
        <p className='text-xl font-semibold text-gray-800 dark:text-gray-200'>닉네임 변경</p>
        <Input
          label='닉네임'
          type='text'
          {...register('nickname')}
          watchValue={nicknameValue}
          error={errors.nickname}
          // required
        />
      </div>

      <div className='flex flex-col gap-[16px]'>
        <p className='text-xl font-semibold text-gray-800 dark:text-gray-200'>비밀번호 변경</p>
        <div>
          <Input
            label='비밀번호'
            type='password'
            {...register('newPassword')}
            watchValue={pwValue}
            error={errors.newPassword}
            isPassword={true}
          />
          <Input
            label='비밀번호 확인'
            type='password'
            {...register('confirmPassword')}
            watchValue={pwConfirmValue}
            error={errors.confirmPassword}
            isPassword={true}
          />
        </div>
      </div>

      {isDesktop && (
        <div className='flex justify-end w-full'>
          <div className='w-[128px]'>
            <BaseButton
              variant='primary'
              disabled={updateMyInfoMutation.isPending || !isDirty || !isValid}
              className='py-[12px]'
            >
              변경하기
            </BaseButton>
          </div>
        </div>
      )}
    </form>
  );
}
