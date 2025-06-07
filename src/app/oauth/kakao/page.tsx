'use client';
import { useKakaoLogin } from '@/src/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function KakaoCallbackPage() {
  const navigate = useRouter();
  const { kakaoCallbackLogin } = useKakaoLogin();

  const handleKakaoLogin = async (token: string) => {
    return await kakaoCallbackLogin(token);
  };

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('code');
    if (token) {
      handleKakaoLogin(token);
    } else {
      console.error('인가 코드를 받지 못했습니다');
      navigate.push('/account?error=no_auth_code');
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-16 h-16 border-t-4 border-yellow-400 border-solid rounded-full animate-spin'></div>
      <p className='mt-4 text-lg font-medium text-gray-700'>카카오 로그인 처리 중...</p>
      <p className='mt-2 text-sm text-gray-500'>잠시만 기다려 주세요</p>
    </div>
  );
}

export default KakaoCallbackPage;
