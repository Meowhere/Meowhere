import { BASE_URL } from '@/src/constants/api';
import { cookies } from 'next/headers';

async function MyActivities() {
  const cookieStore = await cookies();

  // 내 체험 API test
  const getMyActivities = async () => {
    const res = await fetch(`${BASE_URL}/api/my-activities?size=20`, {
      method: 'GET',
      headers: {
        // 서버 컴포넌트에서는 모든 쿠키 전달
        Cookie: cookieStore.toString(),
      },
    });
    return res.json();
  };
  const data = await getMyActivities();

  return (
    <div>
      My Activities API Test
      <div>내 체험 목록:</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default MyActivities;
