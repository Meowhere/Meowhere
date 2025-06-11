import { UseFormReturn } from 'react-hook-form';
import Input from '../inputs/Input';
import BaseButton from '../buttons/BaseButton';
import KakaoLoginButton from '../buttons/KakaoLoginButton';
import { checkEmailExistence } from '@/src/utils/checkEmailExistence';
import { useKakaoLogin } from '@/src/hooks/auth/useAuth';
import {
  AuthMode,
  InitialFormValues,
  LoginFormValues,
  SignUpFormValues,
} from '../modals/AuthModal';

interface InitialFormProps {
  setMode: React.Dispatch<React.SetStateAction<AuthMode>>;
  initialForm: UseFormReturn<InitialFormValues>;
  loginForm: UseFormReturn<LoginFormValues>;
  signUpForm: UseFormReturn<SignUpFormValues>;
}

export default function InitialForm({
  setMode,
  initialForm,
  loginForm,
  signUpForm,
}: InitialFormProps) {
  const { kakaoLoginRequest } = useKakaoLogin();

  // watch
  const initialEmailValue = initialForm.watch('email');

  // 버튼 활성화 조건
  const isInitialButtonEnabled = initialEmailValue?.trim().length > 0;

  // 이메일 존재 유무 확인
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

  // 카카오 로그인
  const handleKakaoLogin = () => {
    kakaoLoginRequest();
  };

  return (
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
          disabled={initialForm.formState.isSubmitting || !isInitialButtonEnabled}
          className='h-[48px]'
        >
          {initialForm.formState.isSubmitting ? '확인 중...' : '계속'}
        </BaseButton>
        <KakaoLoginButton onClick={handleKakaoLogin} className='h-[48px]' />
      </div>
    </form>
  );
}
