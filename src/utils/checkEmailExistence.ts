import { BASE_API_URL } from '../constants/api';

export async function checkEmailExistence(email: string): Promise<boolean | null> {
  const credentials = {
    email: email,
    password: '1',
  };

  const res = await fetch(`${BASE_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (res.status === 400) return true;
  if (res.status === 404) return false;
  return null;
}
