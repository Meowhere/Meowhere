// components/MyInfoForm.tsx
'use client';
import { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '@/src/components/common/inputs/Input';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { MyInfoFormProps, MyInfoFormRef } from '@/src/types/user.types';

const myInfoSchema = z
  .object({
    nickname: z
      .string()
      .transform((val) => val.trim().replace(/\s+/g, ' '))
      .pipe(
        z
          .string()
          .min(1, '닉네임은 2자 이상 입력해주세요')
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
  .refine((data) => !data.newPassword || data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type MyInfoFormType = z.infer<typeof myInfoSchema>;

const MyInfoForm = forwardRef<MyInfoFormRef, MyInfoFormProps>(
  ({ defaultValues, onSubmit, isSubmitting, onFormStateChange }, ref) => {
    const { isDesktop } = useBreakpoint();

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isDirty, isValid },
    } = useForm<MyInfoFormType>({
      mode: 'onChange',
      resolver: zodResolver(myInfoSchema),
      defaultValues,
    });

    useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(onSubmit)(),
    }));
    useEffect(() => {
      onFormStateChange?.({ isDirty, isValid }); // ✅ 상태 외부로 전달
    }, [isDirty, isValid, onFormStateChange]);

    const nicknameValue = watch('nickname');
    const pwValue = watch('newPassword', '');
    const pwConfirmValue = watch('confirmPassword', '');

    return (
      <form className='flex flex-col gap-[64px] mt-[48px] mx-[24px] mb-[600px]'>
        <div className='flex flex-col gap-[16px]'>
          <p className='text-xl font-semibold text-gray-800 dark:text-gray-200'>닉네임 변경</p>
          <Input
            label='닉네임'
            type='text'
            {...register('nickname')}
            watchValue={nicknameValue}
            error={errors.nickname}
          />
        </div>

        <div className='flex flex-col gap-[16px]'>
          <p className='text-xl font-semibold text-gray-800 dark:text-gray-200'>비밀번호 변경</p>
          <Input
            label='비밀번호'
            type='password'
            {...register('newPassword')}
            watchValue={pwValue}
            error={errors.newPassword}
            isPassword
          />
          <Input
            label='비밀번호 확인'
            type='password'
            {...register('confirmPassword')}
            watchValue={pwConfirmValue}
            error={errors.confirmPassword}
            isPassword
          />
        </div>

        {isDesktop && (
          <div className='flex justify-end w-full'>
            <div className='w-[128px]'>
              <BaseButton
                variant='primary'
                disabled={isSubmitting || !isDirty || !isValid}
                className='py-[12px] text-[1.4rem]'
              >
                변경하기
              </BaseButton>
            </div>
          </div>
        )}
      </form>
    );
  }
);

export default MyInfoForm;
