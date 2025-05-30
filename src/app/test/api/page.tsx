import { BASE_URL } from '@/src/constants/api';

export default async function QueryTest() {
  // API 라우트 테스트

  // activities
  const query = 'method=offset&page=1&size=20';
  const fetchActivities = async (query: string) => {
    const res = await fetch(`${BASE_URL}/api/activities?${query}`, {
      method: 'GET',
    });
    return res.json();
  };
  const activities = await fetchActivities(query);
  console.log('Activities:', activities);

  // // login
  const formData = { email: 'yhk8462@naver.com', password: 'password123' };

  const login = async (formData: any) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const data = await login(formData);
  console.log('로그인', data);

  return (
    <div>
      query test page
      <div></div>
    </div>
  );
}
