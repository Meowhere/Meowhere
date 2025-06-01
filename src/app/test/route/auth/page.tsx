'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/src/constants/api';

export default function AuthTest() {
  const [loginData, setLoginData] = useState(null);
  const [tokenRefreshData, setTokenRefreshData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 로그인 및 토큰 갱신 로직을 useEffect 안으로 이동
  useEffect(() => {
    const performAuthOperations = async () => {
      try {
        setLoading(true);

        // 1. 로그인
        const formData = {
          email: 'yhk8462@naver.com',
          password: 'password123',
        };
        const login = async (formData: any) => {
          const res = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(formData),
            credentials: 'include', // 브라우저 쿠키를 포함
            headers: {
              'Content-Type': 'application/json', // JSON 바디를 보내므로 헤더 명시
            },
          });
          if (!res.ok) {
            const errorData = await res
              .json()
              .catch(() => ({ message: '로그인 실패' }));
            throw new Error(errorData.message || '로그인 실패');
          }
          return res.json();
        };

        const loginRes = await login(formData);
        setLoginData(loginRes);
        console.log('로그인 성공:', loginRes);

        // 2. 토큰 갱신
        const refreshToken = async () => {
          const res = await fetch(`${BASE_URL}/api/auth/tokens`, {
            method: 'POST',
            credentials: 'include',
          });
          if (!res.ok) {
            const errorData = await res
              .json()
              .catch(() => ({ message: '토큰 갱신 실패' }));
            throw new Error(errorData.message || '토큰 갱신 실패');
          }
          return res.json();
        };

        const tokenRes = await refreshToken();
        setTokenRefreshData(tokenRes);
        console.log('토큰 갱신 성공:', tokenRes);
      } catch (err: any) {
        setError(err.message || '알 수 없는 오류 발생');
        console.error('인증 작업 중 오류 발생:', err);
      } finally {
        setLoading(false);
      }
    };

    performAuthOperations();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div>
      <h1>Auth API Test Page</h1>
      <h2>로그인 결과:</h2>
      <pre>{JSON.stringify(loginData, null, 2)}</pre>
      <h2>토큰 갱신 결과:</h2>
      <pre>{JSON.stringify(tokenRefreshData, null, 2)}</pre>
    </div>
  );
}
