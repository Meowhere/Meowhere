import { useModal } from '@/src/hooks/useModal';
import CloseButton from '../buttons/CloseButton';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import ArrowButton from '../buttons/ArrowButton';
import { HEADER } from '@/src/constants/modal';
import InitialForm from '@/src/app/account/components/forms/InitialForm';
import LoginForm from '@/src/app/account/components/forms/LoginForm';
import SignUpForm from '@/src/app/account/components/forms/SignUpForm';

// zod 스키마
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
    nickname: z
      .string()
      .transform((val) => val.trim().replace(/\s+/g, ' '))
      .pipe(
        z.string().min(1, '닉네임을 입력해주세요.').max(10, '닉네임 10자 이내로 입력해주세요.')
      ),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상 입력해주세요.')
      .max(30, '비밀번호는 30자 이하로 입력해주세요.')
      .refine((val) => !/\s/.test(val), '비밀번호에 공백을 포함할 수 없습니다.'),
    passwordConfirm: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, '이용약관에 동의해주세요.'),
    agreePrivacy: z
      .boolean()
      .refine((val) => val === true, '개인정보 수집 및 이용에 동의해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type InitialFormValues = z.infer<typeof initialSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type AuthMode = 'initial' | 'login' | 'signup';

export default function AuthModal() {
  const pathname = usePathname();
  const { closeModal } = useModal();
  const [mode, setMode] = useState<AuthMode>('initial');

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
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
      agreeTerms: false,
      agreePrivacy: false,
    },
  });

  // 뒤로가기
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
        <h2 className='text-md text-black dark:text-gray-200'>{HEADER[mode]}</h2>
        {!isAccountPage && (
          <CloseButton size='md' onClick={closeModal} className='absolute right-0' />
        )}
      </div>

      {/* Initial Form - 이메일 확인 */}
      {mode === 'initial' && (
        <InitialForm
          setMode={setMode}
          initialForm={initialForm}
          loginForm={loginForm}
          signUpForm={signUpForm}
        />
      )}

      {/* Login Form */}
      {mode === 'login' && <LoginForm loginForm={loginForm} />}

      {/* SignUp Form */}
      {mode === 'signup' && <SignUpForm signUpForm={signUpForm} />}
    </div>
  );
}
