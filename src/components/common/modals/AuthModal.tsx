import { useModal } from '@/src/hooks/useModal';
import CloseButton from '../buttons/CloseButton';
import Input from '../inputs/Input';
import BaseButton from '../buttons/BaseButton';
import KakaoLoginButton from '../buttons/KakaoLoginButton';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useLogin, useSignUp } from '@/src/hooks/auth/useAuth';
import { checkEmailExistence } from '@/src/utils/checkEmailExistence';
import ArrowButton from '../buttons/ArrowButton';

const header = {
  login: '로그인',
  signup: '회원가입',
  initial: '로그인 및 회원가입',
};

const loginSchema = z.object({
  email: z.string().email('유호한 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

const signUpSchema = z
  .object({
    email: z.string().email('유효한 이메일을 입력해주세요.'),
    nickname: z.string().min(2, '닉네임은 최소 2자 이상이어야 합니다.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

type FormValues = z.infer<typeof loginSchema> & Partial<z.infer<typeof signUpSchema>>;

export default function AuthModal() {
  const pathname = usePathname();
  const { closeModal } = useModal();
  const [mode, setMode] = useState<'initial' | 'login' | 'signup'>('initial');
  const loginMutation = useLogin();
  const { signUpAndLogin } = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(mode === 'signup' ? signUpSchema : loginSchema),
  });

  const email = watch('email');

  const handleEmailCheck = async () => {
    if (!email) return;
    try {
      const exists = await checkEmailExistence(email);
      setMode(exists ? 'login' : 'signup');
    } catch (error) {
      console.log('이메일 확인 실패', error);
      setError('email', { message: '이메일 확인 중 오류가 발생했습니다.' });
    }
  };

  const onSubmit = async (data: FormValues) => {};

  const handleKakaoLogin = () => {
    console.log('카카오');
  };

  const isAccountPage = pathname === '/account';

  return (
    <div className='relative'>
      {/* Header */}
      <div className='flex items-center justify-center mb-[48px]'>
        {mode == 'initial' && (
          <div className='absolute left-0'>
            <ArrowButton size={24} onClick={closeModal} />
          </div>
        )}
        {header[mode]}
        {!isAccountPage && (
          <div className='absolute right-0'>
            <CloseButton size='sm' onClick={closeModal} />
          </div>
        )}
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit(mode === 'initial' ? handleEmailCheck : onSubmit)}>
        <Input label='이메일' type='email' />
        <div className='flex flex-col gap-[16px] mt-[60px]'>
          <BaseButton>계속</BaseButton>
          <KakaoLoginButton onClick={handleKakaoLogin} className='h-[48px]'></KakaoLoginButton>
        </div>
      </form>
    </div>
  );
}
