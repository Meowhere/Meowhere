'use client';
import { useForm } from 'react-hook-form';
import Input from '@/src/components/common/inputs/Input';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { error } from 'console';

type FormValues = {
  nickname: string;
  password: string;
  confirmPassword: string;
};

export default function MyInfoPage() {
  const { isDesktop } = useBreakpoint();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const nicknameValue = watch('nickname', '');
  const pwValue = watch('password', '');
  const pwConfirmValue = watch('confirmPassword', '');

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

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
          register={register('nickname', {
            required: '닉네임을 입력해 주세요.',
            minLength: {
              value: 2,
              message: '2자 이상 입력하세요',
            },
            maxLength: {
              value: 20,
              message: '20자 이하로 입력하세요',
            },
          })}
          value={nicknameValue}
          error={errors.nickname?.message}
        />
      </div>
      <div className='flex flex-col gap-[16px]'>
        <p className='text-xl font-semibold text-gray-800'>비밀번호 변경</p>
        <div>
          <Input
            name='password'
            label='비밀번호'
            type='password'
            register={register('password', {
              required: '비밀번호를 입력해 주세요',
              minLength: { value: 6, message: '6자 이상 입력하세요' },
            })}
            value={pwValue}
            error={errors.password?.message}
            isPassword={true}
          />
          <Input
            name='confirmPassword'
            label='비밀번호 확인'
            type='password'
            register={register('confirmPassword', {
              required: '비밀번호를 확인해 주세요',
              validate: (value) => value === pwValue || '비밀번호가 일치하지 않습니다.',
            })}
            value={pwConfirmValue}
            error={errors.confirmPassword?.message}
            isPassword={true}
          />
        </div>
      </div>
      {isDesktop && (
        <div className='flex justify-end w-full'>
          <div className='w-[128px]'>
            <BaseButton variant='primary' disabled={false}>
              변경하기
            </BaseButton>
          </div>
        </div>
      )}
    </form>
  );
}
