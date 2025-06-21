import { UseFormReturn } from 'react-hook-form';
import Input from '@/src/components/common/inputs/Input';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import KakaoLoginButton from '@/src/components/common/buttons/KakaoLoginButton';
import { useKakaoLogin, useLogin } from '@/src/hooks/auth/useAuth';
import { LoginFormValues } from '@/src/components/common/modals/AuthModal';
import { usePathname, useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';

interface LoginFormProps {
  loginForm: UseFormReturn<LoginFormValues>;
}

export default function LoginForm({ loginForm }: LoginFormProps) {
  const pathname = usePathname();
  const navigate = useRouter();
  const loginMutation = useLogin();

  const { kakaoLoginRequest } = useKakaoLogin();
  const { closeModal } = useModal();

  // watch
  const loginEmailValue = loginForm.watch('email');
  const loginPasswordValue = loginForm.watch('password');
  // 버튼 활성화 조건
  const isLoginButtonEnabled =
    loginEmailValue?.trim().length > 0 && loginPasswordValue?.trim().length > 0;
  // 로그인
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

  // 카카오 로그인
  const handleKakaoLogin = () => {
    kakaoLoginRequest();
  };

  const isAccountPage = pathname === '/account';

  return (
    <form onSubmit={loginForm.handleSubmit(handleLogin)}>
      <Input
        label='이메일'
        type='email'
        watchValue={loginEmailValue}
        error={loginForm.formState.errors.email}
        disabled
        {...loginForm.register('email')}
      />
      <Input
        label='비밀번호'
        type='password'
        isPassword
        autoFocus
        watchValue={loginPasswordValue}
        error={loginForm.formState.errors.password}
        {...loginForm.register('password')}
      />
      <div className='flex flex-col gap-[16px] mt-[60px]'>
        <BaseButton
          type='submit'
          disabled={loginForm.formState.isSubmitting || !isLoginButtonEnabled}
          className='h-[48px]'
        >
          {loginForm.formState.isSubmitting ? '로그인 중...' : '로그인'}
        </BaseButton>
        <KakaoLoginButton onClick={handleKakaoLogin} className='h-[48px]' />
      </div>
    </form>
  );
}
