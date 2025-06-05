import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';

export async function checkEmailExistence(email: string): Promise<boolean | null> {
  const credentials = {
    email: email,
    password: '1',
  };
  try {
    const res = await fetchFromClient('/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (res.status === 400) return true;
    if (res.status === 404) return false;
  } catch (error) {
    console.error('이메일 확인 중 네트워크 또는 기타 오류 발생:', error);
    return null;
  }
  return null;
}
