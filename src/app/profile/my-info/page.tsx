'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import Input from '@/src/components/common/inputs/Input';
import Textarea from '@/src/components/common/inputs/Textarea';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { User } from '@/src/types/user.types';

const myInfoSchema = z
  .object({
    nickname: z
      .string()
      .min(2, '닉네임은 2자 이상 입력해주세요.')
      .max(20, '닉네임은 20자 이하로 입력해주세요.'),
    bio: z
      .string()
      .max(700, '자기소개는 최대 700자까지 입력 가능합니다.')
      .optional()
      .or(z.literal('')),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상 입력해주세요.')
      .max(30, '비밀번호는 30자 이하로 입력해주세요.')
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      // 비밀번호 입력 시, 확인 값이 일치하는지 검사
      if (data.password && data.confirmPassword !== data.password) {
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<MyInfoForm>({
    resolver: zodResolver(myInfoSchema),
    defaultValues: {
      nickname: '',
      bio: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const nicknameValue = watch('nickname', '');
  const bioValue = watch('bio');
  const pwValue = watch('password', '');
  const pwConfirmValue = watch('confirmPassword', '');

  const onSubmit = (data: MyInfoForm) => {
    alert(JSON.stringify(data, null, 2));
    // reset(); // 폼 리셋 원하면 주석 해제
  };

  // // 변경사항이 있는지 확인
  // const hasChanges = () => {
  //   if (!user) return false;

  //   // 닉네임이 변경되었거나
  //   const nicknameChanged = nicknameValue !== user.nickname;

  //   // 비밀번호가 입력되었을 때
  //   const passwordEntered = pwValue.length > 0;

  //   return nicknameChanged || passwordEntered;
  // };

  // const isButtonDisabled = isSubmitting || !hasChanges();

  // // 사용자 정보 가져오기
  // const fetchUserInfo = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch('/api/users/me');

  //     if (!response.ok) {
  //       throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  //     }

  //     const mockUser = { nickname: '테스트유저' } as User;
  //     setUser(mockUser);

  //     // 폼에 기존 닉네임 값 설정
  //     setValue('nickname', mockUser.nickname);
  //   } catch (error) {
  //     console.error('사용자 정보 가져오기 실패:', error);
  //     alert('사용자 정보를 가져오는데 실패했습니다.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // 컴포넌트 마운트 시 사용자 정보 가져오기
  // useEffect(() => {
  //   fetchUserInfo();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className='flex justify-center items-center h-[400px]'>
  //       <p className='text-gray-600'>사용자 정보를 불러오는 중...</p>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <div className='flex justify-center items-center h-[400px]'>
  //       <p className='text-red-600'>사용자 정보를 불러올 수 없습니다.</p>
  //     </div>
  //   );
  // }

  return (
    <form
      className='flex flex-col gap-[64px] mt-[48px] mx-[24px] mb-[600px]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-[16px]'>
        <p className='text-xl font-semibold text-gray-800 '>닉네임 변경</p>
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
        <p className='text-xl font-semibold text-gray-800'>비밀번호 변경</p>
        <div>
          <Input
            label='비밀번호'
            type='password'
            {...register('password')}
            watchValue={pwValue}
            error={errors.password}
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
            <BaseButton variant='primary' disabled className='py-[12px]'>
              변경하기
            </BaseButton>
          </div>
        </div>
      )}
    </form>
  );
}
