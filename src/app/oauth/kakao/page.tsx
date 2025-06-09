'use client';
import { BASE_URL } from '@/src/constants/api';
import { useKakaoLogin, useKakaoSignUp } from '@/src/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function KakaoCallbackPage() {
  const navigate = useRouter();
  const { kakaoCallbackLogin } = useKakaoLogin();
  const { kakaoCallbackSignUp } = useKakaoSignUp();
  const [status, setStatus] = useState('로그인 중...');

  const handleKakaoAuth = async (authCode: string) => {
    try {
      setStatus('로그인 시도 중...');

      // 1단계: 카카오 로그인 시도
      try {
        const loginResult = await kakaoCallbackLogin(authCode);

        if (loginResult?.user) {
          // 로그인 성공
          setStatus('로그인 완료!');
          navigate.replace('/');
          return;
        }
      } catch (loginError: any) {
        console.log('로그인 실패, 회원가입 시도:', loginError);

        // 2단계: 로그인 실패 시 회원가입 시도
        setStatus('회원가입 시도 중...');

        try {
          // 임의의 닉네임 생성
          const randomNickname = `체험냥${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')}`;

          const signUpResult = await kakaoCallbackSignUp(randomNickname, authCode);

          if (signUpResult?.user) {
            // 회원가입 성공
            setStatus('회원가입 완료!');
            navigate.replace('/');
            return;
          }
        } catch (signUpError) {
          console.error('회원가입 실패:', signUpError);
          setStatus('회원가입에 실패했습니다');
          navigate.replace('/account?error=signup_failed');
          return;
        }
      }

      // 모든 시도 실패
      setStatus('인증에 실패했습니다');
      navigate.replace('/account?error=auth_failed');
    } catch (error) {
      console.error('카카오 인증 처리 실패:', error);
      setStatus('오류가 발생했습니다');
      navigate.replace('/account?error=unknown');
    }
  };

  useEffect(() => {
    const authCode = new URLSearchParams(window.location.search).get('code');
    if (authCode) {
      handleKakaoAuth(authCode);
    } else {
      console.error('인가 코드를 받지 못했습니다');
      navigate.replace('/account?error=no_auth_code');
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-16 h-16 border-t-4 border-yellow-400 border-solid rounded-full animate-spin'></div>
      <p className='mt-4 text-lg font-medium text-gray-700'>{status}</p>
      <p className='mt-2 text-sm text-gray-500'>잠시만 기다려 주세요</p>
    </div>
  );
}

export default KakaoCallbackPage;
