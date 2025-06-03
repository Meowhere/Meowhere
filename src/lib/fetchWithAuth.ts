import { cookies } from 'next/headers';
import { BASE_API_URL } from '../constants/api';
import { handleTokenRefresh } from '../utils/token-refresh';

export async function fetchWithAuth(path: string, options: RequestInit = {}): Promise<any> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  console.log('토큰', accessToken);

  const makeApiRequest = async (token?: string) => {
    const res = await fetch(`${BASE_API_URL}${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token ?? accessToken}`,
      },
    });
    return {
      response: res,
      isSuccess: res.ok,
    };
  };

  const { response } = await makeApiRequest();

  if (response.status === 401) {
    // accessToken 만료 → handleTokenRefresh로 처리
    const refreshedRes = await handleTokenRefresh(makeApiRequest, response);
    console.log(refreshedRes);
    return refreshedRes;
  }

  return response;
}
