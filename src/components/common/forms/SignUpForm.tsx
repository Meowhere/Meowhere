import { UseFormReturn } from 'react-hook-form';
import Input from '../inputs/Input';
import BaseButton from '../buttons/BaseButton';
import KakaoLoginButton from '../buttons/KakaoLoginButton';
import { useKakaoLogin, useLogin, useSignUp } from '@/src/hooks/auth/useAuth';
import { InitialFormValues, SignUpFormValues } from '../modals/AuthModal';
import { usePathname, useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';
import Checkbox from '../buttons/CheckBox';

interface SignUpFormProps {
  signUpForm: UseFormReturn<SignUpFormValues>;
}

export default function SignUpForm({ signUpForm }: SignUpFormProps) {
  const pathname = usePathname();
  const navigate = useRouter();
  const { kakaoLoginRequest } = useKakaoLogin();
  const { closeModal } = useModal();
  const { signUpAndLogin } = useSignUp();

  // watch
  const signUpEmailValue = signUpForm.watch('email');
  const signUpNicknameValue = signUpForm.watch('nickname');
  const signUpPasswordValue = signUpForm.watch('password');
  const signUpPasswordConfirmValue = signUpForm.watch('passwordConfirm');
  const agreeTermsValue = signUpForm.watch('agreeTerms');
  const agreePrivacyValue = signUpForm.watch('agreePrivacy');

  // 버튼 활성화 조건
  const isSignUpButtonEnabled =
    signUpEmailValue?.trim().length > 0 &&
    signUpNicknameValue?.trim().length > 0 &&
    signUpPasswordValue?.trim().length > 0 &&
    signUpPasswordConfirmValue?.trim().length > 0 &&
    agreeTermsValue &&
    agreePrivacyValue;

  // 회원가입
  const handleSignUp = async (data: SignUpFormValues) => {
    const isAccountPage = pathname === '/account';

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

  // 카카오 로그인
  const handleKakaoLogin = () => {
    kakaoLoginRequest();
  };

  return (
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
      {/* 약관 동의 체크박스 */}
      <div className='flex flex-col gap-[12px] mt-[24px]'>
        <Checkbox
          id='agreeTerms'
          checked={agreeTermsValue}
          onChange={(checked) => signUpForm.setValue('agreeTerms', checked)}
          label='이용약관에 동의합니다'
          error={signUpForm.formState.errors.agreeTerms?.message}
        />
        <Checkbox
          id='agreePrivacy'
          checked={agreePrivacyValue}
          onChange={(checked) => signUpForm.setValue('agreePrivacy', checked)}
          label='개인정보 수집 및 이용에 동의합니다'
          error={signUpForm.formState.errors.agreePrivacy?.message}
        />
      </div>
      <div className='flex flex-col gap-[16px] mt-[60px]'>
        <BaseButton
          type='submit'
          disabled={signUpForm.formState.isSubmitting || !isSignUpButtonEnabled}
          className='h-[48px]'
        >
          {signUpForm.formState.isSubmitting ? '가입 중...' : '회원가입'}
        </BaseButton>
        <KakaoLoginButton onClick={handleKakaoLogin} className='h-[48px]' />
      </div>
    </form>
  );
}
