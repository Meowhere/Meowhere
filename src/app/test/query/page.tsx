import { BASE_URL } from '@/src/constants/api';

export default async function QueryTest() {
  // API 라우트 테스트
  const query = 'method=offset&page=1&size=20';
  const fetchActivities = async (query: string) => {
    const res = await fetch(`${BASE_URL}/api/activities?${query}`);
    return res.json();
  };
  const res = await fetchActivities(query);
  console.log(res);
  return (
    <div>
      query test page
      <div></div>
    </div>
  );
}
