'use client';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Input from '@/src/components/common/inputs/Input';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { User } from '@/src/types/user.types';

type FormValues = {
  nickname: string;
  password: string;
  confirmPassword: string;
};

export default function MyInfoPage() {
  const { isDesktop } = useBreakpoint();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const nicknameValue = watch('nickname', '');
  const pwValue = watch('password', '');
  const pwConfirmValue = watch('confirmPassword', '');

  // 변경사항이 있는지 확인
  const hasChanges = () => {
    if (!user) return false;

    // 닉네임이 변경되었거나
    const nicknameChanged = nicknameValue !== user.nickname;

    // 비밀번호가 입력되었을 때
    const passwordEntered = pwValue.length > 0;

    return nicknameChanged || passwordEntered;
  };

  const isButtonDisabled = isSubmitting || !hasChanges();

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/me');

      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는데 실패했습니다.');
      }

      const userData: User = await response.json();
      setUser(userData);

      // 폼에 기존 닉네임 값 설정
      setValue('nickname', userData.nickname);
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      alert('사용자 정보를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 사용자 정보 가져오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 폼 제출 처리
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      // PATCH 요청에 포함할 데이터 준비
      const updateData: Partial<User & { newPassword?: string }> = {};

      // 닉네임이 변경된 경우에만 포함
      if (data.nickname !== user?.nickname) {
        updateData.nickname = data.nickname;
      }

      // 비밀번호가 입력된 경우에만 포함
      if (data.password) {
        updateData.newPassword = data.password;
      }

      // 변경사항이 없는 경우
      if (Object.keys(updateData).length === 0) {
        alert('변경사항이 없습니다.');
        return;
      }

      const response = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '정보 수정에 실패했습니다.');
      }

      const updatedUser: User = await response.json();
      setUser(updatedUser);

      // 비밀번호 필드 초기화
      setValue('password', '');
      setValue('confirmPassword', '');

      alert('정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('정보 수정 실패:', error);
      alert(error instanceof Error ? error.message : '정보 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[400px]'>
        <p className='text-gray-600'>사용자 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex justify-center items-center h-[400px]'>
        <p className='text-red-600'>사용자 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <form
      className='flex flex-col gap-[64px] mt-[48px] mx-[24px] mb-[600px]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-[16px]'>
        <p className='text-xl font-semibold text-gray-800 '>닉네임 변경</p>
        <Input
          name='nickname'
          label='닉네임'
          type='text'
          // register={register('nickname', {
          //   required: '닉네임을 입력해 주세요.',
          //   minLength: {
          //     value: 2,
          //     message: '2자 이상 입력하세요',
          //   },
          //   maxLength: {
          //     value: 20,
          //     message: '20자 이하로 입력하세요',
          //   },
          // })}
          // value={nicknameValue}
          // error={errors.nickname?.message}
        />
      </div>

      <div className='flex flex-col gap-[16px]'>
        <p className='text-xl font-semibold text-gray-800'>비밀번호 변경</p>
        <div>
          <Input
            name='password'
            label='비밀번호'
            type='password'
            // register={register('password', {
            //   minLength: { value: 8, message: '8자 이상 입력하세요' },
            // })}
            // value={pwValue}
            // error={errors.password?.message}
            isPassword={true}
          />
          <Input
            name='confirmPassword'
            label='비밀번호 확인'
            type='password'
            // register={register('confirmPassword', {
            //   validate: (value) => {
            //     if (pwValue && !value) {
            //       return '비밀번호를 확인해 주세요';
            //     }
            //     if (value && value !== pwValue) {
            //       return '비밀번호가 일치하지 않습니다.';
            //     }
            //     return true;
            //   },
            // })}
            // value={pwConfirmValue}
            // error={errors.confirmPassword?.message}
            isPassword={true}
          />
        </div>
      </div>

      {isDesktop && (
        <div className='flex justify-end w-full'>
          <div className='w-[128px]'>
            <BaseButton variant='primary' disabled={isButtonDisabled} className='py-[12px]'>
              변경하기
            </BaseButton>
          </div>
        </div>
      )}
    </form>
  );
}
