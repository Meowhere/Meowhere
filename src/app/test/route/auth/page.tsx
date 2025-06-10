'use client';

import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useLogin, useLogout, useSignUp, useUser } from '@/src/hooks/auth/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { checkEmailExistence } from '@/src/utils/checkEmailExistence';
import { useEffect, useState } from 'react';

const loginFormData = {
  email: 'yhk8462@naver.com',
  password: 'password123',
};

const signUpFormData = {
  email: 'testuser123@test.com',
  password: 'password123',
  nickname: 'test user',
};

export default function AuthTest() {
  const [isUser, setIsUser] = useState<boolean | null>(null);
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const { signUpAndLogin } = useSignUp();
  const { data, isLoading, isError, refetch } = useUser();
  const [signUpResult, setSignUpResult] = useState({});
  const { openAuthModal } = useModal();

  const handleCheckIfUser = async () => {
    const result = await checkEmailExistence('yhk8462@naver.com');
    console.log('email:', result);
    setIsUser(result);
  };

  const handleLogin = async () => {
    const result = await loginMutation.mutateAsync(loginFormData);
    console.log(result);
  };

  const handleSignUp = async () => {
    const result = await signUpAndLogin(signUpFormData);
    console.log(result);
    setSignUpResult(result);
  };

  const handleFetchUser = async () => {
    refetch();
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleAuthModal = () => {
    openAuthModal();
  };

  useEffect(() => {
    console.log('Query data:', data);
    console.log('error:', isError);
  }, [data, isError]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-[16px]'>
      <h1>Auth Query API Test Page</h1>
      <div className='flex gap-[16px]'>
        <div className='flex'>
          <BaseButton onClick={handleLogin}>로그인</BaseButton>
        </div>
        <div className='flex'>
          <BaseButton onClick={handleSignUp}>회원가입</BaseButton>
        </div>
        <div className='flex'>
          <BaseButton onClick={handleCheckIfUser}>이메일 검증</BaseButton>
        </div>
        <div className='flex'>
          <BaseButton onClick={handleFetchUser}>사용자 정보</BaseButton>
        </div>
        <div className='flex'>
          <BaseButton onClick={handleLogout}>로그아웃</BaseButton>
        </div>
        <div className='flex'>
          <BaseButton onClick={handleAuthModal}>로그인 모달</BaseButton>
        </div>
      </div>
      <div>로그인 리스폰스: {data?.nickname}</div>
      <div>회원가입 리스폰스: {JSON.stringify(signUpResult)}</div>
      <div>
        이메일 검증 리스폰스: {isUser === true ? 'true' : isUser === false ? 'false' : 'null'}
      </div>
    </div>
  );
}
