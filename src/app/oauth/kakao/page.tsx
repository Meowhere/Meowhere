'use client';
import { useKakaoLogin, useKakaoSignUp } from '@/src/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function KakaoCallbackPage() {
  const navigate = useRouter();
  const { kakaoCallbackLogin } = useKakaoLogin();
  const { kakaoCallbackSignUp, kakaoSignUpRequest } = useKakaoSignUp();
  const [status, setStatus] = useState('로그인 중...');

  const handleKakaoAuth = async (authCode: string, state?: string) => {
    try {
      // state가 'signup'이면 바로 회원가입 시도
      if (state === 'signup') {
        setStatus('회원가입 시도 중...');
        const randomNickname = `체험냥${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, '0')}`;

        const signUpResult = await kakaoCallbackSignUp(randomNickname, authCode);

        if (signUpResult?.user) {
          setStatus('회원가입 완료!');
          navigate.replace('/');
          return;
        } else {
          throw new Error('회원가입 실패');
        }
      }

      // 기본적으로는 로그인 시도
      setStatus('로그인 시도 중...');
      const loginResult = await kakaoCallbackLogin(authCode);

      if (loginResult?.user) {
        setStatus('로그인 완료!');
        navigate.replace('/');
        return;
      }
    } catch (loginError) {
      console.log('로그인 실패:', loginError);

      // 사용자가 존재하지 않는 경우에만 회원가입으로 리다이렉트
      if (state !== 'signup') {
        setStatus('회원가입 페이지로 이동 중...');

        // 회원가입을 위한 새로운 인가 코드 요청
        kakaoSignUpRequest();
        return;
      }

      // 다른 에러이거나 이미 회원가입 시도한 경우
      setStatus('인증 대기중...');
      navigate.replace('/account?error=auth_failed');
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    const state = urlParams.get('state');

    if (authCode) {
      handleKakaoAuth(authCode, state || undefined);
    } else {
      console.error('인가 코드를 받지 못했습니다');
      navigate.replace('/account?error=no_auth_code');
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black'>
      <div className='w-16 h-16 border-t-4 border-yellow-400 border-solid rounded-full animate-spin'></div>
      <p className='mt-4 text-lg font-medium text-gray-700'>{status}</p>
      <p className='mt-2 text-sm text-gray-500'>잠시만 기다려 주세요</p>
    </div>
  );
}

export default KakaoCallbackPage;
