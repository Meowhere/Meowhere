import { useModal } from '@/src/hooks/useModal';
import CloseButton from '../buttons/CloseButton';
import Input from '../inputs/Input';
import BaseButton from '../buttons/BaseButton';
import KakaoLoginButton from '../buttons/KakaoLoginButton';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useLogin, useSignUp } from '@/src/hooks/auth/useAuth';
import { checkEmailExistence } from '@/src/utils/checkEmailExistence';
import ArrowButton from '../buttons/ArrowButton';
import { HEADER } from '@/src/constants/modal';

const initialSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.'),
});

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

const signUpSchema = z
  .object({
    email: z.string().email('유효한 이메일을 입력해주세요.'),
    nickname: z.string().min(1, '닉네임을 입력해주세요.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

type InitialFormValues = z.infer<typeof initialSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function AuthModal() {
  const pathname = usePathname();
  const navigate = useRouter();
  const { closeModal } = useModal();
  const [mode, setMode] = useState<'initial' | 'login' | 'signup'>('initial');
  const loginMutation = useLogin();
  const { signUpAndLogin } = useSignUp();

  // 각 모드별 폼 분리
  const initialForm = useForm<InitialFormValues>({
    resolver: zodResolver(initialSchema),
    defaultValues: { email: '' },
  });

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', nickname: '', password: '', passwordConfirm: '' },
  });

  // watch 값들
  const initialEmailValue = initialForm.watch('email');
  const loginEmailValue = loginForm.watch('email');
  const loginPasswordValue = loginForm.watch('password');
  const signUpEmailValue = signUpForm.watch('email');
  const signUpNicknameValue = signUpForm.watch('nickname');
  const signUpPasswordValue = signUpForm.watch('password');
  const signUpPasswordConfirmValue = signUpForm.watch('passwordConfirm');

  const handleEmailCheck = async (data: InitialFormValues) => {
    try {
      const exists = await checkEmailExistence(data.email);
      const newMode = exists ? 'login' : 'signup';
      setMode(newMode);

      // 해당 폼에 이메일 값 설정
      if (newMode === 'login') {
        loginForm.setValue('email', data.email);
      } else {
        signUpForm.setValue('email', data.email);
      }
    } catch (error) {
      console.log('이메일 확인 실패', error);
      initialForm.setError('email', { message: '이메일 확인 중 오류가 발생했습니다.' });
    }
  };

  const handleLogin = async (data: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(data);
      if (isAccountPage) {
        navigate.push('/');
      }
      closeModal();
    } catch (error) {
      console.error('로그인 오류:', error);
      loginForm.setError('password', { message: '비밀번호를 다시 확인해주세요.' });
    }
  };

  const handleSignUp = async (data: SignUpFormValues) => {
    try {
      await signUpAndLogin(data);
      if (isAccountPage) {
        navigate.push('/');
      }
      closeModal();
    } catch (error) {
      console.error('회원가입 오류:', error);
      signUpForm.setError('email', { message: '회원가입에 실패했습니다.' });
    }
  };

  const handleKakaoLogin = () => {
    console.log('카카오');
  };

  const handleBack = () => {
    setMode('initial');
    loginForm.reset();
    signUpForm.reset();
  };

  const isAccountPage = pathname === '/account';

  return (
    <div className='relative'>
      {/* Header */}
      <div className='flex items-center justify-center mb-[48px]'>
        {mode !== 'initial' && (
          <ArrowButton size={24} onClick={handleBack} className='absolute left-0' />
        )}
        <h2 className='text-md text-black'>{HEADER[mode]}</h2>
        {!isAccountPage && (
          <CloseButton size='md' onClick={closeModal} className='absolute right-0' />
        )}
      </div>

      {/* Initial Form - 이메일 확인 */}
      {mode === 'initial' && (
        <form onSubmit={initialForm.handleSubmit(handleEmailCheck)}>
          <Input
            label='이메일'
            type='email'
            watchValue={initialEmailValue}
            error={initialForm.formState.errors.email}
            {...initialForm.register('email')}
          />
          <div className='flex flex-col gap-[16px] mt-[60px]'>
            <BaseButton
              type='submit'
              disabled={initialForm.formState.isSubmitting}
              className='h-[48px]'
            >
              {initialForm.formState.isSubmitting ? '확인 중...' : '계속'}
            </BaseButton>
            <KakaoLoginButton onClick={handleKakaoLogin} className='h-[48px]' />
          </div>
        </form>
      )}

      {/* Login Form */}
      {mode === 'login' && (
        <form onSubmit={loginForm.handleSubmit(handleLogin)}>
          <Input
            label='이메일'
            type='email'
            watchValue={loginEmailValue}
            error={initialForm.formState.errors.email}
            disabled
            {...loginForm.register('email')}
          />
          <Input
            label='비밀번호'
            type='password'
            isPassword
            watchValue={loginPasswordValue}
            error={loginForm.formState.errors.password}
            {...loginForm.register('password')}
          />
          <div className='flex flex-col gap-[16px] mt-[60px]'>
            <BaseButton
              type='submit'
              disabled={loginForm.formState.isSubmitting}
              className='h-[48px]'
            >
              {loginForm.formState.isSubmitting ? '로그인 중...' : '로그인'}
            </BaseButton>
            <KakaoLoginButton onClick={handleKakaoLogin} className='h-[48px]' />
          </div>
        </form>
      )}

      {/* SignUp Form */}
      {mode === 'signup' && (
        <form onSubmit={signUpForm.handleSubmit(handleSignUp)}>
          <Input
            label='이메일'
            type='email'
            watchValue={signUpEmailValue}
            error={signUpForm.formState.errors.email}
            disabled
            {...signUpForm.register('email')}
          />
          <Input
            label='닉네임'
            type='text'
            watchValue={signUpNicknameValue}
            error={signUpForm.formState.errors.nickname}
            {...signUpForm.register('nickname')}
          />
          <Input
            label='비밀번호'
            type='password'
            isPassword
            watchValue={signUpPasswordValue}
            error={signUpForm.formState.errors.password}
            {...signUpForm.register('password')}
          />
          <Input
            label='비밀번호 확인'
            type='password'
            isPassword
            watchValue={signUpPasswordConfirmValue}
            error={signUpForm.formState.errors.passwordConfirm}
            {...signUpForm.register('passwordConfirm')}
          />
          <div className='flex flex-col gap-[16px] mt-[60px]'>
            <BaseButton
              type='submit'
              disabled={signUpForm.formState.isSubmitting}
              className='h-[48px]'
            >
              {signUpForm.formState.isSubmitting ? '가입 중...' : '회원가입'}
            </BaseButton>
            <KakaoLoginButton onClick={handleKakaoLogin} className='h-[48px]' />
          </div>
        </form>
      )}
    </div>
  );
}
