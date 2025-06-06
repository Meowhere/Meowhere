import { BASE_API_URL } from '../constants/api';

export async function checkEmailExistence(email: string): Promise<boolean | null> {
  const credentials = {
    email,
    password: '1',
  };

  try {
    const res = await fetch(`${BASE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    switch (res.status) {
      case 400:
        return true; // 이메일 존재
      case 404:
        return false; // 이메일 없음
      default:
        return null; // 예외 상황
    }
  } catch (error) {
    console.error('checkEmailExistence error:', error);
    return null;
  }
}
